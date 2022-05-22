const mongoose = require("mongoose");

module.exports = mongoose.model(
  "StudentBehaviour",
  new mongoose.Schema({
    classes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    smile: {
      type: Number,
      default: 0,
    },
    roll: {
      type: Number,
      default: 0,
    },
    yaw: {
      type: Number,
      default: 0,
    },
    pitch: {
      type: Number,
      default: 0,
    },
    anger: {
      type: Number,
      default: 0,
    },
    contempt: {
      type: Number,
      default: 0,
    },
    disgust: {
      type: Number,
      default: 0,
    },
    fear: {
      type: Number,
      default: 0,
    },
    happiness: {
      type: Number,
      default: 0,
    },
    neutral: {
      type: Number,
      default: 0,
    },
    sadness: {
      type: Number,
      default: 0,
    },
    surprise: {
      type: Number,
      default: 0,
    },
    eyeOccluded: {
      type: Number,
      default: 0,
    },
    noise: {
      type: Number,
      default: 0,
    },
    overall: String,
  })
);
