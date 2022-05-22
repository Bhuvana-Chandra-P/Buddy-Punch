const searchStudentRouter = require("express").Router();
const Student = require("../../database/models/student");

searchStudentRouter.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    let studentList = await Student.find({
      name: {
        $regex: new RegExp(name, "i"),
      },
    }).select("rollNo name");
    console.log(studentList);
    if (!studentList) {
      return res.status(400).json({
        message: "No student found",
      });
    }
    // let result =[];
    // for(let i=0;i<studentList.length;i++)
    // {
    //   if()
    // }
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

module.exports = searchStudentRouter;
