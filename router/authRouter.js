const express = require("express");
const authController = require("../controllers/authController");
const authorization = require("../middleware/auth");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/me", authorization.protect, authController.getMe);

module.exports = router;
