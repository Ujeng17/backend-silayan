const JaringanModel = require("../models/jaringanModel");
const ZoomModel = require("../models/zoomModel");

exports.getAllArsip = async (req, res) => {
  try {
    const jaringan = await JaringanModel.getAll();
    const zoom = await ZoomModel.getAll();

    // Tambahkan label kategori agar frontend tahu ini data apa
    const dataJaringan = (jaringan.data || []).map((item) => ({
      ...item,
      kategori: "Jaringan",
      source_table: "layanan_jaringan",
    }));
    const dataZoom = (zoom.data || []).map((item) => ({
      ...item,
      kategori: "Zoom",
      source_table: "layanan_zoom",
    }));

    // Gabungkan array
    const combined = [...dataJaringan, ...dataZoom];

    // Sort by created_at descending (terbaru diatas)
    combined.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    res.json(combined);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
