const express = require('express');
const router = express.Router();
const { getAllGames, addToWishlist, getUserWishlist } = require('../controllers/gameController');

// Route to get all games
router.get('/', getAllGames);

// Route to add a game to the wishlist
router.post('/add', addToWishlist);

// Route to get a user's wishlist
router.get('/wishlist/:userId', getUserWishlist);

module.exports = router;
