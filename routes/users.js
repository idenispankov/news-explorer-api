const express = require("express");

const router = express.Router();
const { getCurrenUser } = require("../controllers/usersController");

// GetCurrentUser
router.get("/users/me", getCurrenUser);

module.exports = router;
