const mongoose = require('mongoose')

const syncLogSchema = new mongoose.Schema({
  sourceEnv: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Environment',
    required: true,
  },
  targetEnv: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Environment',
    required: true,
  },
  changes: [
    {
      key: String,
      action: { type: String, enum: ['added', 'updated', 'removed'] },
      oldValue: String,
      newValue: String,
    },
  ],
  syncedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['success', 'failed'],
    default: 'success',
  },
}, { timestamps: true })

module.exports = mongoose.model('SyncLog', syncLogSchema)