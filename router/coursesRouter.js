const express = require("express");
const coursesController = require("../controllers/coursesController");
const Course = require("../models/courseModel");
const advancedResults = require("../middleware/advancedResults");

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
  .post(coursesController.addCourse);

router
  .route("/:id")
  .get(coursesController.getCourse)
  .put(coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

module.exports = router;
