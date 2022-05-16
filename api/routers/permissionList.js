const permissionListRouter = require("express").Router();
const Permission = require("../../database/models/permission");
//const Faculty = require("../../database/models/faculty");

permissionListRouter.get("/", async (req, res) => {
  try {
    let facultyId = req.jwt_payload._id;
    let permissions = await Permission.find({ Faculty: facultyId });

    return res.status(200).json({
      message: "Class scheduled successfully",
      permissions: permissions,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = permissionListRouter;
