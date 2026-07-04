const { notificationQueue } = require('../config/queue');

const addNotificationJob = async (data) => {
  const job = await notificationQueue.add('send-notification', data, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: 100,   // last 100 completed keep
    removeOnFail: 50,        // last 50 failed keep
  });
  return job;
};

module.exports = { addNotificationJob };
