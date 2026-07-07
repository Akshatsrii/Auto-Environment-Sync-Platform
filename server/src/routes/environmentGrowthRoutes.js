const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  getEnvironmentGrowth,
} = require("../controllers/environmentGrowthController");

router.use(protect);

// GET /api/environment-growth
router.get("/", getEnvironmentGrowth);

module.exports = router;