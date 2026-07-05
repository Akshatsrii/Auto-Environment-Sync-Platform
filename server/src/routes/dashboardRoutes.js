const express = require('express');
const router = express.Router();
const { syncQueue, driftQueue, deadLetterQueue } = require('../config/queue');
const { protect } = require('../middleware/authMiddleware');
const Environment = require('../models/Environment');
const SyncLog = require('../models/SyncLog');
const SyncRequest = require('../models/SyncRequest');

router.use(protect);

// GET /api/dashboard/stats
router.get('/stats', async (req, res) => {
  try {
    const userId = req.user._id;

    const [envCount, driftedCount, activeRequestsCount, recentLogs] = await Promise.all([
      Environment.countDocuments({ createdBy: userId }),
      Environment.countDocuments({ createdBy: userId, driftStatus: 'drifted' }),
      SyncRequest.countDocuments({ requestedBy: userId, status: 'pending' }),
      SyncLog.find({ syncedBy: userId })
        .populate('sourceEnv', 'name')
        .populate('targetEnv', 'name')
        .sort({ createdAt: -1 })
        .limit(5)
    ]);

    const environments = await Environment.find({ createdBy: userId });
    let totalVariables = 0;
    environments.forEach(e => {
      totalVariables += e.variables ? e.variables.length : 0;
    });

    res.json({
      environmentsCount: envCount,
      driftedCount,
      pendingApprovalsCount: activeRequestsCount,
      totalVariables,
      recentLogs: recentLogs.map(log => ({
        id: log._id,
        source: log.sourceEnv?.name || 'Source',
        target: log.targetEnv?.name || 'Target',
        changesCount: log.changes ? log.changes.length : 0,
        syncedAt: log.createdAt,
        status: log.status
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/dashboard/queue-stats
router.get('/queue-stats', async (req, res) => {
  try {
    const [syncCounts, driftCounts, dlqCounts] = await Promise.all([
      syncQueue.getJobCounts(),
      driftQueue.getJobCounts(),
      deadLetterQueue.getJobCounts(),
    ]);

    res.json({
      sync: syncCounts,      // { waiting, active, completed, failed, delayed }
      drift: driftCounts,
      deadLetter: dlqCounts,
      timestamp: new Date(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/dashboard/recent-jobs
router.get('/recent-jobs', async (req, res) => {
  try {
    const [completed, failed, active] = await Promise.all([
      syncQueue.getCompleted(0, 10),
      syncQueue.getFailed(0, 10),
      syncQueue.getActive(),
    ]);

    res.json({
      completed: completed.map(j => ({
        id: j.id,
        data: j.data,
        completedAt: j.finishedOn,
        duration: j.finishedOn - j.processedOn,
      })),
      failed: failed.map(j => ({
        id: j.id,
        data: j.data,
        error: j.failedReason,
        attempts: j.attemptsMade,
      })),
      active: active.map(j => ({
        id: j.id,
        data: j.data,
        progress: j.progress,
        startedAt: j.processedOn,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;