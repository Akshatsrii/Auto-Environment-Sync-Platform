const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

function driftAlertTemplate({ userName, sourceEnv, targetEnv, changesCount }) {
  return `
    <div style="font-family: Inter, sans-serif; background: #e8f4fd; padding: 32px;">
      <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 32px; border: 1px solid #bfdbfe;">
        <h2 style="color: #1e40af; margin-bottom: 8px;">⚠ Configuration Drift Detected</h2>
        <p style="color: #64748b; font-size: 14px; margin-bottom: 24px;">Hi ${userName}, DevSync found differences between your environments.</p>
        <div style="background: #f0f9ff; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <p style="margin: 0; font-size: 13px; color: #334155;"><strong>Source:</strong> ${sourceEnv}</p>
          <p style="margin: 8px 0 0; font-size: 13px; color: #334155;"><strong>Target:</strong> ${targetEnv}</p>
          <p style="margin: 8px 0 0; font-size: 13px; color: #334155;"><strong>Changes Detected:</strong> ${changesCount}</p>
        </div>
        <p style="font-size: 13px; color: #94a3b8;">Log in to DevSync to review and sync these changes.</p>
      </div>
    </div>
  `
}

function syncSuccessTemplate({ userName, sourceEnv, targetEnv, changesCount }) {
  return `
    <div style="font-family: Inter, sans-serif; background: #e8f4fd; padding: 32px;">
      <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 32px; border: 1px solid #bfdbfe;">
        <h2 style="color: #16a34a; margin-bottom: 8px;">✓ Sync Completed</h2>
        <p style="color: #64748b; font-size: 14px; margin-bottom: 24px;">Hi ${userName}, your environment sync finished successfully.</p>
        <div style="background: #f0fdf4; border-radius: 8px; padding: 16px;">
          <p style="margin: 0; font-size: 13px; color: #334155;"><strong>${sourceEnv} → ${targetEnv}</strong></p>
          <p style="margin: 8px 0 0; font-size: 13px; color: #334155;">${changesCount} change(s) applied</p>
        </div>
      </div>
    </div>
  `
}

async function sendDriftAlertEmail(to, data) {
  await transporter.sendMail({
    from: `"DevSync" <${process.env.EMAIL_USER}>`,
    to,
    subject: '⚠ Configuration Drift Detected — DevSync',
    html: driftAlertTemplate(data),
  })
}

async function sendSyncSuccessEmail(to, data) {
  await transporter.sendMail({
    from: `"DevSync" <${process.env.EMAIL_USER}>`,
    to,
    subject: '✓ Environment Sync Completed — DevSync',
    html: syncSuccessTemplate(data),
  })
}

function genericTemplate({ userName, title, message }) {
  return `
    <div style="font-family: Inter, sans-serif; background: #e8f4fd; padding: 32px;">
      <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 32px; border: 1px solid #bfdbfe;">
        <h2 style="color: #1e40af; margin-bottom: 8px;">${title}</h2>
        <p style="color: #64748b; font-size: 14px; margin-bottom: 24px;">Hi ${userName},</p>
        <p style="color: #334155; font-size: 14px; line-height: 1.6;">${message}</p>
        <p style="font-size: 13px; color: #94a3b8; margin-top: 24px;">Log in to DevSync to review details.</p>
      </div>
    </div>
  `
}

async function sendGenericEmail(to, data) {
  await transporter.sendMail({
    from: `"DevSync" <${process.env.EMAIL_USER}>`,
    to,
    subject: `${data.title} — DevSync`,
    html: genericTemplate(data),
  })
}

module.exports = { sendDriftAlertEmail, sendSyncSuccessEmail, sendGenericEmail }