require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const setupSocket = require('./socket');

const app = express();
const server = http.createServer(app);
const io = setupSocket(server); // Initialize socket
global.io = io; // Make io globally available

console.log('EMAIL_USER:', process.env.EMAIL_USER); // Debug
console.log('EMAIL_PASS:', process.env.EMAIL_PASS); //

const authRoutes = require('./routes/authRoutes');
const friendsRoutes = require('./routes/friendsRoutes');
const gameRoutes = require('./routes/gamesRoutes');
const paymentRoutes = require("./routes/paymentRoutes");

const port = process.env.PORT || 3000;

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "https://arcadearray.netlify.app",
        "https://arcade-array.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/games', gameRoutes);
app.use('/payment', paymentRoutes);
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
    res.send("Welcome to Arcade Array API!");
});

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB');
}).catch(err => {
    console.error('❌ MongoDB connection error:', err);
});

server.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});