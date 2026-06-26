const { rateLimit, ipKeyGenerator } = require('express-rate-limit')

// Global IP limiter
const ipLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many requests from this IP. Please try again later.',
  },
})

// Auth limiter (login/register)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => ipKeyGenerator(req.ip),
  message: {
    message: 'Too many login attempts. Please try again after 15 minutes.',
  },
})

// User limiter
const userLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user?._id?.toString() || ipKeyGenerator(req.ip)
  },
  message: {
    message: 'Too many requests. Please slow down.',
  },
})

module.exports = {
  ipLimiter,
  authLimiter,
  userLimiter,
}