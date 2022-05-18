const addStudentRouter = require("express").Router();
const Student = require("../../database/models/student");
const Course = require("../../database/models/course");

addStudentRouter.post("/", async (req, res) => {
  try {
    const { courseId, studentId } = req.body;
    console.log(courseId,studentId);
    if (!courseId || !studentId) {
      return res.status(400).json({
        message: "Fill all the fields!",
      });
    }
    let student = await Student.updateOne(
      { id:studentId },
      {
        $addToSet: {
         courses:courseId
        },
      }
    );
    let course = await Course.updateOne(
      { id:courseId },
      {
        $addToSet: {
         students:studentId
        },
      }
    );
    course = await Course.findById(courseId).populate('students');
    student = await Student.findById(studentId).populate('courses');
    course.students.push(studentId);
    await course.save();
    //console.log("student",student);
    //console.log("course",course);
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
    
    return res.status(200).json({
      message: "Student added to course",
      id:courseId
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = addStudentRouter;
