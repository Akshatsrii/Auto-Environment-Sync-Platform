const SyncLog = require('../models/SyncLog')

// GET /api/logs
const getLogs = async (req, res) => {
  try {
    const logs = await SyncLog.find({ syncedBy: req.user._id })
      .populate('sourceEnv', 'name')
      .populate('targetEnv', 'name')
      .populate('syncedBy', 'name email')
      .sort({ createdAt: -1 })

    res.json({ logs })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/logs/:id
const getLogById = async (req, res) => {
  try {
    const log = await SyncLog.findOne({ _id: req.params.id, syncedBy: req.user._id })
      .populate('sourceEnv', 'name')
      .populate('targetEnv', 'name')
      .populate('syncedBy', 'name email')

    if (!log) {
      return res.status(404).json({ message: 'Log not found' })
    }

    res.json({ log })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getLogs, getLogById }