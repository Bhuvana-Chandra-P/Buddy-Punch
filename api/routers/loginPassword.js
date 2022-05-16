const loginPasswordRouter = require("express").Router();
const Student = require("../../database/models/student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

loginPasswordRouter.post("/", async (req, res) => {
  try {
    const { rollNo, password } = req.body;

    if (!rollNo || !password) {
      return res.status(400).json({
        message: "Fill all the fields!",
      });
    }

    let student = await Student.findOne({ rollNo: personFound.name });
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
