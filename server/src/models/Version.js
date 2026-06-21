const mongoose = require("mongoose");

const VersionSchema = new mongoose.Schema(
  {
    environmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Environment",
      required: true,
    },
    versionNumber: {
      type: Number,
      required: true,
    },
    snapshot: {
      // Poora environment ka data is waqt
      name: String,
      variables: [
        {
          key: String,
          value: String,
        },
      ],
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    changeNote: {
      type: String,
      default: "Auto-saved version",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Version", VersionSchema);