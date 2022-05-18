const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Permission",
  new mongoose.Schema({
    subject: String,
    reason: String,
    startDate:Date,
    endDate:Date,
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    classes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
    status: {
      type: String,
      enum: ["submitted", "accepted", "rejected"],
      default: "submitted",
    },
  })
);
