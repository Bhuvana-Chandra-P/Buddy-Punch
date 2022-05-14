const api = require("express").Router();

const createCourseRouter = require("./routers/createCourse");
const studentListRouter = require("./routers/studentList");
const facultyListRouter = require("./routers/facultyList");
const classListRouter = require("./routers/studentList");

api.use("/classList", classListRouter);
api.use("/facultyList", facultyListRouter);
api.use("/studentList", studentListRouter);
api.use("/login", createCourseRouter);

module.exports = api;