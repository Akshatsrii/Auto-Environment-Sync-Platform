const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { redisClient } = require('../config/redis')
const { createSession } = require("../controllers/sessionController");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    }
  )
}

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '30d' }
  )
}

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
      })
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({
        message: 'User already exists',
      })
    }

    const user = await User.create({
      name,
      email,
      password,
    })

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user),
      refreshToken: generateRefreshToken(user),
    })
  } catch (error) {
    console.log("REGISTER ERROR:", error)
    res.status(500).json({
      message: error.message,
    })
  }
}

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password required',
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
      })
    }

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid credentials',
      })
    }

     const token = generateToken(user);
await createSession(user._id, token, req);

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
      refreshToken: generateRefreshToken(user),
    })
  } catch (error) {
    console.log("LOGIN ERROR:", error)
    res.status(500).json({
      message: error.message,
    })
  }
}

// GET /api/auth/me
const getMe = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user,
    })
  } catch (error) {
    console.log("GET ME ERROR:", error)
    res.status(500).json({
      message: error.message,
    })
  }
}

// POST /api/auth/logout
const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(400).json({ message: 'No token provided' })

    const decoded = jwt.decode(token)
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000)

    if (expiresIn > 0) {
      // Blacklist token until its natural expiry
      await redisClient.setEx(`blacklist:${token}`, expiresIn, 'true')
    }

    res.json({ message: 'Logged out successfully' })
  } catch (error) {
    console.log("LOGOUT ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}

// POST /api/auth/refresh
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' })

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    const newAccessToken = generateToken(user)

    res.json({ token: newAccessToken })
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired refresh token' })
  }
}

module.exports = {
  register,
  login,
  getMe,
  logout,
  refreshToken,
}