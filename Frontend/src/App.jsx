import { Routes, Route } from "react-router-dom";
import React from "react";
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
import Terms from "./pages/Tearms.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Settings from "./components/Setting.jsx";

// Optional: Create a simple NotFound component
const NotFound = () => <h2>Page Not Found</h2>;

function App() {
    return (
        <>
            {/* Toast notifications */}
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Main app routes */}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/home1" element={<Home1 />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/catagory" element={<Catagory />} />
                <Route path="/catagory1" element={<Catagory1 />} />
                <Route path="/game/:id" element={<GamePage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/setting" element={<Settings />} />
                <Route path="/terms-and-conditions" element={<Terms />} />
                <Route path="*" element={<NotFound />} /> {/* Fix 404 errors */}
            </Routes>
        </>
    );
}

export default App; 