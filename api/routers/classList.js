const classListRouter = require("express").Router();
const Class = require("../../database/models/class");
const Course = require("../../database/models/course");

classListRouter.get("/:courseId", async (req, res) => {
  try {
    let courseId = req.params.courseId;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(404).json({
        message: "Invalid ID",
      });
    }
    let classList = await Course.findById(courseId)
      .select("name")
      .populate({ path: "class" });

    if (!classList) {
      return res.status(400).json({
        message: "No class found",
      });
    }
    return res.status(200).json({
      message: "class list",
      classList: classList,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = classListRouter;
