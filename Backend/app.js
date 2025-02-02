require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const friendsRoutes = require('./routes/friendsRoutes');
const gameRoutes = require('./routes/gamesRoutes');
const cors = require('cors'); 


const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for your frontend
app.use(cors({
    origin: ["http://localhost:5173", "https://arcade-array.onrender.com"], // Allow frontend URLs
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Use built-in middleware for parsing JSON and URL encoded data
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas connection string from the environment variable
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB Atlas using the environment variable
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Use routes for different API functionalities
app.use('/api/auth', authRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/games', gameRoutes);  // Games routes
const cors = require('cors');
app.use(cors());

// Start the server on the specified port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
