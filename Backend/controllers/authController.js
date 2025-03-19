const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/userModel');
const { OAuth2Client } = require('google-auth-library');
const { sendResetEmail } = require('../utils/email'); // New import
const client = new OAuth2Client(process.env.AUTH0_CLIENT_ID);

// Signup controller (unchanged)
exports.signup = async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;
    if (!firstname || !lastname || !username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'You already have an account with this email or username' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstname, lastname, username, email, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.status(201).json({ message: 'User registered successfully', token, userId: newUser._id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Login controller (unchanged)
exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
        const user = await User.findOne({ username });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        user.status = 'online';
        await user.save();
        console.log(`Login: ${user._id} set to online`);
        if (global.io) {
            global.io.emit('status-update', { friendId: user._id, status: 'online' });
            console.log(`Login: Emitted status-update for ${user._id}`);
        }
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ message: 'Login successful', token, userId: user._id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Forgot Password controller (new)
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No account found with this email' });
        }
        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();
        await sendResetEmail(email, token);
        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        console.error('Forgot Password Error:', error);
        res.status(500).json({ message: 'Failed to process request' });
    }
};

// Reset Password controller (new)
exports.resetPassword = async (req, res) => {
    const { token, password } = req.body;
    if (!token || !password) {
        return res.status(400).json({ message: 'Token and new password are required' });
    }
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }
        user.password = password; // Will be hashed by pre-save hook
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Reset Password Error:', error);
        res.status(500).json({ message: 'Failed to reset password' });
    }
};

// Existing controllers (unchanged)
exports.updateProfile = async (req, res) => {
    const { userId } = req.params;
    const { username, profilePicture } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (username) user.username = username;
        if (profilePicture) user.profilePicture = profilePicture;
        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', profilePicture: user.profilePicture, username: user.username });
    } catch (error) {
        console.error('Error updating profile:', error);
        if (error.code === 11000 && error.keyPattern.username) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.fetchUserProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        console.error('Fetch Profile Error:', error);
        res.status(500).json({ message: 'Failed to load user information' });
    }
};

exports.auth0Signup = async (req, res) => {
    const { firstname, lastname, username, email, profilePicture } = req.body;
    console.log('Received User Data:', req.body);
    try {
        if (!email) return res.status(400).json({ message: 'Email is required' });
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({
                firstname: firstname || 'Unknown',
                lastname: lastname || '',
                username: username || email.split('@')[0],
                email,
                profilePicture: profilePicture || '',
                password: 'googleAuth'
            });
            await user.save();
            console.log('New User Created:', user);
        } else {
            console.log('Existing User Found:', user);
        }
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ message: 'User created with Google Auth0', token, userId: user._id });
    } catch (err) {
        console.error('Auth0 Signup Error:', err);
        if (err.code === 11000 && err.keyPattern.username) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.auth0Login = async (req, res) => {
    const { email, name, picture } = req.body;
    try {
        if (!email) return res.status(400).json({ message: 'Email is required' });
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({
                firstname: name?.split(' ')[0] || 'Unknown',
                lastname: name?.split(' ')[1] || '',
                email,
                profilePicture: picture || '',
                username: email.split('@')[0],
                password: 'auth0_password'
            });
            await user.save();
        }
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ message: 'Login Successful via Google', token, userId: user._id, username: user.username });
    } catch (error) {
        console.error('Auth0 Login Error:', error);
        if (error.code === 11000 && error.keyPattern.username) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateProfileVisibility = async (req, res) => {
    try {
        const { userId } = req.params;
        const { profileVisibility } = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, { profileVisibility }, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating profile visibility:', error);
        res.status(500).json({ message: 'Failed to update profile visibility' });
    }
};

exports.logout = async (req, res) => {
    const { userId } = req.body;
    try {
        await User.findByIdAndUpdate(userId, { status: 'offline' });
        console.log(`Logout: ${userId} set to offline`);
        if (global.io) {
            global.io.emit('status-update', { friendId: userId, status: 'offline' });
            console.log(`Logout: Emitted status-update for ${userId}`);
        }
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({ message: 'Failed to logout' });
    }
};