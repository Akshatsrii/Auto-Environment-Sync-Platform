const Environment = require('../models/Environment')
const SyncLog = require('../models/SyncLog')
const { compareEnvironments, generateSyncPlan } = require('../utils/diffEngine')

// POST /api/sync/preview
// Body: { sourceEnvId, targetEnvId, removeExtra }
const previewSync = async (req, res) => {
  try {
    const { sourceEnvId, targetEnvId, removeExtra = false } = req.body

    if (!sourceEnvId || !targetEnvId) {
      return res.status(400).json({ message: 'sourceEnvId and targetEnvId are required' })
    }

    const sourceEnv = await Environment.findOne({ _id: sourceEnvId, createdBy: req.user._id })
    const targetEnv = await Environment.findOne({ _id: targetEnvId, createdBy: req.user._id })

    if (!sourceEnv || !targetEnv) {
      return res.status(404).json({ message: 'Source or target environment not found' })
    }

    const diffResult = compareEnvironments(sourceEnv, targetEnv)
    const syncPlan = generateSyncPlan(diffResult, removeExtra)

    res.json({
      source: { id: sourceEnv._id, name: sourceEnv.name },
      target: { id: targetEnv._id, name: targetEnv.name },
      plan: syncPlan,
      totalChanges: syncPlan.length,
      isDryRun: true,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { previewSync }