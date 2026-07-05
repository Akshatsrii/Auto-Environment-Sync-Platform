const axios = require('axios');

/**
 * Slack Notification Service
 */
async function sendSlackNotification(webhookUrl, { title, message, type, meta }) {
  if (!webhookUrl) {
    webhookUrl = process.env.SLACK_WEBHOOK_URL;
  }
  if (!webhookUrl) {
    console.log("⚠️ Slack Webhook URL not configured. Simulating notification:");
    console.log({ title, message, type, meta });
    return { success: true, message: "Slack notification simulated." };
  }

  const color = type === 'sync' ? '#16a34a' : type === 'drift' ? '#eab308' : type === 'error' ? '#dc2626' : '#3b82f6';
  
  const payload = {
    text: `*${title}* \n${message}`,
    attachments: [
      {
        color: color,
        fields: Object.entries(meta || {}).map(([key, val]) => ({
          title: key.charAt(0).toUpperCase() + key.slice(1),
          value: typeof val === 'object' ? JSON.stringify(val) : String(val),
          short: true
        })),
        ts: Math.floor(Date.now() / 1000)
      }
    ]
  };

  const response = await axios.post(webhookUrl, payload);
  return response.data;
}

module.exports = {
  sendSlackNotification,
};