const Transcription = require("../models/Transcription");
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { OpenAI } = require("openai");

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.single("audio"), async (req, res) => {
  try {
    const audioPath = req.file.path;

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: "whisper-1",
    });

const savedData = await Transcription.create({
  fileName: req.file.filename,
  transcription: transcription.text,
});

res.json(savedData);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Transcription failed",
    });
  }
});

module.exports = router;