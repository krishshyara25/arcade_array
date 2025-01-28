const express = require('express');
const router = express.Router();
const { getAllGames, addToWishlist } = require('../controllers/gameController');

// Route to get all games
router.get('/', getAllGames);

// Route to add a game to the wishlist
router.post('/add', addToWishlist);

module.exports = router;
