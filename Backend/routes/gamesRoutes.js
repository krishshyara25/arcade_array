const express = require('express');
const router = express.Router();
const { getAllGames, addToWishlist, getUserWishlist ,removeFromWishlist ,getUserDetails ,searchGame} = require('../controllers/gameController');

// Route to get all games
router.get('/', getAllGames);

//Route to get searched game details
router.get('/search',searchGame);

// Route to get a game by ID
router.get('/games/:id', getGameById);

// Route to add a game to the wishlist
router.post('/add', addToWishlist);

// Route to remove a game from the wishlist
router.delete('/remove', removeFromWishlist);

// Route to get a user's wishlist
router.get('/wishlist/:userId', getUserWishlist);

// Route to get user details (username and email)
router.get('/user/details/:userId', getUserDetails);

module.exports = router;
