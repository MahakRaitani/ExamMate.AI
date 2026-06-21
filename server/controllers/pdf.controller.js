import PDFDocument from "pdfkit";

export const pdfDownload = async (req, res) => {
  try {
    const { result } = req.body;

    if (!result) {
      return res.status(400).json({ error: "No content provided" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="ExamMateAI_Notes.pdf"'
    );

    doc.pipe(res);

    // Title
    doc.fontSize(20).text("ExamMate.AI Notes", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Importance: ${result.importance || "N/A"}`);
    doc.moveDown();

    // Sub Topics
    doc.fontSize(16).text("Sub Topics");
    doc.moveDown(0.5);

    const subTopics = result.subTopics || {};

    Object.entries(subTopics).forEach(([star, topics]) => {
      doc.fontSize(13).text(`${star} Topics:`);

      (topics || []).forEach((t) => {
        doc.fontSize(12).text(`• ${t}`);
      });

      doc.moveDown(0.5);
    });

    doc.moveDown();

    // Notes (safe formatting)
    doc.fontSize(16).text("Notes");
    doc.moveDown(0.5);

    const notesText = (result.notes || "").replace(/[#*_]/g, "");

    doc.fontSize(12).text(notesText, {
      width: 500,
      align: "left"
    });

    doc.moveDown();

    // Revision Points
    doc.fontSize(16).text("Revision Points");
    doc.moveDown(0.5);

    (result.revisionPoints || []).forEach((p) => {
      doc.fontSize(12).text(`• ${p}`);
    });

    doc.moveDown();

    // Questions
    doc.fontSize(16).text("Important Questions");
    doc.moveDown(0.5);

    const questions = result.questions || {};

    doc.fontSize(13).text("Short Questions:");
    (questions.short || []).forEach((q) => {
      doc.fontSize(12).text(`• ${q}`);
    });

    doc.moveDown(0.5);

    doc.fontSize(13).text("Long Questions:");
    (questions.long || []).forEach((q) => {
      doc.fontSize(12).text(`• ${q}`);
    });

    doc.moveDown(0.5);

    doc.fontSize(13).text("Diagram Question:");
    doc.fontSize(12).text(questions.diagram || "N/A");

    doc.end();
  } catch (error) {
    console.error("PDF Error:", error);
    res.status(500).json({ error: "PDF generation failed" });
  }
};