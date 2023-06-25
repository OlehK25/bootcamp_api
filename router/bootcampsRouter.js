const express = require("express");
const bootcampsController = require("../controllers/bootcampsController");
const Bootcamp = require("../models/bootcampModel");
const advancedResults = require("../middleware/advancedResults");
const authorization = require("../middleware/auth");

// Include other resource routers
const coursesRouter = require("./coursesRouter");
const reviewRouter = require("./reviewsRouter");

const router = express.Router();

// Re-route into other resource routers
router.use("/:bootcampId/courses", coursesRouter);
router.use("/:bootcampId/reviews", reviewRouter);

router
  .route("/radius/:zipcode/:distance")
  .get(bootcampsController.getBootcampsInRadius);

router
  .route("/:id/photo")
  .put(
    authorization.protect,
    authorization.authorize("publisher", "admin"),
    bootcampsController.bootcampPhotoUpload
  );

router
  .route("/")
  .get(
    advancedResults(Bootcamp, "courses"),
    bootcampsController.getAllBootcamps
  )
  .post(
    authorization.protect,
    authorization.authorize("publisher", "admin"),
    bootcampsController.createBootcamp
  );

router
  .route("/:id")
  .get(bootcampsController.getBootcamp)
  .put(
    authorization.protect,
    authorization.authorize("publisher", "admin"),
    bootcampsController.updateBootcamp
  )
  .delete(
    authorization.protect,
    authorization.authorize("publisher", "admin"),
    bootcampsController.deleteBootcamp
  );

module.exports = router;
