const http = require("http");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./src/config/db");
const { connectRedis } = require("./src/config/redis");
const { initSocket } = require("./src/config/socket");

// Middleware
const { ipLimiter } = require("./src/middleware/rateLimiter");

// Routes
const authRoutes = require("./src/routes/authRoutes");
const environmentRoutes = require("./src/routes/environmentRoutes");
const syncRoutes = require("./src/routes/syncRoutes");
const logRoutes = require("./src/routes/logRoutes");
const versionRoutes = require("./src/routes/versionRoutes");
const syncRequestRoutes = require("./src/routes/syncRequestRoutes");
const sessionRoutes = require("./src/routes/sessionRoutes");
const jobsRoutes = require("./src/routes/jobsRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");
const analyticsRoutes = require("./src/routes/analyticsRoutes");
const syncAnalyticsRoutes = require("./src/routes/syncAnalyticsRoutes");
const environmentGrowthRoutes = require("./src/routes/environmentGrowthRoutes");
const topUsersRoutes = require("./src/routes/topUsersRoutes");

// Scheduler
const { startDriftScheduler } = require("./src/scheduler/driftScheduler");

// Bull Board
const { serverAdapter } = require("./src/config/bullBoard");

// Workers
require("./src/workers/syncWorker");
require("./src/workers/driftWorker");
require("./src/workers/notificationWorker");

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL || "http://localhost:5173"
        : "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Rate Limiter
if (process.env.NODE_ENV === "production") {
  app.use(ipLimiter);
}

// Bull Board Admin Dashboard
app.use(
  "/admin/queues",
  (req, res, next) => {
    const token = req.headers["x-admin-token"];

    if (token !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    next();
  },
  serverAdapter.getRouter()
);

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DevSync API Running 🚀",
  });
});

app.post("/test-body", (req, res) => {
  res.json(req.body);
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/environments", environmentRoutes);
app.use("/api/sync", syncRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/versions", versionRoutes);
app.use("/api/sync-requests", syncRequestRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/sync-analytics", syncAnalyticsRoutes);
app.use("/api/environment-growth", environmentGrowthRoutes);
app.use("/api/top-users", topUsersRoutes);
app.use("/api/notifications", notificationRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await connectDB();
    await connectRedis();

    // Start Drift Scheduler
    startDriftScheduler();

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 Socket.IO initialized`);
      console.log(`📊 Bull Board: http://localhost:${PORT}/admin/queues`);
    });
  } catch (err) {
    console.error("Server Startup Error:", err);
    process.exit(1);
  }
}

startServer();