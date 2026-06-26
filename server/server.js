const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

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

dotenv.config();

const app = express();

// ------------------------
// Database
// ------------------------
connectDB();
connectRedis();

// ------------------------
// CORS
// ------------------------
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ------------------------
// Body Parser
// ------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------------
// Rate Limiter
// Development ke liye comment rakho
// ------------------------
// app.use(ipLimiter);

// ------------------------
// Debug Route
// ------------------------
app.post("/test-body", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

// ------------------------
// Root
// ------------------------
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DevSync API Running 🚀",
  });
});

// ------------------------
// API Routes
// ------------------------
app.use("/api/auth", authRoutes);
app.use("/api/environments", environmentRoutes);
app.use("/api/sync", syncRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/versions", versionRoutes);
app.use("/api/sync-requests", syncRequestRoutes);
app.use("/api/sessions", sessionRoutes);

// ------------------------
// 404
// ------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ------------------------
// Error Handler
// ------------------------
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",


// ------------------------
// Server
// ------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});