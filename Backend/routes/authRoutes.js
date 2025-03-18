const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../uploadMiddleware');
const { auth0Login } = require("../controllers/authController");
const { auth0Signup } = require("../controllers/authController");

router.post("/auth0", auth0Login);
router.post("/auth0signup", auth0Signup);
router.put("/update-profile/:userId", upload.single("profilePicture"), authController.updateProfile);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.put("/update-profile-visibility/:userId", authController.updateProfileVisibility);

router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword); // New
router.post('/reset-password', authController.resetPassword); // New



module.exports = router;