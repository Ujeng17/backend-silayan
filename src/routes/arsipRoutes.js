const express = require("express");
const router = express.Router();
const controller = require("../controllers/arsipController");

// Endpoint untuk mengambil semua data gabungan (Jaringan + Zoom)
router.get("/", controller.getAllArsip);

module.exports = router;
