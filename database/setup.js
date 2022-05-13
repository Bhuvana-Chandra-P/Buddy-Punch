require("dotenv").config({ path: "../env/.env" });
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error.message));
db.once("open", async () => {
  console.log("Connected to database");
});
