const mongoose = require('mongoose')

const variableSchema = new mongoose.Schema({
  key: { type: String, required: true, trim: true },
  value: { type: String, default: '' },
  isSecret: { type: Boolean, default: false },
})

const environmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Environment name is required'],
    enum: ['Development', 'Staging', 'Production'],
  },
  description: {
    type: String,
    default: '',
  },
  variables: [variableSchema],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  isActive: {
  type: Boolean,
  default: true,
},

lastSynced: {
  type: Date,
},

lastDriftCheck: {
  type: Date,
},

driftStatus: {
  type: String,
  enum: ["synced", "drifted"],
  default: "synced",
},
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true })

module.exports = mongoose.model('Environment', environmentSchema)