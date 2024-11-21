const express = require("express");

const router = express.Router();

const userController = require("../controllers/users.controller");

const multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uplodes");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileNewName = `user-${Date.now()}.${ext}`;
    cb(null, fileNewName);
  },
});

const fileFilter = function (req, file, cb) {
  const image = file.mimetype.split("/")[0];
  if (image === "image") {
    return cb(null, true);
  } else {
    return cb(appError.create("not supported file type", 400, FAIL), false);
  }
};

const upload = multer({ storage: diskStorage, fileFilter: fileFilter });

const { verifyToken } = require("../middlewares/verifiyToken");
const appError = require("../utils/appError");
const { FAIL } = require("../utils/httpStatusText");

router.route("/").get(verifyToken, userController.getAllUsers);

router
  .route("/register")
  .post(upload.single("avatar"), userController.register);

router.route("/login").post(userController.login);

module.exports = router;
