const Session = require('../models/Session')

// Called internally on login — create session record
async function createSession(userId, token, req) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  await Session.create({
    user: userId,
    token,
    deviceInfo: {
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    },
    expiresAt,
  })
}

// GET /api/sessions — list active sessions for current user
const getActiveSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user._id }).sort({ lastActive: -1 })
    res.json({ sessions })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// DELETE /api/sessions/:id — force logout a specific session
const revokeSession = async (req, res) => {
  try {
    const session = await Session.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    if (!session) return res.status(404).json({ message: 'Session not found' })

    res.json({ message: 'Session revoked successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// DELETE /api/sessions — force logout ALL sessions (e.g. "logout everywhere")
const revokeAllSessions = async (req, res) => {
  try {
    await Session.deleteMany({ user: req.user._id })
    res.json({ message: 'All sessions revoked. Please log in again on all devices.' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createSession, getActiveSessions, revokeSession, revokeAllSessions }