const Environment = require("../models/Environment");
const SyncLog = require("../models/SyncLog");
const {
  generatePDFReport,
  generateExcelReport,
} = require("../utils/reportGenerator");

// GET /api/analytics
const getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const [environments, syncLogs] = await Promise.all([
      Environment.find({ createdBy: userId }),
      SyncLog.find({ syncedBy: userId }),
    ]);

    const analytics = {
      totalEnvironments: environments.length,
      totalVariables: environments.reduce(
        (sum, env) => sum + env.variables.length,
        0
      ),
      totalSyncs: syncLogs.length,
      successfulSyncs: syncLogs.filter(
        (log) => log.status === "success"
      ).length,
      failedSyncs: syncLogs.filter(
        (log) => log.status === "failed"
      ).length,
      driftedEnvironments: environments.filter(
        (env) => env.driftStatus === "drifted"
      ).length,
      syncedEnvironments: environments.filter(
        (env) => env.driftStatus === "synced"
      ).length,
    };

    res.json(analytics);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const exportPDF = async (req, res) => {
  try {
    const userId = req.user._id;

    const [environments, syncLogs] = await Promise.all([
      Environment.find({ createdBy: userId }),
      SyncLog.find({ syncedBy: userId }),
    ]);

    const analytics = {
      totalEnvironments: environments.length,
      totalVariables: environments.reduce(
        (sum, env) => sum + env.variables.length,
        0
      ),
      totalSyncs: syncLogs.length,
      successfulSyncs: syncLogs.filter(
        (log) => log.status === "success"
      ).length,
      failedSyncs: syncLogs.filter(
        (log) => log.status === "failed"
      ).length,
      driftedEnvironments: environments.filter(
        (env) => env.driftStatus === "drifted"
      ).length,
      syncedEnvironments: environments.filter(
        (env) => env.driftStatus === "synced"
      ).length,
    };

    const pdfBuffer = await generatePDFReport(analytics);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=analytics-report.pdf"
    );

    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const exportExcel = async (req, res) => {
  try {
    const userId = req.user._id;

    const [environments, syncLogs] = await Promise.all([
      Environment.find({ createdBy: userId }),
      SyncLog.find({ syncedBy: userId }),
    ]);

    const analytics = {
      totalEnvironments: environments.length,
      totalVariables: environments.reduce(
        (sum, env) => sum + env.variables.length,
        0
      ),
      totalSyncs: syncLogs.length,
      successfulSyncs: syncLogs.filter(
        (log) => log.status === "success"
      ).length,
      failedSyncs: syncLogs.filter(
        (log) => log.status === "failed"
      ).length,
      driftedEnvironments: environments.filter(
        (env) => env.driftStatus === "drifted"
      ).length,
      syncedEnvironments: environments.filter(
        (env) => env.driftStatus === "synced"
      ).length,
    };

    const excelBuffer = await generateExcelReport(analytics);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=analytics-report.xlsx"
    );

    res.send(excelBuffer);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getAnalytics,
  exportPDF,
  exportExcel,
};