import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Wishlist.css"; // Create a new CSS file for styling
import logo from '../assets/arcade_alley_logo.png';
import img2 from "../assets/wp9549839.png";
import { toast } from "react-toastify";


const WishlistPage = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);



    useEffect(() => {
        if (!userId) {
            alert("Please log in to view your wishlist.");
            navigate("/login");
            return;
        }

        const fetchWishlist = async () => {
            try {
                const response = await fetch(`https://arcade-array.onrender.com/api/games/wishlist/${userId}`);
                if (!response.ok) throw new Error("Failed to fetch wishlist");

                const data = await response.json();
                setWishlist(data);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
                setError("Error fetching wishlist.");
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [userId, navigate]);

    useEffect(() => {
        if (!userId) return;
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`https://arcade-array.onrender.com/api/games/user/details/${userId}`);
                if (!response.ok) throw new Error("Failed to fetch user details");

                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user details:", error.message);
            }
        };
        fetchUserDetails();
    }, [userId]);

    const handleRestrictedAccess = () => {
        if (!user) {
            setShowPopup(true);
        } else {
            navigate("/restricted-page"); // Replace with actual paths if needed
        }
    };

    const removeFromWishlist = async (gameId) => {
        try {
            const userId = localStorage.getItem("userId"); // Get userId from localStorage
            if (!userId) {
                console.error("User ID not found.");
                return;
            }
    
            const response = await fetch(`https://arcade-array.onrender.com/api/games/remove/${userId}/${gameId}`, {
                method: "DELETE",
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setWishlist((prevWishlist) => prevWishlist.filter((game) => game._id !== gameId));
                console.log("Game removed from wishlist:", data.message);
            } else {
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Failed to remove game from wishlist", error);
        }
    };
    

    if (loading) return <div>Loading wishlist...</div>;
    if (error) return <div>{error}</div>;
    if (wishlist.length === 0) return <div>Your wishlist is empty.</div>;

    return (
        <div className="wishlist-page">
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
            <h1>Your Wishlist</h1>
            <div className="wishlist-container">
                {wishlist.map((game) => (
                    <div key={game._id} className="wishlist-item">
                        <img src={game.poster} alt={game.name} className="wishlist-img" />
                        <h2>{game.name}</h2>
                        <p>Price: {game.price}</p>
                        <button onClick={() => removeFromWishlist(game._id)}>Remove from wishlist</button>

                    </div>
                ))}
                
            </div>
            <footer className="footer">
        <div className="footerContainer">
          <div className="socialIcons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="socialIconLink">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="socialIconLink">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="socialIconLink">
              <i className="fab fa-youtube"></i>
            </a>
          </div>

          <div className="section">
            <h4 className="sectionHeader">Resources</h4>
            <ul className="list">
              <li><a href="#" className="link">Support A-Creator</a></li>
              <li><a href="#" className="link">Distribute on Epic Games</a></li>
              <li><a href="#" className="link">Careers</a></li>
              <li><a href="#" className="link">Company</a></li>
            </ul>
          </div>

          <div className="section">
            <h4 className="sectionHeader">Fan Art Policy</h4>
            <ul className="list">
              <li><a href="#" className="link">UX Research</a></li>
              <li><a href="#" className="link">Store EULA</a></li>
            </ul>
          </div>

          <div className="section">
            <h4 className="sectionHeader">Online Services</h4>
            <ul className="list">
              <li><a href="#" className="link">Community Rules</a></li>
              <li><a href="#" className="link">Epic Newsroom</a></li>
            </ul>
          </div>

          <div className="section">
            <p className="sectionHeader">Made By Archade Array</p>
            <ul className="list">
              <li className="link">Battle Breakers</li>
              <li className="link">Robo Recall</li>
              <li className="link">Fortnite</li>
              <li className="link">Shadow Complex</li>
              <li className="link">Infinity Blade</li>
              <li className="link">Unreal Tournament</li>
            </ul>
          </div>

          <div className="copyright">
            <p>© 2024 Archade Array, Inc. All rights reserved. Epic, Archade Array, the Archade Array logo, Fortnite, the Fortnite logo, Unreal, Unreal Engine, the Unreal Tournament logo, Tournament, and the Unreal Tournament logo are trademarks of their respective owners or affiliates.</p>
          </div>

          <div className="legalLinks">
            <a href="#" className="link">Terms of Service</a>
            <a href="#" className="link">Privacy Policy/Store</a>
            <a href="#" className="link">Refund Policy</a>
          </div>
        </div>
      </footer>
            
        </div>
    );
};

export default WishlistPage;
