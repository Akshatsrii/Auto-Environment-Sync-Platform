const { rateLimit } = require("express-rate-limit");
const { redisClient } = require("../config/redis");

// --------------------
// Global IP Limiter
// --------------------
const ipLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
  console.log("🚫 Rate Limit Hit:", req.ip);

  res.status(429).json({
    success: false,
    message: "Too many requests from this IP. Please try again later.",
  });
},

  message: {
    success: false,
    message: "Too many requests from this IP. Please try again later.",
  },
});

// --------------------
// Auth Limiter (Login / Register)
// --------------------
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip,
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
});

// --------------------
// User Limiter
// --------------------
const userLimiter = rateLimit({
windowMs: 15 * 60 * 1000,
max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.user?._id?.toString() || req.ip,
  message: {
    success: false,
    message: "Too many requests. Please slow down.",
  },
});

module.exports = {
  ipLimiter,
  authLimiter,
  userLimiter,
};