const Version = require("../models/Version");
const Environment = require("../models/Environment");

// Ek environment ke saare versions fetch karo
const getVersions = async (req, res) => {
  try {
    const { environmentId } = req.params;

    const versions = await Version.find({ environmentId })
      .sort({ versionNumber: -1 }) // Latest pehle
      .populate("changedBy", "name email");

    res.status(200).json({ success: true, versions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Manually ek version save karo (sync ke time auto-call bhi hoga)
const saveVersion = async (req, res) => {
  try {
    const { environmentId } = req.params;
    const { changeNote } = req.body;

    const environment = await Environment.findById(environmentId);
    if (!environment) {
      return res
        .status(404)
        .json({ success: false, message: "Environment not found" });
    }

    // Latest version number nikalo
    const lastVersion = await Version.findOne({ environmentId }).sort({
      versionNumber: -1,
    });
    const newVersionNumber = lastVersion ? lastVersion.versionNumber + 1 : 1;

    const version = await Version.create({
      environmentId,
      versionNumber: newVersionNumber,
      snapshot: {
        name: environment.name,
        variables: environment.variables,
      },
      changedBy: req.user.id,
      changeNote: changeNote || "Manual snapshot",
    });

    res.status(201).json({ success: true, version });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Single version ka detail dekho
const getVersionById = async (req, res) => {
  try {
    const { versionId } = req.params;

    const version = await Version.findById(versionId).populate(
      "changedBy",
      "name email"
    );

    if (!version) {
      return res
        .status(404)
        .json({ success: false, message: "Version not found" });
    }

    res.status(200).json({ success: true, version });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Rollback — purane version se environment restore karo
const rollbackToVersion = async (req, res) => {
  try {
    const { versionId } = req.params;

    // Version dhundo
    const version = await Version.findById(versionId);
    if (!version) {
      return res
        .status(404)
        .json({ success: false, message: "Version not found" });
    }

    // Environment update karo snapshot se
    const environment = await Environment.findByIdAndUpdate(
      version.environmentId,
      {
        name: version.snapshot.name,
        variables: version.snapshot.variables,
      },
      { new: true }
    );

    if (!environment) {
      return res
        .status(404)
        .json({ success: false, message: "Environment not found" });
    }

    // Rollback ka bhi ek naya version save karo
    const lastVersion = await Version.findOne({
      environmentId: version.environmentId,
    }).sort({ versionNumber: -1 });

    await Version.create({
      environmentId: version.environmentId,
      versionNumber: lastVersion ? lastVersion.versionNumber + 1 : 1,
      snapshot: {
        name: environment.name,
        variables: environment.variables,
      },
      changedBy: req.user.id,
      changeNote: `Rolled back to v${version.versionNumber}`,
    });

    res.status(200).json({
      success: true,
      message: `Environment restored to version ${version.versionNumber}`,
      environment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getVersions, saveVersion, getVersionById, rollbackToVersion };
