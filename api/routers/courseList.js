const courseListRouter = require("express").Router();
const Course = require("../../database/models/course");
const mongoose = require('mongoose');
courseListRouter.get("/student/", async (req, res) => {
  try {
    let studentId = req.jwt_payload._id;
    //console.log(studentId);
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(404).json({
        message: "Invalid ID",
      });
    }
    let courseList = await Course.find({ students: { $in: studentId } });
    //console.log(courseList);
    if (!courseList) {
      return res.status(400).json({
        message: "No class found",
      });
    }
    //console.log(courseList);
    return res.status(200).json({
      message: "course list",
      courseList: courseList,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

courseListRouter.get("/faculty/", async (req, res) => {
  try {
    let facultyId = req.jwt_payload._id;
    if (!mongoose.Types.ObjectId.isValid(facultyId)) {
      return res.status(404).json({
        message: "Invalid ID",
      });
    }
    let courseList = await Course.find({ faculty: facultyId });
    //console.log(courseList);
    if (!courseList) {
      return res.status(400).json({
        message: "No class found",
      });
    }
    //console.log(courseList);
    return res.status(200).json({
      message: "class list",
      courseList: courseList,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = courseListRouter;
