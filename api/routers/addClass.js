const addClassRouter = require("express").Router();
const Class = require("../../database/models/class");
const Course = require("../../database/models/course");

addClassRouter.post("/", async (req, res) => {
  try {
    const { courseId, date } = req.body;

    if (!courseId || !date) {
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
    cl.date = date;
    course.classes.push(cl.id);
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
