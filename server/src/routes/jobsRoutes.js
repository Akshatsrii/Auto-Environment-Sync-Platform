const express = require('express');
const router = express.Router();
const { syncQueue, deadLetterQueue } = require('../config/queue');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

// GET /api/jobs/failed — sabhi failed jobs dekho
router.get('/failed', async (req, res) => {
  try {
    const failedJobs = await syncQueue.getFailed(0, 20);
    
    const jobs = failedJobs.map(job => ({
      id: job.id,
      data: job.data,
      failedReason: job.failedReason,
      attempts: job.attemptsMade,
      timestamp: new Date(job.timestamp),
    }));

    res.json({ jobs, count: jobs.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/jobs/:jobId/retry — specific job retry karo
router.post('/:jobId/retry', async (req, res) => {
  try {
    const job = await syncQueue.getJob(req.params.jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    await job.retry();
    res.json({ success: true, message: `Job ${req.params.jobId} retried` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/jobs/dead-letter — DLQ dekho
router.get('/dead-letter', async (req, res) => {
  try {
    const deadJobs = await deadLetterQueue.getWaiting(0, 50);
    res.json({ jobs: deadJobs.map(j => j.data), count: deadJobs.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/jobs/clean — old jobs clean karo
router.delete('/clean', async (req, res) => {
  try {
    await syncQueue.clean(24 * 60 * 60 * 1000, 100, 'completed'); // 24hr old
    await syncQueue.clean(7 * 24 * 60 * 60 * 1000, 50, 'failed'); // 7 days old
    res.json({ success: true, message: 'Queue cleaned' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;