const getCourseDetailsById = require("express").Router();
const Class = require("../../database/models/class");
const Course = require("../../database/models/course");
const mongoose = require("mongoose");

getCourseDetailsById.get("/:courseId", async (req, res) => {
  try {
    let courseId = req.params.courseId;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(404).json({
        message: "Invalid ID",
      });
    }
    let course = await Course.findById(courseId)
      .populate({ path: "classes" })
      .populate({ path: "students" })
      .populate({path :"faculty"});
    //console.log(course);
    if (!course) {
      return res.status(400).json({
        message: "No class found",
      });
    }
    return res.status(200).json({
      message: "class list",
      course: course,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = getCourseDetailsById;
