const express = require("express");
const router = express.Router();

const {
  getVersions,
  saveVersion,
  getVersionById,
  rollbackToVersion,
} = require("../controllers/versionController");

const protect = require("../middleware/authMiddleware");

// Get all versions of an environment
router.get("/:environmentId", protect, getVersions);

// Save a new version
router.post("/:environmentId/save", protect, saveVersion);

// Get version details
router.get("/detail/:versionId", protect, getVersionById);

// Rollback to a version
router.post("/rollback/:versionId", protect, rollbackToVersion);

module.exports = router;