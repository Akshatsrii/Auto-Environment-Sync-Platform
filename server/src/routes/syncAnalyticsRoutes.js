const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  getSyncAnalytics,
} = require("../controllers/syncAnalyticsController");

router.use(protect);

// GET /api/sync-analytics
router.get("/", getSyncAnalytics);

module.exports = router;