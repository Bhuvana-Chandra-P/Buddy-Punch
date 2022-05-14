const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Class",
  new mongoose.Schema({
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },

    date: Date,
    present: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    absent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    numberOfStudentsPresent: Number,
  })
);
