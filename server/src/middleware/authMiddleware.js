const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { redisClient } = require('../config/redis')

const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({
      message: 'Not authorized, no token',
    })
  }

  try {
    // Check if token is blacklisted
    const isBlacklisted = await redisClient.get(`blacklist:${token}`)

    if (isBlacklisted) {
      return res.status(401).json({
        message: 'Token has been invalidated. Please log in again.',
      })
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Get user
    req.user = await User.findById(decoded.id).select('-password')
    req.token = token
next();
  } catch (error) {
    return res.status(401).json({
      message: 'Not authorized, token failed',
    })
  }
}

module.exports = {
  protect,
}