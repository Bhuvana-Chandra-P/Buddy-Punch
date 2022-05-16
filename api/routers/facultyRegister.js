const facultyRegisterRouter = require("express").Router();
const Faculty = require("../../database/models/faculty");
const cloudinaryUpload = require("../../helpers/cloudinary");
const AddFace = require("../../helpers/faceRecognition");
const fs = require("fs");
const bcrypt = require("bcrypt");

facultyRegisterRouter.post("/", async (req, res) => {
  try {
    const { name, idNo, password, email, mobileNo } = req.body;
    if (await Faculty.findOne({ idNo: idNo }))
      return res.status(400).json({
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
    const salt = await bcrypt.genSalt(10);
    faculty.password = await bcrypt.hash(password, salt);
    faculty.name = name;
    faculty.email = email;
    faculty.idNo = idNo;
    faculty.mobileNo = mobileNo;
    faculty.image = result.url;

    await faculty.save();
    console.log(result.url);

    let faceRecognition = await AddFace(idNo, result.url);
    console.log(faceRecognition);

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
