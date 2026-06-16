const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' })
  }

  try {
    console.log("TOKEN RECEIVED:", token)
    console.log("JWT SECRET:", process.env.JWT_SECRET)

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    console.log("DECODED:", decoded)

    req.user = await User.findById(decoded.id).select('-password')
    next()

  } catch (error) {
    console.log("JWT ERROR:", error)

    return res.status(401).json({
      message: error.message,
    })
  }
}   // <-- YE BRACKET MISSING THA

module.exports = { protect }