import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import defaultProfilePic from "../assets/wp9549839.png"; // Default profile picture
import Loader from "./Loader"; // Loader component for loading states
import "../styles/Setting.css"; // CSS for styling
import logo from '../assets/arcade_alley_logo.png';

const Settings = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [activeTab, setActiveTab] = useState("profile");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updatingProfile, setUpdatingProfile] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    // Form states
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    // Fetch user details on component mount
    useEffect(() => {
        if (!userId) {
            toast.error("Please log in to access settings.");
            navigate("/login");
            return;
        }

        const fetchUserDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://arcade-array.onrender.com/api/games/user/details/${userId}`
                );
                const userData = response.data;
                setUser(userData);
                setUsername(userData.username || "");
                setEmail(userData.email || "");
                setPreviewUrl(userData.profilePicture || defaultProfilePic);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user details:", error);
                toast.error("Failed to load user information");
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId, navigate]);

    // Handle profile picture change
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result); // Set the preview URL
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle profile update
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        if (!username.trim()) {
            toast.error("Username cannot be empty");
            return;
        }

        try {
            setUpdatingProfile(true);

            // Prepare the payload
            const payload = {
                username: username,
                profilePicture: previewUrl, // Send the profile picture URL if available
            };

            const response = await axios.put(
                `https://arcade-array.onrender.com/api/auth/update-profile/${userId}`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                toast.success("Profile updated successfully!");
                const updatedUser = { ...user, username: response.data.username, profilePicture: response.data.profilePicture };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser)); // Update local storage
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setUpdatingProfile(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    const handleLogout = () => {
        localStorage.removeItem('userId'); // Remove user ID from localStorage
        navigate('/home'); // Navigate to login page after logout
    };

    return (
        <div className="settings-container">
            <nav className="nav-bar">
                <div className="nav-left">
                    <div className="logo1">
                        <img src={logo} alt="Arcade Alley" />
                    </div>
                    <div className="nav-links">
                        <a href="#" onClick={() => navigate("/home1")}>Home</a>
                        <a href="#" onClick={() => navigate("/catagory1")}>Category</a>
                        <a href="#">Community</a>
                        <a href="#" onClick={() => navigate("/friends")}>Friends</a>
                        <a href="#" onClick={() => navigate("/wishlist")}>Wishlist</a>
                        <a href="#">Download</a>
                    </div>
                </div>
                <div className="nav-right">
                    <div className="user-info">
                        {user ? (
                            <div className="user-details">
                                <img
                                    src={user?.profilePicture ? user.profilePicture : defaultProfilePic}
                                    style={{ borderRadius: "50%", width: "3vw", cursor: "pointer" }}
                                    alt="Profile"
                                    onClick={() => setDropdownVisible(!dropdownVisible)}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div>
                                        <h1 className="username">Welcome, {user?.username}</h1>
                                        <p className="useremail">Email: {user?.email || "No email found"}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="auth-buttons">
                                <button className="login-button" onClick={() => navigate("/login")}>Login</button>
                                <button className="signup-button" onClick={() => navigate("/signup")}>Signup</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main className="settings-main">
                <div className="settings-header">
                    <h1>Settings</h1>
                </div>

                <div className="settings-tabs">
                    <button className={`tab-button ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>Profile</button>
                    <button className={`tab-button ${activeTab === "account" ? "active" : ""}`} onClick={() => setActiveTab("account")}>Account</button>
                    <button className={`tab-button ${activeTab === "privacy" ? "active" : ""}`} onClick={() => setActiveTab("privacy")}>Privacy</button>
                </div>

                <div className="tab-content">
                    {activeTab === "profile" && (
                        <div className="profile-section">
                            <h2>User Profile</h2>
                            <div className="profile-form">
                                <div className="profile-picture-section">
                                    <div className="profile-picture">
                                        <img src={previewUrl || defaultProfilePic} alt="Profile" />
                                    </div>
                                    <div className="profile-picture-actions">
                                        <input type="file" id="profile-picture-upload" accept="image/*" onChange={handleProfilePictureChange} style={{ display: "none" }} />
                                        <label htmlFor="profile-picture-upload" className="upload-button">Change Picture</label>
                                        {profilePicture && (
                                            <button className="remove-button" onClick={() => { setProfilePicture(null); setPreviewUrl(user.profilePicture || defaultProfilePic); }}>Remove</button>
                                        )}
                                    </div>
                                </div>
                                <form onSubmit={handleProfileUpdate}>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
                                    </div>
                                    <div className="form-group1">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" value={email} disabled placeholder="Your email" />
                                        <small>Email cannot be changed</small>
                                    </div>
                                    <div className="profile-actions">
                                        <button type="submit" className="save-button" disabled={updatingProfile}>
                                            {updatingProfile ? "Updating..." : "Save Changes"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="account-stats">
                                <h3>Account Statistics</h3>
                                <div className="stats-grid">
                                    <div className="stat-card">
                                        <h4>Games Owned</h4>
                                        <p>{user.gamesOwned?.length || 0}</p>
                                    </div>
                                    <div className="stat-card">
                                        <h4>Wishlist Items</h4>
                                        <p>{user.wishlist?.length || 0}</p>
                                    </div>
                                    <div className="stat-card">
                                        <h4>Friends</h4>
                                        <p>{user.friendCount || user.friends?.length || 0}</p> {/* Display friend count */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === "account" && (
                        <div className="account-section">
                            <h2>Account Settings</h2>
                            <div className="settings-card">
                                <h3>Change Password</h3>
                                <button className="action-button">Update Password</button>
                            </div>
                        </div>
                    )}
                    {activeTab === "privacy" && (
                        <div className="privacy-section">
                            <h2>Privacy Settings</h2>
                            <div className="settings-card">
                                <h3>Profile Visibility</h3>
                                <label className="toggle">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider"></span>
                                </label>
                                <p>Make profile public</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Settings;