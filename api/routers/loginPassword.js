const loginPasswordRouter = require("express").Router();
const Student = require("../../database/models/student");
const Faculty = require("../../database/models/faculty");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


loginPasswordRouter.post("/", async (req, res) => {
  try {
    const { number, password } = req.body;

    if (!number || !password) {
      return res.status(400).json({
        message: "Fill all the fields!",
      });
    }

    let student = await Student.findOne({ rollNo: number });
    let faculty = await Faculty.findOne({idNo : number});
    console.log("student",student);
    console.log("faculty",faculty);
    if (await bcrypt.compare(password, student.password)) {
      const token = jwt.sign(
        {
          _id: student._id,
          rollNo: student.rollNo,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "168h" } // 7d
      );
      console.log("token", token);
      return res.status(200).json({
        message: "Student Loggedin successfully",
        token,
        isFaculty:false
      });
    }
    else if (await bcrypt.compare(password, faculty.password)) {
      const token = jwt.sign(
        {
          _id: faculty._id,
          idNo: faculty.idNo,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "168h" } // 7d
      );
      console.log("token", token);
      return res.status(200).json({
        message: "faculty Loggedin successfully",
        token,
        isFaculty:true
      });
    }
    return res.status(400).json({
      message: "No student found",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = loginPasswordRouter;
