const Environment = require('../models/Environment')
const SyncLog = require('../models/SyncLog')
const { compareEnvironments, generateSyncPlan } = require('../utils/diffEngine')
const { sendSyncSuccessEmail } = require('../utils/emailService')

// POST /api/sync/preview
const previewSync = async (req, res) => {
  try {
    const { sourceEnvId, targetEnvId, removeExtra = false } = req.body

    if (!sourceEnvId || !targetEnvId) {
      return res.status(400).json({
        message: 'sourceEnvId and targetEnvId are required',
      })
    }

    const sourceEnv = await Environment.findOne({
      _id: sourceEnvId,
      createdBy: req.user._id,
    })

    const targetEnv = await Environment.findOne({
      _id: targetEnvId,
      createdBy: req.user._id,
    })

    if (!sourceEnv || !targetEnv) {
      return res.status(404).json({
        message: 'Source or target environment not found',
      })
    }

    const diffResult = compareEnvironments(sourceEnv, targetEnv)
    const syncPlan = generateSyncPlan(diffResult, removeExtra)

    res.json({
      source: {
        id: sourceEnv._id,
        name: sourceEnv.name,
      },
      target: {
        id: targetEnv._id,
        name: targetEnv.name,
      },
      plan: syncPlan,
      totalChanges: syncPlan.length,
      isDryRun: true,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// POST /api/sync/execute
const executeSync = async (req, res) => {
  try {
    const { sourceEnvId, targetEnvId, removeExtra = false } = req.body

    if (!sourceEnvId || !targetEnvId) {
      return res.status(400).json({
        message: 'sourceEnvId and targetEnvId are required',
      })
    }

    const sourceEnv = await Environment.findOne({
      _id: sourceEnvId,
      createdBy: req.user._id,
    })

    const targetEnv = await Environment.findOne({
      _id: targetEnvId,
      createdBy: req.user._id,
    })

    if (!sourceEnv || !targetEnv) {
      return res.status(404).json({
        message: 'Source or target environment not found',
      })
    }

    const diffResult = compareEnvironments(sourceEnv, targetEnv)
    const syncPlan = generateSyncPlan(diffResult, removeExtra)

    if (syncPlan.length === 0) {
      return res.json({
        message: 'No changes to sync. Environments are in sync.',
        changes: [],
      })
    }

    let targetVars = [...targetEnv.variables]

    syncPlan.forEach(change => {
      if (change.action === 'add') {
        targetVars.push({
          key: change.key,
          value: change.value,
        })
      }

      if (change.action === 'update') {
        targetVars = targetVars.map(v =>
          v.key === change.key
            ? {
                ...(v.toObject?.() ?? v),
                value: change.newValue,
              }
            : v
        )
      }

      if (change.action === 'remove') {
        targetVars = targetVars.filter(v => v.key !== change.key)
      }
    })

    targetEnv.variables = targetVars
    await targetEnv.save()

    const syncLog = await SyncLog.create({
      sourceEnv: sourceEnv._id,
      targetEnv: targetEnv._id,
      changes: syncPlan.map(c => ({
        key: c.key,
        action:
          c.action === 'add'
            ? 'added'
            : c.action === 'update'
            ? 'updated'
            : 'removed',
        oldValue: c.oldValue || '',
        newValue: c.newValue || c.value || '',
      })),
      syncedBy: req.user._id,
      status: 'success',
    })

    // Send success email (non-blocking)
    sendSyncSuccessEmail(req.user.email, {
      userName: req.user.name,
      sourceEnv: sourceEnv.name,
      targetEnv: targetEnv.name,
      changesCount: syncPlan.length,
    }).catch(err => {
      console.error('Email failed:', err.message)
    })

    res.json({
      message: `Synced ${syncPlan.length} change(s) from ${sourceEnv.name} to ${targetEnv.name}`,
      changes: syncPlan,
      syncLogId: syncLog._id,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  previewSync,
  executeSync,
}