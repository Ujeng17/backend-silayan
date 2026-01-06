const PDFDocument = require("pdfkit");

const generatePDF = (data, title, res) => {
  const doc = new PDFDocument();

  // Set header response agar browser mengenali ini file PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${title}-${Date.now()}.pdf`
  );

  doc.pipe(res);

  // Header PDF
  doc.fontSize(20).text(title, { align: "center" });
  doc.moveDown();
  doc
    .fontSize(12)
    .text(`Tanggal Cetak: ${new Date().toLocaleString()}`, { align: "center" });
  doc.moveDown();
  doc.text("------------------------------------------------------", {
    align: "center",
  });
  doc.moveDown();

  // Isi Data (Dynamic Loop)
  Object.keys(data).forEach((key) => {
    // Abaikan field internal
    if (key !== "id" && key !== "created_at") {
      // Format key agar lebih rapi (misal: nama_pemohon -> Nama Pemohon)
      const label = key.replace(/_/g, " ").toUpperCase();
      doc.font("Helvetica-Bold").text(`${label}:`);
      doc.font("Helvetica").text(`${data[key]}`);
      doc.moveDown(0.5);
    }
  });

  doc.moveDown();
  doc.text("Dokumen ini digenerate secara otomatis oleh sistem.", {
    align: "center",
    format: "italics",
  });

  doc.end();
};

module.exports = { generatePDF };
