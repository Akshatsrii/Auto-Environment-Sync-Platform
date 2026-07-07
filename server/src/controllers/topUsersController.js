const User = require("../models/User");
const Environment = require("../models/Environment");
const SyncLog = require("../models/SyncLog");

const getTopUsers = async (req, res) => {
  try {
    // Platform Stats
    const [totalUsers, totalEnvs, totalSyncs] = await Promise.all([
      User.countDocuments(),
      Environment.countDocuments(),
      SyncLog.countDocuments(),
    ]);

    // All Users
    const users = await User.find({}, "name email");

    // Top by Environments
    const topByEnvironments = await Promise.all(
      users.map(async (user) => {
        const envCount = await Environment.countDocuments({
          createdBy: user._id,
        });

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          envCount,
        };
      })
    );

    topByEnvironments.sort((a, b) => b.envCount - a.envCount);

    // Top by Syncs
    const topBySyncs = await Promise.all(
      users.map(async (user) => {
        const syncCount = await SyncLog.countDocuments({
          syncedBy: user._id,
        });

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          syncCount,
        };
      })
    );

    topBySyncs.sort((a, b) => b.syncCount - a.syncCount);

    res.json({
      platformStats: {
        totalUsers,
        totalEnvs,
        totalSyncs,
      },
      topByEnvironments,
      topBySyncs,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getTopUsers,
};