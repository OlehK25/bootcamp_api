const express = require("express");
const userController = require("../controllers/usersController");
const User = require("../models/userModel");

const advancedResults = require("../middleware/advancedResults");
const authorization = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router.use(authorization.protect, authorization.authorize("admin"));

router
  .route("/")
  .get(advancedResults(User), userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
