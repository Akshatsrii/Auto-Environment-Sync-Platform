const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./src/config/db')
const { connectRedis } = require('./src/config/redis')


dotenv.config()

const app = express()

// Connect Database
connectDB()
connectRedis()


// CORS Config
const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? process.env.CLIENT_URL
      : 'http://localhost:5173',
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json({ limit: '1mb' }))

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'))
app.use('/api/environments', require('./src/routes/environmentRoutes'))

// Compare route removed because compareRoutes.js does not exist
// app.use('/api/compare', require('./src/routes/compareRoutes'))

app.use('/api/sync', require('./src/routes/syncRoutes'))
app.use('/api/logs', require('./src/routes/logRoutes'))
app.use('/api/versions', require('./src/routes/versionRoutes'))
app.use('/api/sync-requests', require('./src/routes/syncRequestRoutes'))

// Health Check
app.get('/', (req, res) => {
  res.json({ message: 'DevSync API Running', status: 'OK' })
})

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong on the server' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})