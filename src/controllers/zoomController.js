const ZoomModel = require("../models/zoomModel");
const { generatePDF } = require("../utils/pdfGenerator");

exports.getAll = async (req, res) => {
  const { data, error } = await ZoomModel.getAll();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.create = async (req, res) => {
  const { data, error } = await ZoomModel.create(req.body);
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await ZoomModel.update(id, req.body);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.delete = async (req, res) => {
  const { error } = await ZoomModel.delete(req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Data deleted successfully" });
};

exports.downloadPDF = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await ZoomModel.getById(id);
  if (error || !data) return res.status(404).json({ error: "Data not found" });

  generatePDF(data, "SURAT LAYANAN ZOOM", res);
};
