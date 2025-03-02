const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/userController');

router.put('/profile/:userId', updateProfile);

module.exports = router;
