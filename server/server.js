const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./src/config/db");
const { connectRedis } = require("./src/config/redis");
const { ipLimiter } = require("./src/middleware/rateLimiter");

dotenv.config();

const app = express();

// --------------------
// Middleware
// --------------------
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(ipLimiter);

// --------------------
// Routes
// --------------------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DevSync API Running",
  });
});

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/environments", require("./src/routes/environmentRoutes"));
app.use("/api/sync", require("./src/routes/syncRoutes"));
app.use("/api/logs", require("./src/routes/logRoutes"));
app.use("/api/versions", require("./src/routes/versionRoutes"));
app.use("/api/sync-requests", require("./src/routes/syncRequestRoutes"));

// Uncomment when compareRoutes.js exists
// app.use("/api/compare", require("./src/routes/compareRoutes"));

// --------------------
// 404 Handler
// --------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// --------------------
// Global Error Handler
// --------------------
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// --------------------
// Start Server
// --------------------
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// --------------------
// Handle Unhandled Rejections
// --------------------
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});