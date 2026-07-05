const { Worker } = require('bullmq');
const { connection } = require('../config/queue');
const Environment = require('../models/Environment');
const { addNotificationJob } = require('../queues/notificationQueue');

const driftWorker = new Worker('drift-scan', async (job) => {
  console.log(`[DriftWorker] Scanning for drift...`);

  const { environmentId } = job.data;
  const environment = await Environment.findById(environmentId);
  if (!environment) throw new Error('Environment not found');

  await job.updateProgress(25);

  // Compare current config vs saved config
  // Yahan actual GitHub fetch + compare logic likhna hai
  const driftDetected = await checkDrift(environment);

  await job.updateProgress(75);

  environment.driftStatus = driftDetected ? 'drifted' : 'synced';
  environment.lastDriftCheck = new Date();
  await environment.save();

  if (driftDetected) {
    await addNotificationJob({
      userId: environment.createdBy,
      type: 'drift',
      title: 'Drift Detected',
      message: `Configuration drift detected in ${environment.name} environment`,
      meta: {
        environmentId: environment._id.toString(),
        sourceEnv: environment.name,
        targetEnv: environment.name,
        driftStatus: 'drifted',
        changesCount: 1
      }
    }).catch(err => console.error('Failed to queue drift notification:', err.message));
  }

  await job.updateProgress(100);

  return { environmentId, driftDetected, checkedAt: new Date() };

}, { connection });

// Helper function
async function checkDrift(environment) {
  // Simplified — real mein GitHub API se compare karo
  const timeSinceSync = Date.now() - new Date(environment.lastSynced).getTime();
  return timeSinceSync > 24 * 60 * 60 * 1000; // 24 hour se zyada = drift
}

driftWorker.on('completed', (job, result) => {
  console.log(`✅ Drift check done for env ${result.environmentId}, drift: ${result.driftDetected}`);
});

module.exports = driftWorker;