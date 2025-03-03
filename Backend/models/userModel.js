const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    bio: { type: String, default: '' }, // Short Bio
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
    purchasedGames: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
    isOnline: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }, // ✅ User registration date
});

// Middleware to update `updatedAt` before saving
userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
