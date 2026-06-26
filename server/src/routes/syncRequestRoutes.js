const express = require("express");
const router = express.Router();

const {
  createSyncRequest,
  getAllRequests,
  approveRequest,
  rejectRequest,
} = require("../controllers/syncRequestController");

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post("/", protect, createSyncRequest);

router.get(
  "/",
  protect,
  authorizeRoles("reviewer", "admin"),
  getAllRequests
);

router.post(
  "/:requestId/approve",
  protect,
  authorizeRoles("reviewer", "admin"),
  approveRequest
);

router.post(
  "/:requestId/reject",
  protect,
  authorizeRoles("reviewer", "admin"),
  rejectRequest
);

module.exports = router;