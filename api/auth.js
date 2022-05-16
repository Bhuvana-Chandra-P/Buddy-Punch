const auth = require('express').Router();

const registerRouter = require("./routers/register");
const loginRouter = require("./routers/login");
const loginPasswordRouter = require("./routers/loginPassword");
const facultyLoginRouter = require("./routers/facultyLogin");
const facultyRegisterRouter = require("./routers/facultyRegister");

auth.use("faculty/register",facultyRegisterRouter);
auth.use("/faculty/login",facultyLoginRouter);
auth.use("/loginPassword",loginPasswordRouter);
auth.use("/login", loginRouter);
auth.use("/register", registerRouter);

module.exports = auth;