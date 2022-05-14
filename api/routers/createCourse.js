const createCourseRouter = require("express").Router();
//const Student = require("../../database/models/student");
const Course = require("../../database/models/course");

createCourseRouter.post("/", async (req, res, next) => {
  try {
    const {name,code,students } = req.body;
    let facultyId = req.jwt_payload._id;
    if(!name || !code || !students || !facultyId)
    {
        return res.status(400).json({
            message: "Please fill all required details",
            token,
        });
    }

    let course = new Course;

    course.name = name;
    course.code = code;
    course.students =students;
    course.faculty = facultyId;

    await course.save();
    return res.status(200).json({
        message: "Course created successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = createCourseRouter;