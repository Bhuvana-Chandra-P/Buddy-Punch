const permissionRouter = require("express").Router();
const Permission = require("../../database/models/permission");
const mongoose = require('mongoose')
permissionRouter.get("/accept/:permissionId", async (req, res) => {
  try {
    let permissionId = req.params.permissionId;
    //console.log(permissionId);
    // if (mongoose.Types.ObjectId.isValid(permissionId)) {
    //   return res.status(400).json({
    //     message: "Invalid ID",
    //   });
    // }
    let permission = await Permission.findById(permissionId);
    //console.log(permission);
    permission.status = "accepted";

    await permission.save();

    return res.status(200).json({
      message: "Permission accepted",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

permissionRouter.get("/reject/:permissionId", async (req, res) => {
  try {
    let permissionId = req.params.permissionId;
    // if (mongoose.Types.ObjectId.isValid(permissionId)) {
    //   return res.status(400).json({
    //     message: "Invalid ID",
    //   });
    // }
    let permission = await Permission.findById(permissionId);

    permission.status = "rejected";

    await permission.save();

    return res.status(200).json({
      message: "Permission rejected",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = permissionRouter;
