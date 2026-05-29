const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const uploadRoutes =require("./routes/uploadRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/upload", uploadRoutes);
app.use("/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// Server
const PORT =process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
