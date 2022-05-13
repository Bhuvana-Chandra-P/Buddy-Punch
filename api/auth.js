const auth = require('express').Router();

const registerRouter = require("./routers/register");
const loginRouter = require("./routers/login");

auth.use("/login", loginRouter);
auth.use("/register", registerRouter);

module.exports = auth;