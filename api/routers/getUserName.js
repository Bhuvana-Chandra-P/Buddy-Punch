const getUserNameRouter = require("express").Router();
const Student = require("../../database/models/student");
const Faculty = require("../../database/models/faculty");
getUserNameRouter.get("/", async (req, res) => {
  try {
    let id = req.jwt_payload._id;

    let student = await Student.findById(id);
    if (student) {
      return res.status(200).json({
        message: "success",
        name:student.name
      });
    }
    let faculty = await Faculty.findById(id)
    if (faculty) {
     
      return res.status(200).json({
        message: "success",
        name:faculty.name
      });
    }
    return res.status(400).json({
      message: "No loggedin user found",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = getUserNameRouter;
