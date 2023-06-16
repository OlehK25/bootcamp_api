const express = require("express");
const bootcampsController = require("../controllers/bootcampsController");

const router = express.Router();

router
  .route("/")
  .get(bootcampsController.getAllBootcamps)
  .post(bootcampsController.createBootcamp);

router
  .route("/:id")
  .get(bootcampsController.getBootcamp)
  .put(bootcampsController.updateBootcamp)
  .delete(bootcampsController.deleteBootcamp);

module.exports = router;
