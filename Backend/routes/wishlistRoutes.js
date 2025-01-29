const express = require('express');
const router = express.Router();
const { getWishlist } = require('../controllers/wishlistController');

// Route to get the user's wishlist
router.get('/:userId', getWishlist);

module.exports = router;
