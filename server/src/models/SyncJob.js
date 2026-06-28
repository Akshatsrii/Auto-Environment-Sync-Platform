const mongoose = require('mongoose');

const syncJobSchema = new mongoose.Schema({
  jobId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  environmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Environment' },
  status: {
    type: String,
    enum: ['queued', 'active', 'completed', 'failed'],
    default: 'queued',
  },
  progress: { type: Number, default: 0 },
  result: { type: mongoose.Schema.Types.Mixed },
  error: { type: String },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
});

module.exports = mongoose.model('SyncJob', syncJobSchema);