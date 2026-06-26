const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./src/config/db");
const { connectRedis } = require("./src/config/redis");
const { ipLimiter } = require("./src/middleware/rateLimiter");

dotenv.config();

const app = express();

// --------------------
// Connect Database & Redis
// --------------------
connectDB();
connectRedis();

// --------------------
// CORS
// --------------------
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// --------------------
// Middleware
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ipLimiter);

// --------------------
// Health Check
// --------------------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DevSync API Running",
  });
});

// --------------------
// Routes
// --------------------
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/environments", require("./src/routes/environmentRoutes"));
app.use("/api/sync", require("./src/routes/syncRoutes"));
app.use("/api/logs", require("./src/routes/logRoutes"));
app.use("/api/versions", require("./src/routes/versionRoutes"));
app.use("/api/sync-requests", require("./src/routes/syncRequestRoutes"));
app.use("/api/sessions", require("./src/routes/sessionRoutes"));

// --------------------
// 404
// --------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// --------------------
// Error Handler
// --------------------
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// --------------------
// Start Server
// --------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// --------------------
// Process Handlers
// --------------------
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});