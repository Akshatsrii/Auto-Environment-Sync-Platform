const { Worker } = require('bullmq');
const { connection } = require('../config/queue');
const User = require('../models/User');
const { sendNotification } = require('../utils/notificationService');
const { sendSyncSuccessEmail, sendDriftAlertEmail, sendGenericEmail } = require('../utils/emailService');
const { sendSlackNotification } = require('../utils/slackService');
const { sendTeamsNotification } = require('../utils/teamsService');

const notificationWorker = new Worker('notification-queue', async (job) => {
  console.log(`[NotificationWorker] Processing job ${job.id}:`, job.name);

  const { userId, type, title, message, meta } = job.data;

  // 1. Fetch User and Preferences
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }

  const settings = user.notificationSettings || {
    emailEnabled: true,
    slackEnabled: false,
    slackWebhookUrl: '',
    teamsEnabled: false,
    teamsWebhookUrl: ''
  };

  // 2. Real-time Notifications (Socket.IO + Db Store)
  // Always trigger this to feed the Notification Center.
  let dbNotif;
  try {
    dbNotif = await sendNotification(userId, { title, message, type, meta });
  } catch (err) {
    console.error('[NotificationWorker] Socket.IO/DB Notification failed:', err.message);
  }

  // 3. Email Notifications
  if (settings.emailEnabled) {
    try {
      if (type === 'sync') {
        await sendSyncSuccessEmail(user.email, {
          userName: user.name,
          sourceEnv: meta.sourceEnv || 'Source',
          targetEnv: meta.targetEnv || 'Target',
          changesCount: meta.changesCount || 0
        });
      } else if (type === 'drift') {
        await sendDriftAlertEmail(user.email, {
          userName: user.name,
          sourceEnv: meta.sourceEnv || 'Source',
          targetEnv: meta.targetEnv || 'Target',
          changesCount: meta.changesCount || 0
        });
      } else {
        await sendGenericEmail(user.email, {
          userName: user.name,
          title,
          message
        });
      }
      console.log(`[NotificationWorker] Email sent to ${user.email}`);
    } catch (err) {
      console.error('[NotificationWorker] Email sending failed:', err.message);
    }
  }

 // 4. Slack Notifications
const slackWebhookUrl =
  settings.slackWebhookUrl || process.env.SLACK_WEBHOOK_URL;

console.log("========== SLACK DEBUG ==========");
console.log("settings:", settings);
console.log("slackEnabled:", settings.slackEnabled);
console.log("Webhook Exists:", !!slackWebhookUrl);
console.log("Webhook URL:", slackWebhookUrl);
console.log("=================================");

if (settings.slackEnabled && slackWebhookUrl) {
  try {
    await sendSlackNotification(slackWebhookUrl, {
      title,
      message,
      type,
      meta,
    });

    console.log("✅ Slack notification sent");
  } catch (err) {
    console.error(
      "❌ Slack notification failed:",
      err.response?.data || err.message
    );
  }
} else {
  console.log("⚠️ Slack notification skipped");
}

// 5. Teams Notifications
const teamsWebhookUrl =
  settings.teamsWebhookUrl || process.env.TEAMS_WEBHOOK_URL;

console.log("========== TEAMS DEBUG ==========");
console.log("teamsEnabled:", settings.teamsEnabled);
console.log("Webhook Exists:", !!teamsWebhookUrl);
console.log("Webhook URL:", teamsWebhookUrl);
console.log("=================================");

if (settings.teamsEnabled && teamsWebhookUrl) {
  try {
    await sendTeamsNotification(teamsWebhookUrl, {
      title,
      message,
      type,
      meta,
    });

    console.log("✅ Teams notification sent");
  } catch (err) {
    console.error(
      "❌ Teams notification failed:",
      err.response?.data || err.message
    );
  }
} else {
  console.log("⚠️ Teams notification skipped");
}

  return { success: true };

}, { connection });

notificationWorker.on('completed', (job, result) => {
  console.log(`✅ Notification Job ${job.id} completed successfully`);
});

notificationWorker.on('failed', (job, err) => {
  console.error(`❌ Notification Job ${job.id} failed:`, err.message);
});

module.exports = notificationWorker;
