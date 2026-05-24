const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
