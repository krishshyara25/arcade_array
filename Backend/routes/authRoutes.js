const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../uploadMiddleware');
const { socialLogin } = require("../controllers/authController");
const { auth0Signup } = require("../controllers/authController");

router.post("/auth0", auth0Login);
router.post("/auth0signup", auth0Signup);
router.put("/update-profile/:userId", upload.single("profilePicture"), authController.updateProfile);
router.post('/signup', authController.signup);
router.post('/login', authController.login);


module.exports = router;