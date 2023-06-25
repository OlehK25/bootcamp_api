const express = require("express");
const authController = require("../controllers/authController");
const authorization = require("../middleware/auth");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/me", authorization.protect, authController.getMe);
router.put(
  "/updatedetails",
  authorization.protect,
  authController.updateDetails
);
router.post("/forgotpassword", authController.forgotPassword);
router.put("/resetpassword/:resettoken", authController.resetPassword);
router.put(
  "/updatepassword",
  authorization.protect,
  authController.updatePassword
);

module.exports = router;
