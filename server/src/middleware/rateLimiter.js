const { rateLimit } = require('express-rate-limit')
const { RedisStore } = require('rate-limit-redis')
const { redisClient } = require('../config/redis')

// Per-IP limiter (applies to everyone, even unauthenticated)
const ipLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: 'rl:ip:',
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP per window
  message: { message: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

// Per-user limiter (applies after auth, stricter for write operations)
const userLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: 'rl:user:',
  }),
  windowMs: 60 * 1000, // 1 minute
  max: 20, // 20 requests per user per minute
  keyGenerator: (req) => req.user?._id?.toString() || req.ip,
  message: { message: 'Too many requests, please slow down.' },
})

// Strict limiter for sensitive routes (login, register)
const authLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: 'rl:auth:',
  }),
  windowMs: 15 * 60 * 1000,
  max: 5, // only 5 login/register attempts per 15 min
  message: { message: 'Too many login attempts. Try again after 15 minutes.' },
})

module.exports = { ipLimiter, userLimiter, authLimiter }