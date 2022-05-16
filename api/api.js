const api = require("express").Router();

const createCourseRouter = require("./routers/createCourse");
const studentListRouter = require("./routers/studentList");
const facultyListRouter = require("./routers/facultyList");
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

api.use("/studentList",studentListRouter);
api.use("/requestPermission",requestPermissionRouter);
api.use("/permissionList",permissionListRouter);
api.use("/permission",permissionRouter);
api.use("/noOfClasses",classesAttendedRouter);
api.use("/facultyList",facultyListRouter);
api.use("/createCourse",createCourseRouter);
api.use("/courseList",courseListRouter);
api.use("/attendance",attendanceRouter);
api.use("/addStudent",addStudentRouter);
api.use("/addClass",addClassRouter);
api.use("/classList", classListRouter);
api.use("/facultyList", facultyListRouter);
api.use("/studentList", studentListRouter);
api.use("/login", createCourseRouter);

module.exports = api;