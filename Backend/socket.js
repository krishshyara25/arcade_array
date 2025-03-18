const socketIo = require('socket.io');
const User = require('./models/userModel');

const setupSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: [
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://localhost:5174",
                "http://localhost:5175",
                "https://arcadearray.netlify.app",
                "https://arcade-array.onrender.com"
            ],
            methods: ["GET", "POST"],
            credentials: true
        },
        path: '/socket.io'
    });

    const onlineUsers = new Map();

    io.on('connection', (socket) => {
        console.log(`⚡ User connected: ${socket.id}`);

        socket.on('set-status', async ({ userId, status }) => {
            if (!userId) {
                console.log('⚠️ No userId provided in set-status');
                return;
            }
            console.log(`📡 Received set-status: ${userId} -> ${status}`);
            onlineUsers.set(userId, socket.id);
            io.emit('status-update', { friendId: userId, status }); // Broadcast to all clients

            try {
                const updatedUser = await User.findByIdAndUpdate(userId, { status }, { new: true });
                console.log(`✅ DB Updated: ${userId} to ${updatedUser.status}`);
            } catch (error) {
                console.error(`❌ DB Error for ${userId}:`, error);
            }
        });

        socket.on('disconnect', async () => {
            console.log(`❌ User disconnected: ${socket.id}`);
            for (let [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);
                    io.emit('status-update', { friendId: userId, status: 'offline' });
                    try {
                        const updatedUser = await User.findByIdAndUpdate(userId, { status: 'offline' }, { new: true });
                        console.log(`✅ DB Updated: ${userId} to offline`);
                    } catch (error) {
                        console.error(`❌ DB Error setting ${userId} offline:`, error);
                    }
                    break;
                }
            }
        });
    });

    return io;
};

module.exports = setupSocket;