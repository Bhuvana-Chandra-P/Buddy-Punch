const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Faculty",
  new mongoose.Schema({
    name: String,
    idNo: Number,
    password: String,
    email: String,
    image: String,
    mobileNo: Number,
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  })
);
