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

const upload = multer({ storage: diskStorage });

const { verifyToken } = require("../middlewares/verifiyToken");

router.route("/").get(verifyToken, userController.getAllUsers);

router
  .route("/register")
  .post(upload.single("avatar"), userController.register);

router.route("/login").post(userController.login);

module.exports = router;
