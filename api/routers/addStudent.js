const addStudentRouter = require("express").Router();
const Student = require("../../database/models/student");
const Course = require("../../database/models/course");

addStudentRouter.post("/", async (req, res) => {
  try {
    const { courseId, studentId } = req.body;
    //console.log(courseId,studentId);
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
    if(!student.courses.includes(courseId))
    {
      student.courses.push(courseId);
      await student.save();
    }
    if(!course.students.includes(studentId))
    {
      course.students.push(studentId);
      await course.save();
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
