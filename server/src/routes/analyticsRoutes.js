const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getAnalytics,
  exportPDF,
  exportExcel,
} = require("../controllers/analyticsController");

router.use(protect);

// Analytics Summary
router.get("/", getAnalytics);

// Export PDF
router.get("/export/pdf", exportPDF);

// Export Excel
router.get("/export/excel", exportExcel);

module.exports = router;