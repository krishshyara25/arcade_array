import { Routes, Route } from "react-router-dom";
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import Login from "./components/login.jsx";
import Signup from "./components/Signup.jsx";
import Home from "./components/Home.jsx";
import Home1 from "./components/Home1.jsx";
import Friends from "./components/Friends.jsx";
import Notifications from "./components/Notification.jsx";
import Catagory from "./components/Catagory.jsx";
import Catagory1 from "./components/Catagory1.jsx";
import GamePage from "./components/Gamepage.jsx";
import WishlistPage from "./components/Wishlist.jsx";
import LandingPage from "./components/landing.jsx";
import Policies from "./pages/Tearms.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Settings from "./components/Setting.jsx";
import StripeWrapper from "./components/Payment.jsx";
import ForgotPassword from './components/ForgotPassword.jsx'; // New
import ResetPassword from './components/ResetPassword.jsx'; // New

// Initialize socket once
const socket = io('http://localhost:3000', {
    path: '/socket.io', // Explicitly set path
    withCredentials: true,
    reconnection: true,
    transports: ['websocket', 'polling'], // Prefer WebSocket, fallback to polling
});

function App() {
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        socket.on('connect', () => {
            console.log('✅ Socket connected');
            if (userId) {
                socket.emit('set-status', { userId, status: 'online' });
                console.log(`App: Emitted online for ${userId}`);
            }
        });

        socket.on('connect_error', (err) => {
            console.error('❌ Socket connection error:', err);
        });

        socket.on('status-update', ({ friendId, status }) => {
            console.log(`App: Status update - ${friendId} is ${status}`);
        });

        return () => {
            if (userId) {
                socket.emit('set-status', { userId, status: 'offline' });
                console.log(`App: Emitted offline for ${userId}`);
            }
        };
    }, [userId]);

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/friends" element={<Friends socket={socket} />} />
                <Route path="/home1" element={<Home1 socket={socket} />} /> {/* Pass socket */}
                <Route path="/login" element={<Login socket={socket} />} /> {/* Pass socket */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/catagory" element={<Catagory />} />
                <Route path="/catagory1" element={<Catagory1 />} />
                <Route path="/game/:id" element={<GamePage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/setting" element={<Settings />} />
                <Route path="/policies" element={<Policies />} />
                <Route path="/payment/:amount" element={<StripeWrapper />} />
                <Route path="*" element={<h2>Page Not Found</h2>} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Routes>
        </>
    );
}

export default App;