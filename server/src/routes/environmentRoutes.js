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

router.use(protect) // all routes protected

router.post('/', createEnvironment)
router.get('/', getEnvironments)
router.get('/compare', compareEnvironments) // must come before '/:id'
router.get('/:id', getEnvironmentById)
router.delete('/:id', deleteEnvironment)

module.exports = router