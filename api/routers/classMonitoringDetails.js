const displayMonitoringDetails = require("express").Router();
const Class = require("../../database/models/class");
const Monitoring = require("../../database/models/monitor");
const StudentBehaviour = require("../../database/models/studentBehaviour");

displayMonitoringDetails.get("/:classId", async (req, res) => {
  try {
    const classId = req.params.classId;
    //console.log(classId);
    let cl = await Class.findById(classId);
    if(!cl)
    {
      return res.status(400).json({
        message: "No class found",
      });
    }
    //console.log(cl);
    let monitor = await Monitoring.findById(cl.monitor)
    if(!monitor)
    {
      return res.status(400).json({
        message: "No monitoring files found",
      });
    }
    let result=[];
    let comment;
    for(let i=0;i<monitor.studentsBehaviour.length;i++)
    {
      let student = await StudentBehaviour.findById(monitor.studentsBehaviour[i]).populate("student");
      console.log(student);
      if(student.roll > 5 || student.pitch > 5 || student.yaw > 5)
      {
        comment = 'Head was not in correct position seems like he/she did not listen properly. ';
      }
      if(student.happiness > 0.7 && student.sadness < 0.5 && student.neutral > 0.5)
      {
        comment += 'The student seem so relaxed high chance that he understood what has been tought in class. '
      }
      if(student.happiness < 0.4 && student.sadness > 0.5  && student.neutral < 0.7 && student.fear > 0.5)
      {
        comment += 'The student seem so tensed. '
      }
      if(student.happiness > 0.7)
      {
        comment += 'The student seems to be happy. '
      }
      if(student.neutral > 0.7)
      {
        comment += 'The student looks clam. '
      }
      if(student.smile > 4)
      {
        comment += 'The student smiled some time. May be you cracked a joke! '
      }
      student.overall = comment;
      await student.save();
      result.push(student);
      comment='';
    }
    //console.log("moni",monitor);

    return res.status(200).json({
      message: "Monitoring class",
      monitor: result,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = displayMonitoringDetails;
