const express = require("express");

const router = express.Router();

const userController = require("../controllers/users.controller");

router.route("/").get(userController.getAllUsers);

router.route("/register").get(userController.register);

router.route("/login").get(userController.login);

module.exports = router;
