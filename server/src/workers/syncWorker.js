const { Worker } = require('bullmq');
const { connection } = require('../config/queue');
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

}, { connection });

syncWorker.on('completed', (job, result) => {
  console.log(`✅ Job ${job.id} completed:`, result);
});

syncWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message);
});

module.exports = syncWorker;