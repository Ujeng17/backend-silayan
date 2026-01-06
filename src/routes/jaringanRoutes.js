const express = require("express");
const router = express.Router();
const controller = require("../controllers/jaringanController");

router.get("/", controller.getAll);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.get("/:id/pdf", controller.downloadPDF); // Endpoint PDF

module.exports = router;
