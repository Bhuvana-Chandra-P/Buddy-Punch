const courseAttendanceReportRouter = require("express").Router();
const Course = require("../../database/models/course");

courseAttendanceReportRouter.get("/:courseId", async (req, res) => {
  try {
    const  courseId  = req.params.courseId;

    let course = await Course.findById(courseId)
      .populate({ path: "students" })
      .populate({ path: "classes" });
    if (!course) {
      return res.status(400).json({
        message: "No course found",
      });
    }
    let result = [];
    let data = {};
    for (let i = 0; i < course.students.length; i++) {
      let ctr = 0;
      let studentId = course.students[i].id;
      for (let i = 0; i < course.classes.length; i++) {
        if (course.classes[i].present.includes(studentId)) {
          ctr++;
        }
      }

      data = {
        name: course.students[i].name,
        rollNo: course.students[i].rollNo,
        noOfClassesPresent: ctr,
      };
      result.push(data);
      ctr = 0;
    }

    return res.status(200).json({
      message: "Report Generated",
      result: result,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = courseAttendanceReportRouter;
