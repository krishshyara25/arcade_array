import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://arcade-array.onrender.com', {
    withCredentials: true,
});

const useSocket = (userId, onStatusUpdate) => {
    useEffect(() => {
        if (userId) {
            console.log(`🔌 Connecting socket for userId: ${userId}`);
            socket.emit('set-status', { userId, status: 'online' });
        }

        socket.on('connect', () => {
            console.log('✅ Connected to Socket.IO server');
        });

        socket.on('connect_error', (err) => {
            console.error('❌ Socket.IO connection error:', err);
        });

        socket.on('status-update', (data) => {
            console.log(`💡 Status update received:`, data);
            onStatusUpdate(data.friendId, data.status);
        });

        return () => {
            if (userId) {
                console.log(`❌ Disconnecting socket for userId: ${userId}`);
                socket.emit('set-status', { userId, status: 'offline' });
                socket.disconnect();
            }
        };
    }, [userId]);

    return socket;
};

export default useSocket;
