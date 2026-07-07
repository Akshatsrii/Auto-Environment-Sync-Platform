const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");

// Generate PDF Report
const generatePDFReport = async (analytics) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();

    const buffers = [];

    doc.on("data", (chunk) => buffers.push(chunk));

    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });

    doc.fontSize(22).text("DevSync Analytics Report", {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(14).text(`Total Environments : ${analytics.totalEnvironments}`);
    doc.text(`Total Variables : ${analytics.totalVariables}`);
    doc.text(`Total Syncs : ${analytics.totalSyncs}`);
    doc.text(`Successful Syncs : ${analytics.successfulSyncs}`);
    doc.text(`Failed Syncs : ${analytics.failedSyncs}`);
    doc.text(`Drifted Environments : ${analytics.driftedEnvironments}`);
    doc.text(`Synced Environments : ${analytics.syncedEnvironments}`);

    doc.end();
  });
};

// Generate Excel Report
const generateExcelReport = async (analytics) => {
  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet("Analytics");

  sheet.columns = [
    { header: "Metric", key: "metric", width: 30 },
    { header: "Value", key: "value", width: 20 },
  ];

  sheet.addRows([
    {
      metric: "Total Environments",
      value: analytics.totalEnvironments,
    },
    {
      metric: "Total Variables",
      value: analytics.totalVariables,
    },
    {
      metric: "Total Syncs",
      value: analytics.totalSyncs,
    },
    {
      metric: "Successful Syncs",
      value: analytics.successfulSyncs,
    },
    {
      metric: "Failed Syncs",
      value: analytics.failedSyncs,
    },
    {
      metric: "Drifted Environments",
      value: analytics.driftedEnvironments,
    },
    {
      metric: "Synced Environments",
      value: analytics.syncedEnvironments,
    },
  ]);

  return workbook.xlsx.writeBuffer();
};

module.exports = {
  generatePDFReport,
  generateExcelReport,
};