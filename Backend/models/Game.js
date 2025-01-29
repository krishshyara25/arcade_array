const mongoose = require('mongoose');

// Define schema for Game
const gameSchema = new mongoose.Schema({
    name: { type: String,required: true },
    price: { type: Number,required: true }
});

// Create Game model
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
