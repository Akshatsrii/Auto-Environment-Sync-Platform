const SyncLog = require("../models/SyncLog");

// GET /api/sync-analytics
const getSyncAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;
    const period = Number(req.query.period || 30);

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - period);

    const logs = await SyncLog.find({
      syncedBy: userId,
      createdAt: { $gte: fromDate },
    }).sort({ createdAt: 1 });

    const trendMap = {};

    logs.forEach((log) => {
      const date = log.createdAt.toISOString().split("T")[0];

      if (!trendMap[date]) {
        trendMap[date] = {
          date,
          completed: 0,
          failed: 0,
          queued: 0,
        };
      }

      if (log.status === "success") {
        trendMap[date].completed++;
      } else {
        trendMap[date].failed++;
      }
    });

    const trend = Object.values(trendMap);

    const statusBreakdown = {
      completed: logs.filter((l) => l.status === "success").length,
      failed: logs.filter((l) => l.status === "failed").length,
      active: 0,
      queued: 0,
    };

    // Duration abhi SyncLog me available nahi hai,
    // isliye placeholder values.
    const performance = {
      avgSeconds: 0,
      minSeconds: 0,
      maxSeconds: 0,
    };

    res.json({
      performance,
      statusBreakdown,
      trend,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getSyncAnalytics,
};