const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../uploadMiddleware');
const { updateProfile } = require('../controllers/authController'); // ✅ Make sure this is correct

router.put('/profile/:userId', upload.single('profilePicture'), updateProfile);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
