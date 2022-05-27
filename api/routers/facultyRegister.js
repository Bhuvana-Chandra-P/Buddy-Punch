const facultyRegisterRouter = require("express").Router();
const Faculty = require("../../database/models/faculty");
const cloudinaryUpload = require("../../helpers/cloudinary");
const AddFace = require("../../helpers/faceRecognition");
const fs = require("fs");
const bcrypt = require("bcrypt");
const Student = require("../../database/models/student");

facultyRegisterRouter.post("/", async (req, res) => {
  try {
    const { name, idNo, password, email, mobileNo } = req.body;
    if (!idNo || !password || !email || !mobileNo || !name || !req.body.image) {
      return res.status(404).json({
        message: "Fill all required fields",
      });
    }
    if (await Faculty.findOne({ idNo: idNo }))
      return res.status(404).json({
        message: "Account already exists",
    });
    if (await Student.findOne({ rollNo: idNo }))
      return res.status(404).json({
        message: "Account already exists",
    });
    let faculty = new Faculty();

    const data = JSON.parse(req.body.image);
    var base64Data = data.replace(/^data:image\/jpeg;base64,/, "");

    fs.writeFile(
      `./public/uploads/${idNo}.png`,
      base64Data,
      "base64",
      function (err) {
        if (err) console.log(err);
        else console.log("success");
      }
    );
    let result = await cloudinaryUpload(`./public/uploads/${idNo}.png`);
    let faceRecognition = await AddFace(idNo, result.url, faculty.id);
    console.log(faceRecognition);
    if (!faceRecognition) {
      return res.status(404).json({
        message: "No person found",
      });
    }
    const salt = await bcrypt.genSalt(10);
    faculty.password = await bcrypt.hash(password, salt);
    faculty.name = name;
    faculty.email = email;
    faculty.idNo = idNo;
    faculty.mobileNo = mobileNo;
    faculty.image = result.url;

    await faculty.save();

    return res.status(200).json({
      message: "faculty successfully registered",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = facultyRegisterRouter;
