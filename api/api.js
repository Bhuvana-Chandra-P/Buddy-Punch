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
const searchStudentRouter = require("./routers/searchStudent");
const getCourseDetailsById = require("./routers/getCourseById");

api.use("/getCourseDetails",getCourseDetailsById);
api.use("/searchStudent",searchStudentRouter);
api.use("/studentList",studentListRouter);
api.use("/requestPermission",verifyJWT,requestPermissionRouter);
api.use("/permissionList",permissionListRouter);
api.use("/permission",verifyJWT,permissionRouter);
api.use("/noOfClassesAttended",verifyJWT,classesAttendedRouter);
api.use("/facultyList",facultyListRouter);
api.use("/createCourse",verifyJWT,createCourseRouter);
api.use("/courseList",verifyJWT,courseListRouter);
api.use("/attendance",attendanceRouter);
api.use("/addStudent",addStudentRouter);
api.use("/addClass",addClassRouter);
api.use("/classList", classListRouter);


module.exports = api;