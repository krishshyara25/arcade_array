const mongoose = require('mongoose');

// Define schema for Game
const gameSchema = new mongoose.Schema({
    name: { type: String,required: true,trim: true,unique: true },
    description: { type: String, required: true },
    developer: { type: String, required: true },
    publisher: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    platforms: { type: [String], required: true, enum: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile', 'Other'] }
}, { timestamps: true });

// Create Game model
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
