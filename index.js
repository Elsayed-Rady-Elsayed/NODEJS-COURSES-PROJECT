require("dotenv").config();

const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

const url = process.env.MONGO_URL;

const { ERROR } = require("./utils/httpStatusText");

mongoose
  .connect(url)
  .then(() => {
    console.log("connected successfully");
  })
  .catch((e) => {
    console.log(e);
  });

const app = express();

app.use(cors());

app.use(express.json());

const coursesRouter = require("./routes/courses.route");

app.use("/api/courses", coursesRouter);

app.all("*", (req, res, next) => {
  return res
    .status(404)
    .json({ status: ERROR, message: "this resourse is not available" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("app running on port:5000");
});
