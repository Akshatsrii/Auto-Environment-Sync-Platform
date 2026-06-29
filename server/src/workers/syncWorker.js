const { Worker } = require('bullmq');
const { connection, deadLetterQueue } = require('../config/queue');
const Environment = require('../models/Environment');

const syncWorker = new Worker('environment-sync', async (job) => {
  console.log(`[Worker] Processing job ${job.id}:`, job.name);

  const { environmentId, userId, repoUrl } = job.data;

  // Progress update
  await job.updateProgress(10);

  // Simulate sync logic (replace with real sync)
  const environment = await Environment.findById(environmentId);
  if (!environment) throw new Error('Environment not found');

  await job.updateProgress(50);

  // Actual sync logic yahan likhna hai
  // Example: GitHub se latest config fetch, compare, save
  environment.lastSynced = new Date();
  environment.syncStatus = 'completed';
  await environment.save();

  await job.updateProgress(100);

  return { success: true, environmentId, syncedAt: new Date() };

}, {
  connection,
  settings: {
    stalledInterval: 30000,
  },
});

syncWorker.on('completed', (job, result) => {
  console.log(`✅ Job ${job.id} completed:`, result);
});

syncWorker.on('failed', async (job, err) => {
  console.log("========== FAILED EVENT ==========");
  console.log("Job ID:", job.id);
  console.log("Attempts Made:", job.attemptsMade);
  console.log("Max Attempts:", job.opts.attempts);
  console.error("Error:", err.message);

  if (job.attemptsMade >= job.opts.attempts) {
    console.log(`[DLQ] Moving job ${job.id} to Dead Letter Queue`);

    await deadLetterQueue.add('dead-job', {
      originalJobId: job.id,
      originalQueue: 'environment-sync',
      jobData: job.data,
      error: err.message,
      failedAt: new Date(),
      attempts: job.attemptsMade,
    });

    console.log("✅ Job added to Dead Letter Queue");
  } else {
    console.log("⏳ Job will retry, not moving to DLQ yet");
  }
});

module.exports = syncWorker;