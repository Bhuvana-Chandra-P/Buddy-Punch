const getCourseDetailsById = require("express").Router();
const Class = require("../../database/models/class");
const Course = require("../../database/models/course");
const mongoose = require("mongoose");
const {date,time} = require("../../helpers/dateAndTime");
const Student = require("../../database/models/student");
const Permission = require("../../database/models/permission")
const Faculty = require("../../database/models/faculty")
getCourseDetailsById.get("/:courseId", async (req, res) => {
  try {
    let courseId = req.params.courseId;
    let id = req.jwt_payload._id;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(404).json({
        message: "Invalid ID",
      });
    }
    let course = await Course.findById(courseId)
      .populate({ path: "classes" })
      .populate({ path: "students" })
      .populate({path :"faculty"});

    let dateAndTime =[];
   
    for(let i=0;i<course.classes.length;i++)
    {
      let d = date(course.classes[i].date);
      let t = time(course.classes[i].date);
      let data = {
        date:d,
        time:t
      }
      dateAndTime.push(data);
     
     
    }
    if (!course) {
      return res.status(400).json({
        message: "No course found",
      });
    }
    let student = await Student.findById(id);
    if(student)
    {
      let permissions = await Permission.find();
      let per = [];
      for(let i=0;i<permissions.length;i++)
      {
        if(permissions[i].student == student.id)
        {
          per.push(permissions[i]);
        }
      }
      return res.status(200).json({
        message: "Class list",
        course: course,
        permissions:per,
        dateAndTime:dateAndTime
      });

    }
    return res.status(200).json({
      message: "Class list",
      course: course,
      dateAndTime:dateAndTime
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error, Try again Later!",
    });
  }
});

module.exports = getCourseDetailsById;
