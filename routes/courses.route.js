const express = require("express");

const { validationSchema } = require("../middlewares/validationSchema");

const coursesController = require("../controllers/courses-controller");

const router = express.Router();

const { verifyToken } = require("../middlewares/verifiyToken");
const userRoles = require("../utils/roles");
const allowTo = require("../middlewares/allowTo");

router
  .route("/")
  .get(coursesController.getCourses)
  .post(
    verifyToken,
    allowTo(userRoles.ADMIN, userRoles.MANAGER),
    validationSchema(),
    coursesController.addCourse
  );

router
  .route("/:id")
  .get(coursesController.getCourse)
  .patch(
    verifyToken,
    allowTo(userRoles.ADMIN, userRoles.MANAGER),
    coursesController.updateCourse
  )
  .delete(
    verifyToken,
    allowTo(userRoles.ADMIN, userRoles.MANAGER),
    coursesController.deletCourse
  );

module.exports = router;
