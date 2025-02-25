require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require("http");

const authRoutes = require('./routes/authRoutes');
const friendsRoutes = require('./routes/friendsRoutes');
const gameRoutes = require('./routes/gamesRoutes');

const app = express();
const server = http.createServer(app); // ✅ Use HTTP server
const port = process.env.PORT || 3000;

// ✅ CORS Configuration
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "https://arcadearray.netlify.app", 
        "https://arcade-array.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle CORS preflight

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB');
}).catch(err => {
    console.error('❌ MongoDB connection error:', err);
});

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/games', gameRoutes);

// ✅ Default Route
app.get("/", (req, res) => {
    res.send("Welcome to Arcade Array API!");
});

// ✅ Initialize Socket.IO with CORS
const io = require("socket.io")(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:5174",
            "https://arcadearray.netlify.app",
            "https://arcade-array.onrender.com"
        ],
        methods: ["GET", "POST"],
        credentials: true
    }
});

const onlineUsers = new Map(); // Store online users

io.on("connection", (socket) => {
    console.log(`✅ New connection: ${socket.id}`);

    // ✅ Handle user coming online
    socket.on("userOnline", (userId) => {
        if (onlineUsers.has(userId)) {
            console.log(`⚠️ User ${userId} is already online (Duplicate Connection)`);
            return;
        }

        onlineUsers.set(userId, socket.id);
        console.log(`📌 User ${userId} is now online.`);
        io.emit("updateOnlineUsers", Array.from(onlineUsers.keys())); // Broadcast update
    });

    // ✅ Handle disconnection
    socket.on("disconnect", () => {
        console.log(`❌ Disconnected: ${socket.id}`);

        // Find the user by socket ID and remove them
        const userId = [...onlineUsers.entries()].find(([_, id]) => id === socket.id)?.[0];
        if (userId) {
            onlineUsers.delete(userId);
            console.log(`📌 User ${userId} went offline.`);
        }

        io.emit("updateOnlineUsers", Array.from(onlineUsers.keys())); // Broadcast update
    });

    // ✅ Error Handling (Detect connection issues)
    socket.on("connect_error", (err) => {
        console.error(`❌ Connection error: ${err.message}`);
    });
});

// ✅ Start Server (Use `server.listen` to enable WebSockets)
server.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
