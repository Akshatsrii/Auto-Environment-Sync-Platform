const { syncQueue } = require('../config/queue');

const addSyncJob = async (data) => {
  const job = await syncQueue.add('sync-environment', data, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: 100,   // last 100 completed rakh
    removeOnFail: 50,        // last 50 failed rakh
  });
  return job;
};

module.exports = { addSyncJob };