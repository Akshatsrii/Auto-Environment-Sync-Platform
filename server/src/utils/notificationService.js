const Notification = require('../models/Notification')
const { getIO } = require('../config/socket')

async function sendNotification(userId, { title, message, type = 'info', meta = {} }) {
  // 1. Save to DB
  const notification = await Notification.create({
    user: userId,
    title,
    message,
    type,
    meta,
  })

  // 2. Emit via Socket.IO to user's room
  try {
    const io = getIO()
    io.to(userId.toString()).emit('notification', notification)
  } catch (err) {
    console.error('Socket emit failed:', err.message)
  }

  return notification
}

module.exports = { sendNotification }