const attendanceRouter = require("express").Router();
const fs = require("fs");
const Student = require("../../database/models/student");
const Class = require("../../database/models/class");
const cloudinaryUpload = require("../../helpers/cloudinary");
const IdentifyFace = require("../../helpers/faceIdentification");

attendanceRouter.post("/:classId", async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.name);
    var base64Data = data.replace(/^data:image\/jpeg;base64,/, "");

    fs.writeFile(
      "./public/uploads/output.png",
      base64Data,
      "base64",
      function (err) {
        if (err) console.log(err);
      }
    );

    let result = await cloudinaryUpload("./public/uploads/output.png");

    let personFound = await IdentifyFace(result.url);
    console.log(personFound);

    let student = await Student.findOne({ rollNo: personFound.name });
    let classes = await Class.findById(req.params.classId);
    let numberOfStudentsPresent;
    if (!classes) {
      return res.status(400).json({
        message: "No class found",
      });
    }
    if (student) {
      classes.present.push(student.id);
      numberOfStudentsPresent = classes.numberOfStudentsPresent;
      classes.numberOfStudentsPresent = numberOfStudentsPresent + 1;
      await classes.save();
      return res.status(200).json({
        message: "attendance marked!",
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

module.exports = attendanceRouter;
