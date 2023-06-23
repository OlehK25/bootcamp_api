const express = require("express");
const bootcampsController = require("../controllers/bootcampsController");
const Bootcamp = require("../models/bootcampModel");
const advancedResults = require("../middleware/advancedResults");

// Include other resource routers
const coursesRouter = require("./coursesRouter");

const router = express.Router();

// Re-route into other resource routers
router.use("/:bootcampId/courses", coursesRouter);

router
  .route("/radius/:zipcode/:distance")
  .get(bootcampsController.getBootcampsInRadius);

router.route("/:id/photo").put(bootcampsController.bootcampPhotoUpload);

router
  .route("/")
  .get(
    advancedResults(Bootcamp, "courses"),
    bootcampsController.getAllBootcamps
  )
  .post(bootcampsController.createBootcamp);

router
  .route("/:id")
  .get(bootcampsController.getBootcamp)
  .put(bootcampsController.updateBootcamp)
  .delete(bootcampsController.deleteBootcamp);

module.exports = router;
