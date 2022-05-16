const studentListRouter = require("express").Router();
const Student = require("../../database/models/student");

studentListRouter.get("/", async (req, res) => {
  try {
    let studentList = await Student.find().select("rollNo");
    console.log(studentList);
    if (!studentList) {
      return res.status(400).json({
        message: "No student found",
      });
    }
    return res.status(200).json({
      message: "student list",
      studentList: studentList,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = studentListRouter;
