const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Monitor",
  new mongoose.Schema({
    classes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    studentsBehaviour: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentBehaviour",
      },
    ],
  })
);
