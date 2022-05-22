const addClassRouter = require("express").Router();
const Class = require("../../database/models/class");
const Course = require("../../database/models/course");
const { date, time } = require("../../helpers/dateAndTime");
const Monitor = require("../../database/models/monitor");
const StudentBehaviour = require("../../database/models/studentBehaviour")
addClassRouter.post("/", async (req, res) => {
  try {
    const { dateAndTime, courseId } = req.body;
    if (!courseId || !dateAndTime) {
      return res.status(400).json({
        message: "Fill all the fields!",
      });
    }
    let cl = new Class();
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({
        message: "No course found",
      });
    }
    cl.course = courseId;
    cl.date = dateAndTime;
    course.classes.push(cl.id);
    let monitor = new Monitor();
    monitor.classes = cl.id;
    cl.monitor = monitor.id;
    for(let i=0;i<course.students.length;i++)
    {
      let studentBehaviour = new StudentBehaviour();
      studentBehaviour.classes = cl.id;
      studentBehaviour.student = course.students[i];
      monitor.studentsBehaviour.push(studentBehaviour.id);
      await studentBehaviour.save();
    }
    await monitor.save();
    await course.save();
    await cl.save();
    return res.status(200).json({
      message: "Class scheduled successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = addClassRouter;
