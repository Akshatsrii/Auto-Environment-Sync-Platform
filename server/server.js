const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./src/config/db')

dotenv.config()

const app = express()

// Connect Database
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'))
app.use('/api/environments', require('./src/routes/environmentRoutes'))
app.use('/api/sync', require('./src/routes/syncRoutes'))
app.use('/api/logs', require('./src/routes/logRoutes'))
app.use('/api/versions', require('./src/routes/versionRoutes'))
app.use('/api/sync-requests', require('./src/routes/syncRequestRoutes'))


// Health Check
app.get('/', (req, res) => {
  res.json({ message: 'DevSync API Running', status: 'OK' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))