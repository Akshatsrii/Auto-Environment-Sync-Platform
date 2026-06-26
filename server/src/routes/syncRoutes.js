const express = require('express')
const router = express.Router()

const {
  previewSync,
  executeSync,
} = require('../controllers/syncController')

const { protect } = require('../middleware/authMiddleware')
const { userLimiter } = require('../middleware/rateLimiter')

router.use(protect)

router.post('/preview', previewSync)
router.post('/execute', userLimiter, executeSync)

module.exports = router