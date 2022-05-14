const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    code: String,
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    classes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
  })
);
