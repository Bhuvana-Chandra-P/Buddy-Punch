const classesAttendedRouter = require("express").Router();
const Student = require("../../database/models/student");
const Course = require("../../database/models/course");

classesAttendedRouter.post("/", async (req, res) => {
  try {
    const { courseId, studentId } = req.body;

    if (!courseId || !studentId) {
      return res.status(400).json({
        message: "Fill all the fields!",
      });
    }

    let student = await Student.findById(studentId);
    let course = await Course.findById(courseId).populate("class");
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
    let ctr;
    for (let i = 0; i < course.class.length; i++) {
      if (course.class[i].includes(studentId)) {
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
