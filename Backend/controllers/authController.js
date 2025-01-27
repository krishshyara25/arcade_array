const bcrypt = require('bcryptjs');
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

        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
