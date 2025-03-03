const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../uploadMiddleware');

router.put("/update-profile/:userId", upload.single("profilePicture"), authController.updateProfile);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
