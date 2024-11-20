require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const url = process.env.MONGO_URL;

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

app.listen(process.env.PORT || 5000, () => {
  console.log("app running on port:5000");
});
