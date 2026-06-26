const express = require('express')
const router = express.Router()

const {
  getLogs,
  getLogById,
} = require('../controllers/logController')

const { protect } = require('../middleware/authMiddleware')

router.use(protect)

router.get('/', getLogs)
router.get('/:id', getLogById)

module.exports = router