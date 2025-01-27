const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const friendsRoutes = require('./routes/friendsRoutes');

const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ArcadeArray', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/friends', friendsRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
