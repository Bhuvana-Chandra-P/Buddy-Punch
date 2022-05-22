const facultyListRouter = require("express").Router();
const Faculty = require("../../database/models/faculty");

facultyListRouter.get("/", async (req, res) => {
  try {
    let facultyList = await Faculty.find().select("name");
    if (!facultyList) {
      return res.status(400).json({
        message: "No faculty found",
      });
    }
    //console.log(facultyList);
    return res.status(200).json({
      message: "faculty list",
      facultyList: facultyList,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = facultyListRouter;