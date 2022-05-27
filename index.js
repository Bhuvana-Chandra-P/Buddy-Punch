const express = require("express");
const app = express();
require("dotenv").config({ path: "./env/.env" });
const port = process.env.PORT || 3001;
var cors = require("cors");
const bodyParser = require("body-parser");
require("./database/setup");
const dotenv = require("dotenv");
const path = require('path');

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const apiRouter = require("./api/api");
const authRouter = require("./api/auth");

app.use("/api", apiRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
