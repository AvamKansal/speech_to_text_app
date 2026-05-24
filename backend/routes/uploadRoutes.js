const express = require("express");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
});

router.post("/", upload.single("audio"), (req, res) => {
  res.json({
    message: "File uploaded successfully",
    file: req.file.originalname,
  });
});

module.exports = router;