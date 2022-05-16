const addStudentRouter = require("express").Router();
const Student = require("../../database/models/student");
const Course = require("../../database/models/course");

addStudentRouter.post("/", async (req, res) => {
  try {
    const { courseId, studentId } = req.body;

    if (!courseId || !studentId) {
      return res.status(400).json({
        message: "Fill all the fields!",
      });
    }

    let student = await Student.findById(studentId);
    let course = await Course.findById(courseId);
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
    course.students.push(studentId);
    student.courses.push(courseId);

    await course.save();
    await student.save();
    return res.status(200).json({
      message: "Student added to course",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = addStudentRouter;
