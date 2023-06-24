const express = require("express");
const coursesController = require("../controllers/coursesController");
const Course = require("../models/courseModel");
const advancedResults = require("../middleware/advancedResults");
const authorization = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    coursesController.getAllCourses
  )
  .post(
    authorization.protect,
    authorization.authorize("publisher", "admin"),
    coursesController.addCourse
  );

router
  .route("/:id")
  .get(coursesController.getCourse)
  .put(
    authorization.protect,
    authorization.authorize("publisher", "admin"),
    coursesController.updateCourse
  )
  .delete(
    authorization.protect,
    authorization.authorize("publisher", "admin"),
    coursesController.deleteCourse
  );

module.exports = router;
