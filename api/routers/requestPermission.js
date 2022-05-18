const requestPermissionRouter = require("express").Router();
const Class = require("../../database/models/class");
const Course = require("../../database/models/course");
const Permission = require("../../database/models/permission");

requestPermissionRouter.post("/", async (req, res) => {
  try {
    const { subject, reason,  courseId, startDate,endDate } = req.body;
    if (!subject || !reason  || !courseId || !startDate || !endDate) {
      return res.status(400).json({
        message: "Fill all the fields!",
      });
    }
    let course = await Course.findById(courseId).select('faculty');
    let permission = new Permission();
    permission.subject = subject;
    permission.reason = reason;
    permission.faculty = course.faculty;
    permission.course = courseId;
    permission.startDate = startDate;
    permission.endDate = endDate;
    permission.student = req.jwt_payload._id;

    await permission.save();

    return res.status(200).json({
      message: "Permission submitted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = requestPermissionRouter;
