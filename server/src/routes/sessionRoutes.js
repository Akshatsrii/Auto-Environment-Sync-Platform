const express = require('express')
const router = express.Router()
const { getActiveSessions, revokeSession, revokeAllSessions } = require('../controllers/sessionController')
const { protect } = require('../middleware/authMiddleware')

router.use(protect)

router.get('/', getActiveSessions)
router.delete('/:id', revokeSession)
router.delete('/', revokeAllSessions)

module.exports = router