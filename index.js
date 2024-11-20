const express = require("express");

const mongoose = require("mongoose");

const url =
  "mongodb+srv://sayedrady61:012301050180@courses.b9h82.mongodb.net/proj-2";

mongoose
  .connect(url)
  .then(() => {
    console.log("connected successfully");
  })
  .catch((e) => {
    console.log(e);
  });

const app = express();

app.use(express.json());

const coursesRouter = require("./routes/courses.route");

app.use("/api/courses", coursesRouter);

app.listen(5000, () => {
  console.log("app running on port:5000");
});
