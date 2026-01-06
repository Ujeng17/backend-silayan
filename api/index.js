// File: api/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Path ini benar JIKA file ini ada di dalam folder 'api'
const jaringanRoutes = require("../src/routes/jaringanRoutes");
const zoomRoutes = require("../src/routes/zoomRoutes");
const arsipRoutes = require("../src/routes/arsipRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Main Routes
app.use("/api/jaringan", jaringanRoutes);
app.use("/api/zoom", zoomRoutes);
app.use("/api/arsip", arsipRoutes);

app.get("/", (req, res) => {
  res.send("API Layanan IT is Running...");
});

// Untuk Local Development
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export app untuk Vercel
module.exports = app;
