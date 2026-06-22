const express = require("express");
const router = express.Router();

const {
  createSyncRequest,
  getAllRequests,
  approveRequest,
  rejectRequest,
} = require("../controllers/syncRequestController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Developer can create sync request
router.post("/", protect, createSyncRequest);

// Reviewer/Admin can see all requests
router.get(
  "/",
  protect,
  authorizeRoles("reviewer", "admin"),
  getAllRequests
);

// Reviewer/Admin can approve
router.post(
  "/:requestId/approve",
  protect,
  authorizeRoles("reviewer", "admin"),
  approveRequest
);

// Reviewer/Admin can reject
router.post(
  "/:requestId/reject",
  protect,
  authorizeRoles("reviewer", "admin"),
  rejectRequest
);

module.exports = router;