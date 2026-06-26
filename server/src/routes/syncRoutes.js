const express = require('express')
const router = express.Router()

const {
  previewSync,
  executeSync,
} = require('../controllers/syncController')

const { protect } = require('../middleware/authMiddleware')

router.use(protect)

router.post('/preview', previewSync)
router.post('/execute', executeSync)

module.exports = router