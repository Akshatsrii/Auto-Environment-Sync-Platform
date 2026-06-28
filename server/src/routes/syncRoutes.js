const express = require('express')
const router = express.Router()
const { addSyncJob } = require("../queues/syncQueue");
const { syncQueue } = require("../config/queue");

const {
  previewSync,
  executeSync,
} = require('../controllers/syncController')

const { protect } = require('../middleware/authMiddleware')
const { userLimiter } = require('../middleware/rateLimiter')

router.use(protect)

router.post('/preview', previewSync)
router.post('/execute', userLimiter, executeSync)

router.post('/background', protect, async (req, res) => {
  try {
    const { environmentId, repoUrl } = req.body;

    const job = await addSyncJob({
      environmentId,
      userId: req.user._id,
      repoUrl,
      triggeredAt: new Date(),
    });

    res.json({
      success: true,
      message: 'Sync queued successfully',
      jobId: job.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/sync/job/:jobId 
router.get('/job/:jobId', protect, async (req, res) => {
  try {
    const job = await syncQueue.getJob(req.params.jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const state = await job.getState();
    const progress = job.progress;

    res.json({
      jobId: job.id,
      state,       // waiting | active | completed | failed
      progress,
      result: job.returnvalue,
      failedReason: job.failedReason,
      createdAt: new Date(job.timestamp),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router