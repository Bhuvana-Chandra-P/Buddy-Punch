const attendanceReportRouter = require("express").Router();
const Class = require("../../database/models/class");
const Course = require("../../database/models/course");

attendanceReportRouter.post("/", async (req, res) => {
  try {
    const { classId, courseId } = req.body;

    let cl = await Class.findById(classId);
    let course = await Course.findById(courseId).populate({ path: "students" });
    let cc = await Course.findById(courseId);
    if (!cl) {
      return res.status(400).json({
        message: "No class found",
      });
    }
    if (!course) {
      return res.status(400).json({
        message: "No course found",
      });
    }
    let result = [];
    let data = {};
    let present = [];
    let absent = [];
    for (let i = 0; i < course.students.length; i++) {
      if (cl.present.includes(cc.students[i])) {
        data = {
          name: course.students[i].name,
          rollNo: course.students[i].rollNo,
        };
        present.push(data);
      } else {
        data = {
          name: course.students[i].name,
          rollNo: course.students[i].rollNo,
        };
        absent.push(data);
      }
    }
    result.push({ present: present });
    result.push({ absent: absent });
    // console.log("present" ,present);
    // console.log("absent" ,absent);
    // console.log(result);

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

module.exports = attendanceReportRouter;
