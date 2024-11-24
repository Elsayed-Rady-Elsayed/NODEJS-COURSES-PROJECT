require("dotenv").config();

const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

const path = require("path");

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

app.use("/uplodes", express.static(path.join(__dirname, "uplodes")));

app.use(cors());

app.use(express.json());

const coursesRouter = require("./routes/courses.route");

const userRouter = require("./routes/user.route");

app.use("/api/courses", coursesRouter);

app.use("/api/users", userRouter);

//prepar for deployment

app.all("*", (req, res, next) => {
  return res
    .status(404)
    .json({ status: ERROR, message: "this resourse is not available" });
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || "Internal Server Error",
    message: error.message || "Something went wrong",
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("app running on port:5000");
});
