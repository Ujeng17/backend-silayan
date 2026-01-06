const JaringanModel = require("../models/jaringanModel");
const ZoomModel = require("../models/zoomModel");

exports.getAllArsip = async (req, res) => {
  try {
    // Ambil data dari kedua model
    const jaringan = await JaringanModel.getAll();
    const zoom = await ZoomModel.getAll();

    // Cek error dari Supabase
    if (jaringan.error) throw new Error(jaringan.error.message);
    if (zoom.error) throw new Error(zoom.error.message);

    // Pastikan data adalah array (handle jika null)
    const listJaringan = jaringan.data || [];
    const listZoom = zoom.data || [];

    // Mapping data Jaringan
    const dataJaringan = listJaringan.map((item) => ({
      ...item,
      kategori: "Jaringan",
      source_table: "layanan_jaringan",
    }));

    // Mapping data Zoom
    const dataZoom = listZoom.map((item) => ({
      ...item,
      kategori: "Zoom",
      source_table: "layanan_zoom",
    }));

    // Gabungkan
    const combined = [...dataJaringan, ...dataZoom];

    // Sort descending (Terbaru paling atas)
    combined.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    res.json(combined);
  } catch (error) {
    console.error("Arsip Error:", error); // Log ke console Vercel buat debugging
    res.status(500).json({ error: error.message });
  }
};
