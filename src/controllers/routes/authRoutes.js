const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

// Endpoint: /api/auth/login
router.post("/login", controller.login);

// Endpoint: /api/auth/register
router.post("/register", controller.register);

// Endpoint: /api/auth/logout
router.post("/logout", controller.logout);

module.exports = router;
