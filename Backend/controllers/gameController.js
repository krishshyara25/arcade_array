const Game = require('../models/Game');
const User = require('../models/userModel');

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Controller to fetch all games
const getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching games.' });
  }
};

// Controller to search for games by title
const searchGame = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const games = await Game.find({ name: { $regex: query, $options: 'i' } });

    if (games.length === 0) {
      return res.status(404).json({ message: 'No games found' });
    }

    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error searching for games' });
  }
};


// Controller to fetch game by ID
const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.status(200).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching game details" });
  }
};




// Controller to add a game to the wishlist
const addToWishlist = async (req, res) => {
  const { userId, gameId } = req.body;

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the game already exists in the wishlist
    if (user.wishlist.includes(gameId)) {
      return res.status(400).json({ message: 'Game already in wishlist' });
    }

    // Add the game ID to the wishlist (instead of the full game object)
    user.wishlist.push(gameId);
    await user.save();

    res.status(200).json({ message: 'Game added to wishlist', wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding game to wishlist' });
  }
};


//remove game from wishlist
const removeFromWishlist = async (req, res) => {
  try {
      const { userId, gameId } = req.params; // Use req.params instead of req.body

      if (!userId || !gameId) return res.status(400).json({ message: 'User ID and Game ID are required' });

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      user.wishlist = user.wishlist.filter(id => id.toString() !== gameId);
      await user.save();
      
      res.status(200).json({ message: 'Game removed from wishlist', wishlist: user.wishlist });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};


// Controller to get the user's wishlist
const getUserWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user and populate the wishlist with game details
    const user = await User.findById(userId).populate('wishlist');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching wishlist' });
  }
};


// Controller to get the user's username and email
const getUserDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user and only return username & email
    const user = await User.findById(userId).select('username email');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user); // Returns { username: "user123", email: "user@example.com" }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user details' });
  }
};



// ✅ Controller to Purchase a Game
const purchaseGame = async (req, res) => {
  try {
    const { userId, gameId } = req.body;

    // Find the game
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user already owns the game
    if (user.purchasedGames.includes(gameId)) {
      return res.status(400).json({ message: "You already own this game" });
    }

    // Create a Razorpay order
    const options = {
      amount: game.price * 100, // Razorpay takes amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (error) {
    console.error("Error purchasing game:", error);
    res.status(500).json({ message: "Error processing purchase" });
  }
};

// ✅ Controller to Verify Payment
const verifyPayment = async (req, res) => {
  try {
    const { userId, gameId, paymentId } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify payment ID (In real cases, you should use Razorpay's webhook)
    if (!paymentId) {
      return res.status(400).json({ message: "Invalid payment" });
    }

    // Add game to user's purchased list
    user.purchasedGames.push(gameId);
    await user.save();

    res.status(200).json({ message: "Payment successful, game purchased!", purchasedGames: user.purchasedGames });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

module.exports = { 
  getAllGames, 
  addToWishlist, 
  getUserWishlist, 
  removeFromWishlist, 
  getUserDetails, 
  searchGame, 
  getGameById, 
  purchaseGame, 
  verifyPayment 
};