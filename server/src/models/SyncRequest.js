const mongoose = require("mongoose");

const SyncRequestSchema = new mongoose.Schema(
  {
    sourceEnvironment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Environment",
      required: true,
    },
    targetEnvironment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Environment",
      required: true,
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    changes: [
      {
        key: String,
        type: { type: String, enum: ["added", "modified", "deleted"] },
        oldValue: String,
        newValue: String,
      },
    ],
    reviewNote: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SyncRequest", SyncRequestSchema);