const registerRouter = require("express").Router();
const Student = require("../../database/models/student");
const cloudinaryUpload = require("../../helpers/cloudinary");
const AddFace = require("../../helpers/faceRecognition");
const fs = require("fs");
const bcrypt = require("bcrypt");

registerRouter.post("/", async (req, res) => {
  try {
    const { rollNo, password, email, name } = req.body;
    if (!rollNo || !password || !email || !name || !req.body.image) {
      return res.status(404).json({
        message: "Fill all required fields",
      });
    }
    if (await Student.findOne({ rollNo: rollNo }))
      return res.status(404).json({
        message: "Account already exists",
      });
    let student = new Student();

    const data = JSON.parse(req.body.image);
    var base64Data = data.replace(/^data:image\/jpeg;base64,/, "");

    fs.writeFile(
      `./public/uploads/${rollNo}.png`,
      base64Data,
      "base64",
      function (err) {
        if (err) console.log(err);
        else console.log("success");
      }
    );
    let result = await cloudinaryUpload(`./public/uploads/${rollNo}.png`);
    let faceRecognition = await AddFace(rollNo, result.url, student.id);
    if (!faceRecognition) {
      return res.status(404).json({
        message: "No person found",
      });
    }
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(password, salt);
    student.name = name;
    student.email = email;
    student.rollNo = rollNo;
    student.image = result.url;

    await student.save();

    return res.status(200).json({
      message: "Student successfully registered",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = registerRouter;
