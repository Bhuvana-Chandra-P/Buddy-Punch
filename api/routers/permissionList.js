const permissionListRouter = require("express").Router();
const Permission = require("../../database/models/permission");
//const Faculty = require("../../database/models/faculty");
const {date} = require("../../helpers/dateAndTime")
permissionListRouter.get("/:courseId", async (req, res) => {
  try {
    
    let permissions = await Permission.find({ course : req.params.courseId ,status :"submitted"}).populate('student').populate('course');
    
    let dateAndTime =[];
    for(let i=0;i<permissions.length;i++)
    {
      let startDate = date(permissions[i].startDate);
      let endDate = date(permissions[i].endDate);
      let data = {
        startDate:startDate,
        endDate:endDate
      }
      dateAndTime.push(data);
      // permissions[i].date = data;
      //permissions[i].push(data);
      
    }
    
    return res.status(200).json({
      message: "Class scheduled successfully",
      permissions: permissions,
      dateAndTime:dateAndTime
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = permissionListRouter;
