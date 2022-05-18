const classesAttendedRouter = require("express").Router();
const Student = require("../../database/models/student");
const Course = require("../../database/models/course");

classesAttendedRouter.post("/", async (req, res) => {
  try {
    const { courseId } = req.body;
    let studentId = req.jwt_payload._id;

    if (!courseId || !studentId) {
      return res.status(400).json({
        message: "Fill all the fields!",
      });
    }

    let student = await Student.findById(studentId);
    let course = await Course.findById(courseId).populate("classes");
    if (!student) {
      return res.status(400).json({
        message: "No student found",
      });
    }
    if (!course) {
      return res.status(400).json({
        message: "No course found",
      });
    }
    let ctr=0;
    for (let i = 0; i < course.classes.length; i++) {
      if (course.classes[i].present.includes(studentId)) {
        ctr++;
      }
      //let student = await
    }

    return res.status(200).json({
      message: "Student attendance fetched",
      noOfClassesPresent: ctr,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = classesAttendedRouter;
