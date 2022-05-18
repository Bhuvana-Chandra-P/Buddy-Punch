const registerRouter = require("express").Router();
const Student = require("../../database/models/student");
const cloudinaryUpload = require("../../helpers/cloudinary");
const AddFace = require("../../helpers/faceRecognition");
const fs = require("fs");
const bcrypt = require("bcrypt");

registerRouter.post("/", async (req, res) => {
  try {
    const { rollNo, password, email, name, mobileNo } = req.body;
    if (await Student.findOne({ rollNo: rollNo }))
      return res.status(400).json({
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
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(password, salt);
    student.name = name;
    student.email = email;
    student.rollNo = rollNo;
    student.mobileNo = mobileNo;
    student.image = result.url;

    await student.save();
    console.log(result.url);

    let faceRecognition = await AddFace(rollNo, result.url,student.id);
    console.log(faceRecognition);

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
