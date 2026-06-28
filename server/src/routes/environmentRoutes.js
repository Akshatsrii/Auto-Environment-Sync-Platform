const express = require('express')
const router = express.Router()

const {
  createEnvironment,
  getEnvironments,
  getEnvironmentById,
  deleteEnvironment,
  compareEnvironments,
} = require('../controllers/environmentController')

const { protect } = require('../middleware/authMiddleware')
const { userLimiter } = require("../middleware/rateLimiter");

router.use(protect) // All routes protected
router.use(userLimiter)
router.post('/', createEnvironment)
router.get('/', getEnvironments)
router.get('/compare', compareEnvironments)
router.get('/:id', getEnvironmentById)
router.delete('/:id', deleteEnvironment)

module.exports = router