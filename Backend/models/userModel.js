const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    bio: { type: String, default: '' },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
    purchasedGames: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
    isOnline: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    authType: { type: String, enum: ["email", "social"], default: "email" },
    profileVisibility: { type: Boolean, default: true },
    status: { type: String, enum: ['online', 'offline'], default: 'offline' },
    resetPasswordToken: { type: String }, // New: For reset link
    resetPasswordExpires: { type: Date }  // New: Token expiration
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Remove duplicate pre-save hook for updatedAt (not present in your code)
module.exports = mongoose.model('User', userSchema);