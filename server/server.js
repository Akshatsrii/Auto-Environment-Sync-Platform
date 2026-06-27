const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./src/config/db");
const { connectRedis } = require("./src/config/redis");

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

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(ipLimiter);

// Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DevSync API Running 🚀",
  });
});

app.post("/test-body", (req, res) => {
  res.json(req.body);
});

app.use("/api/auth", authRoutes);
app.use("/api/environments", environmentRoutes);
app.use("/api/sync", syncRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/versions", versionRoutes);
app.use("/api/sync-requests", syncRequestRoutes);
app.use("/api/sessions", sessionRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler
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

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Server Startup Error:", err);
    process.exit(1);
  }
}

startServer();