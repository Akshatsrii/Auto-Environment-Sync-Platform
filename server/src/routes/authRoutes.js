const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  refreshToken,
  getMe,
  updateSettings,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const { authLimiter } = require("../middleware/rateLimiter");

// Development: No rate limiter
if (process.env.NODE_ENV === "production") {
  router.post("/register", authLimiter, register);
  router.post("/login", authLimiter, login);
} else {
  router.post("/register", register);
  router.post("/login", login);
}

router.post("/logout", protect, logout);
router.post("/refresh", refreshToken);
router.get("/me", protect, getMe);
router.patch("/settings", protect, updateSettings);

module.exports = router;