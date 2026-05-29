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

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

// Multer Validation
const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {

    if (
      file.mimetype.startsWith("audio/")
    ) {

      cb(null, true);

    } else {

      cb(
        new Error(
          "Only audio files are allowed"
        ),
        false
      );
    }
  },
});

// Upload + Transcription Route
router.post(
  "/",
  upload.single("audio"),

  async (req, res) => {

    try {

      // Check file
      if (!req.file) {

        return res.status(400).json({
          error:
            "No audio file uploaded",
        });
      }

      const audioPath =
        req.file.path;

      // Whisper API
      const transcription =
        await openai.audio.transcriptions.create({
          file:
            fs.createReadStream(audioPath),

          model:
            "whisper-1",
        });

      // Empty transcript validation
      if (!transcription.text) {

        return res.status(400).json({
          error:
            "No speech detected in audio",
        });
      }

      // Save to MongoDB
      const savedData =
        await Transcription.create({

          fileName:
            req.file.originalname,

          transcription:
            transcription.text,
        });

      // Delete uploaded file
      fs.unlinkSync(audioPath);

      // Response
      res.json({
        transcription:
          savedData.transcription,

        fileName:
          savedData.fileName,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        error:
          error.message ||
          "Transcription failed",
      });
    }
  }
);

// Fetch History
router.get(
  "/history",

  async (req, res) => {

    try {

      const history =
        await Transcription.find()
          .sort({ createdAt: -1 });

      res.json(history);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error:
          "Failed to fetch history",
      });
    }
  }
);

module.exports = router;