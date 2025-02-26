import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WelcomeVideo from "./components/WelcomeVideo.jsx";

// Optional: Create a simple NotFound component
const NotFound = () => <h2>Page Not Found</h2>;

function App() {
    const [showMainContent, setShowMainContent] = useState(false);
    const videoUrl = "https://res.cloudinary.com/drno4r3vd/video/upload/v1740548987/logoloader_dralxf.mp4"; // Replace with your actual video URL

    return (
        <>
            {!showMainContent && <WelcomeVideo videoUrl={videoUrl} onFinish={() => setShowMainContent(true)} />}
            {showMainContent && <Home />}
            <ToastContainer position="top-right" autoClose={3000} />


            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/home1" element={<Home1 />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/catagory" element={<Catagory />} />
                <Route path="/catagory1" element={<Catagory1 />} />
                <Route path="/game/:id" element={<GamePage />} />
                <Route path="/wishlist" element={<WishlistPage />} />


                <Route path="*" element={<NotFound />} /> {/* ✅ Fix 404 errors */}

            </Routes>
        </>
    );
}

export default App;
