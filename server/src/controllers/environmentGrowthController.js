const Environment = require("../models/Environment");

// GET /api/environment-growth
const getEnvironmentGrowth = async (req, res) => {
  try {
    const userId = req.user._id;

    const environments = await Environment.find({
      createdBy: userId,
    }).sort({ createdAt: 1 });

    // Monthly Growth
    const monthlyMap = {};

    environments.forEach((env) => {
      const month = `${env.createdAt.getFullYear()}-${String(
        env.createdAt.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!monthlyMap[month]) {
        monthlyMap[month] = {
          month,
          newEnvs: 0,
          cumulative: 0,
        };
      }

      monthlyMap[month].newEnvs++;
    });

    let total = 0;

    Object.values(monthlyMap).forEach((item) => {
      total += item.newEnvs;
      item.cumulative = total;
    });

    const monthlyGrowth = Object.values(monthlyMap);

    // Drift Status
    const driftSummary = {
      synced: environments.filter(
        (e) => e.driftStatus === "synced"
      ).length,

      drifted: environments.filter(
        (e) => e.driftStatus === "drifted"
      ).length,
    };

    // Environment Variable Count
    const variableGrowth = environments.map((env) => ({
      name: env.name,
      variables: env.variables.length,
    }));

    // Active / Inactive
    const statusSummary = {
      active: environments.filter((e) => e.status === "active").length,
      inactive: environments.filter((e) => e.status === "inactive").length,
    };

    res.json({
      monthlyGrowth,
      driftSummary,
      variableGrowth,
      statusSummary,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getEnvironmentGrowth,
};