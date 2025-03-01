import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../assets/arcade_alley_logo.png';
import defaultProfilePic from '../assets/wp9549839.png';
import '../styles/Setting.css';
import img2 from "../assets/wp9549839.png";
import Loader from './Loader';
const Settings = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [activeTab, setActiveTab] = useState('profile');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updatingProfile, setUpdatingProfile] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);


    // Form states
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [wishlist, setWishlist] = useState([]);
    const [wishlistLoading, setWishlistLoading] = useState(true);
    const [wishlistCount, setWishlistCount] = useState(0);


        // Fetch user details on component mount
        useEffect(() => {
            if (!userId) {
                toast.error("Please log in to access settings.");
                navigate('/home');
                return;
            }
    
            const fetchUserDetails = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`https://arcade-array.onrender.com/api/games/user/details/${userId}`);
                    const userData = response.data;
                    setUser(userData);
                    setUsername(userData.username || '');
                    setEmail(userData.email || '');
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


 
  useEffect(() => {
    if (user?.wishlist) {
      setWishlistCount(user.wishlist.length);
    }
  }, [user?.wishlist]);

    // Handle profile picture change
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
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

            // Create form data for profile update (including possible file upload)
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('username', username);

            if (profilePicture) {
                formData.append('profilePicture', profilePicture);
            }

            // Send update request to server
            const response = await axios.post(
                'https://arcade-array.onrender.com/api/user/update-profile',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                toast.success("Profile updated successfully!");
                // Update local user state with new data
                setUser(prev => ({ ...prev, username }));
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


    return (
        <div className="settings-container">
            {/* Navigation Bar */}
            <nav className="nav-bar">
                <div className="nav-left">
                    <div className="logo1">
                        <img src={logo} alt="Arcade Alley" />
                    </div>



                    <div className="nav-links">
                        <a href="#" onClick={() => {
                            const storedUserId = localStorage.getItem("userId");
                            navigate(storedUserId ? "/home1" : "/home");
                        }}>Home</a>
                        <a href="#" onClick={() => {
                            const storedUserId = localStorage.getItem("userId");
                            navigate(storedUserId ? "/catagory1" : "/catagory");
                        }}>Category</a>
                        <a href="#" >Community</a>
                        <a href="#" onClick={() => navigate("/friends")}>Friends</a>
                        <a href="#" onClick={() => navigate("/wishlist")}>Wishlist</a>
                        <a href="#" >Download</a>
                    </div>
                </div>

                <div className="nav-right">
                    <div className="user-info">


                        {/* If user is logged in, show profile and logout button */}
                        {user ? (
                            <div className="user-details">
                                <img
                                    src={img2}
                                    style={{ borderRadius: "50%", width: "3vw", cursor: "pointer" }}
                                    alt="Profile"
                                    onClick={() => setDropdownVisible(!dropdownVisible)}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div>
                                        <h1 className="username">Welcome, {user?.username || "Guest"}</h1>
                                        <p className="useremail">Email: {user?.email || "No email found"}</p>
                                    </div>
                                </div>

                                {/* Dropdown Menu */}
                                {dropdownVisible && (
                                    <div className="dropdownMenu">
                                        <button
                                            className="logoutButton"
                                            onClick={() => {
                                                localStorage.removeItem("userId"); // Clear user ID from local storage
                                                setUser(null); // Reset user state
                                                navigate("/login"); // Redirect to login page
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* If user is not logged in, show Login and Signup buttons */
                            <div className="auth-buttons">
                                <button className="login-button" onClick={() => navigate("/login")}>
                                    Login
                                </button>
                                <button className="signup-button" onClick={() => navigate("/signup")}>
                                    Signup
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <button className="backbutton1" onClick={() => navigate(-1)}>
                ◀ Back
            </button>

            {/* Main Content */}
            <main className="settings-main">
                <div className="settings-header">
                    <h1>Settings</h1>
                </div>

                {/* Settings Tabs */}
                <div className="settings-tabs">
                    <button
                        className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'account' ? 'active' : ''}`}
                        onClick={() => setActiveTab('account')}
                    >
                        Account
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'privacy' ? 'active' : ''}`}
                        onClick={() => setActiveTab('privacy')}
                    >
                        Privacy
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        Notifications
                    </button>
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                    {activeTab === 'profile' && (
                        <div className="profile-section">
                            <h2>User Profile</h2>

                            <div className="profile-form">
                                <div className="profile-picture-section">
                                    <div className="profile-picture">
                                        <img src={previewUrl || defaultProfilePic} alt="Profile" />
                                    </div>
                                    <div className="profile-picture-actions">
                                        <input
                                            type="file"
                                            id="profile-picture-upload"
                                            accept="image/*"
                                            onChange={handleProfilePictureChange}
                                            style={{ display: 'none' }}
                                        />
                                        <label htmlFor="profile-picture-upload" className="upload-button">
                                            Change Picture
                                        </label>
                                        {profilePicture && (
                                            <button
                                                className="remove-button"
                                                onClick={() => {
                                                    setProfilePicture(null);
                                                    setPreviewUrl(user.profilePicture || defaultProfilePic);
                                                }}
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <form onSubmit={handleProfileUpdate}>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Enter your username"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            disabled
                                            placeholder="Your email"
                                        />
                                        <small>Email cannot be changed</small>
                                    </div>

                                    <div className="profile-actions">
                                        <button
                                            type="submit"
                                            className="save-button"
                                            disabled={updatingProfile}
                                        >
                                            {updatingProfile ? 'Updating...' : 'Save Changes'}
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
                                        <p>{user.friends?.length || 0}</p>
                                    </div>
                                    <div className="stat-card">
                                        <h4>Account Created</h4>
                                        <p>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'account' && (
                        <div className="account-section">
                            <h2>Account Settings</h2>
                            <div className="settings-card">
                                <h3>Password</h3>
                                <div className="settings-action">
                                    <button className="action-button">Change Password</button>
                                </div>
                            </div>

                            <div className="settings-card">
                                <h3>Two-Factor Authentication</h3>
                                <div className="settings-action">
                                    <button className="action-button">Enable 2FA</button>
                                </div>
                            </div>

                            <div className="settings-card">
                                <h3>Linked Accounts</h3>
                                <div className="linked-accounts">
                                    <div className="account-item">
                                        <span>Google</span>
                                        <button className="link-button">Link</button>
                                    </div>
                                    <div className="account-item">
                                        <span>Facebook</span>
                                        <button className="link-button">Link</button>
                                    </div>
                                    <div className="account-item">
                                        <span>Discord</span>
                                        <button className="link-button">Link</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'privacy' && (
                        <div className="privacy-section">
                            <h2>Privacy Settings</h2>
                            <div className="settings-card">
                                <h3>Profile Visibility</h3>
                                <div className="setting-option">
                                    <label className="toggle">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider"></span>
                                    </label>
                                    <div>
                                        <p>Public Profile</p>
                                        <small>Allow other users to view your profile and game activity</small>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-card">
                                <h3>Game Activity</h3>
                                <div className="setting-option">
                                    <label className="toggle">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider"></span>
                                    </label>
                                    <div>
                                        <p>Share Game Activity</p>
                                        <small>Show friends what games you're playing</small>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-card">
                                <h3>Friend Requests</h3>
                                <div className="setting-option">
                                    <select className="privacy-select">
                                        <option value="everyone">Everyone</option>
                                        <option value="friends-of-friends">Friends of Friends</option>
                                        <option value="none">No One</option>
                                    </select>
                                    <small>Who can send you friend requests</small>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="notifications-section">
                            <h2>Notification Settings</h2>
                            <div className="settings-card">
                                <h3>Email Notifications</h3>
                                <div className="setting-option">
                                    <label className="toggle">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider"></span>
                                    </label>
                                    <div>
                                        <p>Game Updates</p>
                                        <small>Receive emails about updates to games you own</small>
                                    </div>
                                </div>

                                <div className="setting-option">
                                    <label className="toggle">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider"></span>
                                    </label>
                                    <div>
                                        <p>Friend Requests</p>
                                        <small>Receive emails when someone sends you a friend request</small>
                                    </div>
                                </div>

                                <div className="setting-option">
                                    <label className="toggle">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider"></span>
                                    </label>
                                    <div>
                                        <p>Promotional Emails</p>
                                        <small>Receive emails about sales and new releases</small>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-card">
                                <h3>Push Notifications</h3>
                                <div className="setting-option">
                                    <label className="toggle">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider"></span>
                                    </label>
                                    <div>
                                        <p>Friend Activity</p>
                                        <small>Get notified when friends come online or start playing</small>
                                    </div>
                                </div>

                                <div className="setting-option">
                                    <label className="toggle">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider"></span>
                                    </label>
                                    <div>
                                        <p>Game Invites</p>
                                        <small>Get notified when friends invite you to play</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Settings;