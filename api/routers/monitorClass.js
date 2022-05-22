const MonitorClassRouter = require("express").Router();
const fs = require("fs");
const cloudinaryUpload = require("../../helpers/cloudinary");
const Monitor = require("../../helpers/monitor");
const Class = require("../../database/models/class");
const StudentBehaviour = require("../../database/models/studentBehaviour");
const Monitoring = require("../../database/models/monitor");

MonitorClassRouter.post("/", async (req, res) => {
  try {
    const data = JSON.parse(req.body.image);
    const classId = req.body.classId;
    var base64Data = data.replace(/^data:image\/jpeg;base64,/, "");

    fs.writeFile(
      "./public/uploads/monitor.png",
      base64Data,
      "base64",
      function (err) {
        if (err) console.log(err);
      }
    );

    let result = await cloudinaryUpload("./public/uploads/monitor.png");

    let results = await Monitor(result.url);
    let cl = await Class.findById(classId)
    //let monitor = await Monitoring(cl.monitor);
    console.log(results);


    for(let i=0;i<results.faceWithAttributes.length;i++)
    {
      let anger = results.faceWithAttributes[i].faceAttributes.emotion.anger;
      let contempt = results.faceWithAttributes[i].faceAttributes.emotion.contempt;
      let disgust = results.faceWithAttributes[i].faceAttributes.emotion.disgust;
      let fear = results.faceWithAttributes[i].faceAttributes.emotion.fear;
      let happiness = results.faceWithAttributes[i].faceAttributes.emotion.happiness;
      let neutral = results.faceWithAttributes[i].faceAttributes.emotion.neutral;
      let sadness = results.faceWithAttributes[i].faceAttributes.emotion.sadness;
      let surprise = results.faceWithAttributes[i].faceAttributes.emotion.surprise;
      let pitch = results.faceWithAttributes[i].faceAttributes.headPose.pitch;
      let roll = results.faceWithAttributes[i].faceAttributes.headPose.roll;
      let yaw = results.faceWithAttributes[i].faceAttributes.headPose.yaw;
      let eyeOccluded = results.faceWithAttributes[i].faceAttributes.occlusion.eyeOccluded;
      let smile = results.faceWithAttributes[i].faceAttributes.smile;
      if(results.foundPersons[i].name)
      {
        let studentBehaviour = await StudentBehaviour.findOne({student:results.foundPersons[i].name})
        
        if(studentBehaviour.neutral)
        {
          studentBehaviour.smile = (smile+studentBehaviour.smile)/2;
          studentBehaviour.anger = (anger+studentBehaviour.anger)/2;
          studentBehaviour.contempt = (contempt= studentBehaviour.contempt)/2;
          studentBehaviour.disgust = (disgust+studentBehaviour.disgust)/2;
          studentBehaviour.fear = (fear+studentBehaviour.fear)/2;
          studentBehaviour.happiness = (happiness+studentBehaviour.happiness)/2;
          studentBehaviour.neutral = (neutral+studentBehaviour.neutral)/2;
          studentBehaviour.sadness = (sadness+studentBehaviour.sadness)/2;
          studentBehaviour.surprise = (surprise+studentBehaviour.surprise)/2;
        }
        else{
          studentBehaviour.smile = smile;
          studentBehaviour.anger = anger;
          studentBehaviour.contempt = contempt;
          studentBehaviour.disgust = disgust;
          studentBehaviour.fear = fear;
          studentBehaviour.happiness = happiness;
          studentBehaviour.neutral = neutral;
          studentBehaviour.sadness = sadness;
          studentBehaviour.surprise = surprise;
        }
        if(Math.abs(pitch) > 5)
        {
          studentBehaviour.pitch = studentBehaviour.pitch+1;
        }
        if(Math.abs(roll) > 5)
        {
          studentBehaviour.roll = studentBehaviour.roll+1;
        }
        if(Math.abs(yaw) > 5)
        {
          studentBehaviour.yaw = studentBehaviour.yaw+1;
        }
        if(Math.abs(eyeOccluded) > 5)
        {
          studentBehaviour.eyeOccluded = studentBehaviour.eyeOccluded+1;
        }
        await studentBehaviour.save();
        console.log("studentfound " ,studentBehaviour);
      }
      
      
    }

    return res.status(200).json({
      message: "Monitoring class",
      result: results,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = MonitorClassRouter;
