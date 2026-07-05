const { notificationQueue } = require('../config/queue');

const addNotificationJob = async (data) => {
  console.log("📥 Queueing notification:", data);

  const job = await notificationQueue.add("send-notification", data, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: 100,
    removeOnFail: 50,
  });

  console.log("🆔 Job ID:", job.id);

  return job;
};

module.exports = { addNotificationJob };
