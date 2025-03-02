const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Signup controller
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

        const newUser = new User({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();  // Save user before generating token
        console.log('Received signup request:', req.body);  // Add this line to see the incoming data

        // Generate JWT Token after signup
        const token = jwt.sign(
            { userId: newUser._id, username: newUser.username },  // Use `newUser`, not `user`
            process.env.JWT_SECRET,  // Ensure you have this set in your `.env`
            { expiresIn: '7d' }
        );


        return res.status(201).json({ message: 'User registered successfully', token, userId: newUser._id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Login controller
exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,  // Use environment variable
            { expiresIn: '7d' }
        );

        res.status(200).json({ message: 'Login successful', token, userId: user._id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



exports.updateProfile = async (req, res) => {
    const { userId } = req.params;
    const { bio } = req.body;
    const profilePicture = req.file ? req.file.filename : null; // File Path

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { 
                bio,
                ...(profilePicture && { profilePicture })
            },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update profile', error });
    }
};
