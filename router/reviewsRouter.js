const express = require("express");
const reviewsController = require("../controllers/reviewsController");
const Review = require("../models/reviewModel");

const advancedResults = require("../middleware/advancedResults");
const authorization = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "bootcamp",
      select: "name description",
    }),
    reviewsController.getAllReviews
  )
  .post(
    authorization.protect,
    authorization.authorize("user", "admin"),
    reviewsController.createReview
  );

router
  .route("/:id")
  .get(reviewsController.getReview)
  .put(
    authorization.protect,
    authorization.authorize("user", "admin"),
    reviewsController.updateReview
  )
  .delete(
    authorization.protect,
    authorization.authorize("user", "admin"),
    reviewsController.deleteReview
  );

module.exports = router;
