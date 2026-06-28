const cron = require('node-cron');
const { driftQueue } = require('../config/queue');
const Environment = require('../models/Environment');

const startDriftScheduler = () => {
  // Har ghante run karo
  cron.schedule('0 * * * *', async () => {
    console.log('[Scheduler] Starting hourly drift scan...');

    try {
      const environments = await Environment.find({});
      for (const env of environments) {
        await driftQueue.add('drift-check', {
          environmentId: env._id.toString(),
          scheduledAt: new Date(),
        }, {
          attempts: 2,
          removeOnComplete: 50,
        });
      }

      console.log(`[Scheduler] Queued drift scan for ${environments.length} environments`);
    } catch (err) {
      console.error('[Scheduler] Error:', err.message);
    }
  });

  console.log('✅ Drift scheduler started (runs every hour)');
};

module.exports = { startDriftScheduler };