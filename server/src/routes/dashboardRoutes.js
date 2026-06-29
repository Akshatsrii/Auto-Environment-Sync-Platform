const express = require('express');
const router = express.Router();
const { syncQueue, driftQueue, deadLetterQueue } = require('../config/queue');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

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