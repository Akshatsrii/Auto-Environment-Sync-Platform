const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  getTopUsers,
} = require("../controllers/topUsersController");

router.use(protect);

// GET /api/top-users
router.get("/", getTopUsers);

module.exports = router;