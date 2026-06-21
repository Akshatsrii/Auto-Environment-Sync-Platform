const SyncRequest = require("../models/SyncRequest");
const Environment = require("../models/Environment");
const Version = require("../models/Version");

// Sync request create karo
const createSyncRequest = async (req, res) => {
  try {
    const { sourceId, targetId } = req.body;

    const source = await Environment.findById(sourceId);
    const target = await Environment.findById(targetId);

    if (!source || !target) {
      return res
        .status(404)
        .json({ success: false, message: "Environment not found" });
    }

    // Diff calculate karo
    const changes = [];
    const sourceMap = {};
    source.variables.forEach((v) => (sourceMap[v.key] = v.value));

    const targetMap = {};
    target.variables.forEach((v) => (targetMap[v.key] = v.value));

    // Added & Modified
    for (const key in sourceMap) {
      if (!(key in targetMap)) {
        changes.push({ key, type: "added", oldValue: "", newValue: sourceMap[key] });
      } else if (sourceMap[key] !== targetMap[key]) {
        changes.push({ key, type: "modified", oldValue: targetMap[key], newValue: sourceMap[key] });
      }
    }

    // Deleted
    for (const key in targetMap) {
      if (!(key in sourceMap)) {
        changes.push({ key, type: "deleted", oldValue: targetMap[key], newValue: "" });
      }
    }

    const request = await SyncRequest.create({
      sourceEnvironment: sourceId,
      targetEnvironment: targetId,
      requestedBy: req.user.id,
      changes,
    });

    res.status(201).json({ success: true, request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Saari requests fetch karo (admin/reviewer ke liye)
const getAllRequests = async (req, res) => {
  try {
    const requests = await SyncRequest.find()
      .populate("sourceEnvironment", "name")
      .populate("targetEnvironment", "name")
      .populate("requestedBy", "name email")
      .populate("reviewedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Approve request
const approveRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { reviewNote } = req.body;

    const request = await SyncRequest.findById(requestId)
      .populate("sourceEnvironment")
      .populate("targetEnvironment");

    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ success: false, message: "Request already reviewed" });
    }

    // Target environment update karo
    const source = request.sourceEnvironment;
    const target = request.targetEnvironment;

    // Version save karo pehle
    const lastVersion = await Version.findOne({
      environmentId: target._id,
    }).sort({ versionNumber: -1 });

    await Version.create({
      environmentId: target._id,
      versionNumber: lastVersion ? lastVersion.versionNumber + 1 : 1,
      snapshot: { name: target.name, variables: target.variables },
      changedBy: req.user.id,
      changeNote: `Pre-sync snapshot (approved by ${req.user.name})`,
    });

    // Sync execute karo
    await Environment.findByIdAndUpdate(target._id, {
      variables: source.variables,
    });

    // Request update karo
    request.status = "approved";
    request.reviewedBy = req.user.id;
    request.reviewNote = reviewNote || "";
    await request.save();

    res.status(200).json({ success: true, message: "Sync approved and executed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reject request
const rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { reviewNote } = req.body;

    const request = await SyncRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    request.status = "rejected";
    request.reviewedBy = req.user.id;
    request.reviewNote = reviewNote || "No reason provided";
    await request.save();

    res.status(200).json({ success: true, message: "Request rejected" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createSyncRequest, getAllRequests, approveRequest, rejectRequest };