const mongoose = require("mongoose");

const transcriptionSchema = new mongoose.Schema({
  fileName: {
    type: String,
  },

  transcription: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "Transcription",
  transcriptionSchema
);