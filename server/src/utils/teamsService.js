const axios = require('axios');

/**
 * Microsoft Teams Notification Service
 */
async function sendTeamsNotification(webhookUrl, { title, message, type, meta }) {
  if (!webhookUrl) {
    webhookUrl = process.env.TEAMS_WEBHOOK_URL;
  }
  if (!webhookUrl) {
    console.log("⚠️ Teams Webhook URL not configured. Simulating notification:");
    console.log({ title, message, type, meta });
    return { success: true, message: "Teams notification simulated." };
  }

  const color = type === 'sync' ? '16A34A' : type === 'drift' ? 'EAB308' : type === 'error' ? 'DC2626' : '3B82F6';

  const payload = {
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    "themeColor": color,
    "summary": title,
    "sections": [{
      "activityTitle": title,
      "activitySubtitle": message,
      "facts": Object.entries(meta || {}).map(([key, val]) => ({
        "name": key.charAt(0).toUpperCase() + key.slice(1),
        "value": typeof val === 'object' ? JSON.stringify(val) : String(val)
      })),
      "markdown": true
    }]
  };

  const response = await axios.post(webhookUrl, payload);
  return response.data;
}

module.exports = {
  sendTeamsNotification,
};