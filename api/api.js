const api = require("express").Router();
const {verifyJWT} = require("../middlewares/jwt")
const classListRouter = require("./routers/studentList");
const addClassRouter = require("./routers/addClass");
const addStudentRouter = require("./routers/addStudent");
const attendanceRouter = require("./routers/attendance");
const courseListRouter = require("./routers/courseList");
const createCourseRouter = require("./routers/createCourse");
const facultyListRouter = require("./routers/facultyList");
const classesAttendedRouter = require("./routers/noOfClasses");
const permissionRouter = require("./routers/permission");
const permissionListRouter = require("./routers/permissionList");
const requestPermissionRouter = require("./routers/requestPermission");
const studentListRouter = require("./routers/studentList");
const searchStudentRouter = require("./routers/searchStudent")
const getCourseDetailsById = require("./routers/getCourseById");
const attendanceReportRouter = require("./routers/attendanceReport");
const courseAttendanceReportRouter = require("./routers/courseAttendanceReport");
const monitorClassRouter = require("./routers/monitorClass");
const monitorClassDetails = require("./routers/classMonitoringDetails");
const getUserNameRouter = require("./routers/getUserName");

api.use("/getUserName",verifyJWT,getUserNameRouter);
api.use("/monitorClassDetails",monitorClassDetails);
api.use("/monitorClass",verifyJWT,monitorClassRouter);
api.use("/courseAttendanceReport",courseAttendanceReportRouter)
api.use("/attendanceReport",attendanceReportRouter)
api.use("/getCourseDetails",verifyJWT,getCourseDetailsById);
api.use("/searchStudent",searchStudentRouter);
api.use("/studentList",studentListRouter);
api.use("/requestPermission",verifyJWT,requestPermissionRouter);
api.use("/permissionList",permissionListRouter);   //verifyJWT,
api.use("/permission",permissionRouter);                //verifyJWT,
api.use("/noOfClassesAttended",verifyJWT,classesAttendedRouter);
api.use("/facultyList",facultyListRouter);
api.use("/createCourse",verifyJWT,createCourseRouter);
api.use("/courseList",verifyJWT,courseListRouter);
api.use("/attendance",verifyJWT,attendanceRouter);
api.use("/addStudent",verifyJWT,addStudentRouter);
api.use("/addClass",verifyJWT,addClassRouter);
api.use("/classList", classListRouter);


module.exports = api;