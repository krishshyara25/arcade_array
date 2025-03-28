import React from 'react';
import '../styles/Catagory.css';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './Searchbar';
import axios from "axios";
import logo from '../assets/arcade_alley_logo.png';
import img2 from '../assets/wp9549839.png';
import img5 from '../assets/image5.png';
import img6 from '../assets/image6.png';
import img7 from '../assets/image7.png';
import img8 from '../assets/image8.png';
import img9 from '../assets/image9.png';
import img10 from '../assets/image10.png';
import img11 from '../assets/image11.png';
import img12 from '../assets/image12.png';
import img13 from '../assets/image13.png';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import defaultProfilePic from "../assets/wp9549839.png";

const GameStore = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem("userId");
    const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown menu
    const [friendRequests, setFriendRequests] = useState(0); // State to store the count of friend requests
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);
    const [savingSpotlight, setSavingSpotlight] = useState([]);
    const [discoverNew, setDiscoverNew] = useState([]);
    const [mostPopular, setMostPopular] = useState([]);
    const [visibleDiscover, setVisibleDiscover] = useState(6);
    const [visibleSpotlight, setVisibleSpotlight] = useState(6);
    const [visiblePopular, setVisiblePopular] = useState(6);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [previewUrl, setPreviewUrl] = useState(defaultProfilePic);

    useEffect(() => {
        if (!userId) return;
        const fetchUserDetails = async () => {
          try {
            setLoading(true);
            const response = await axios.get(`https://arcade-array.onrender.com/api/games/user/details/${userId}`);
            if (response.status === 200) {
              const userData = response.data;
              setUser(userData);
              setUsername(userData.username || "");
              setEmail(userData.email || "");
              setPreviewUrl(userData.profilePicture || defaultProfilePic);
            } else {
              toast.error("Failed to load user information");
            }
          } catch (error) {
            console.error("Error fetching user details:", error);
            toast.error("Error loading user data");
          } finally {
            setLoading(false);
          }
        };
        fetchUserDetails();
      }, [userId]);


    const popularGames = [
        {
            id: 1,
            category: "Action Games",
            games: [
                { id: 1, title: "Game 1", price: "$29.99", imageUrl: img5 },
                { id: 2, title: "Game 2", price: "$39.99", imageUrl: img6 },
                { id: 3, title: "Game 3", price: "$19.99", imageUrl: img7 }
            ]
        },
        {
            id: 2,
            category: "Action-Adventure Games",
            games: [
                { id: 4, title: "Game 4", price: "$49.99", imageUrl: img8 },
                { id: 5, title: "Game 5", price: "$34.99", imageUrl: img9 },
                { id: 6, title: "Game 6", price: "$34.99", imageUrl: img10 },
            ]
        },
        {
            id: 3,
            category: "Adventure Games",
            games: [
                { id: 7, title: "Game 7", price: "$49.99", imageUrl: img11 },
                { id: 8, title: "Game 8", price: "$34.99", imageUrl: img12 },
                { id: 9, title: "Game 9", price: "$34.99", imageUrl: img13 },
            ]
        }
    ];


    useEffect(() => {
        if (!userId) return; // Prevent fetching if no user is logged in

        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`https://arcade-array.onrender.com/api/games/user/details/${userId}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);
                setUser(data); // Set user details in state
            } catch (error) {
                console.error("Error fetching user details:", error.message);
            }
        };

        const fetchFriendRequests = async () => {
            try {
                const response = await fetch(`https://arcade-array.onrender.com/api/friends/requests/${userId}`); // Endpoint to fetch friend requests
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);
                setFriendRequests(data.length); // Set the number of friend requests
            } catch (error) {
                console.error("Error fetching friend requests:", error.message);
            }
        };

        fetchUserDetails();
        fetchFriendRequests(); // Fetch friend requests when the component mounts
    }, [userId]);

    const handleLogout = () => {
        localStorage.removeItem('userId'); // Remove user ID from localStorage
        navigate('/home'); // Navigate to login page after logout
    };

    useEffect(() => {
        axios.get("https://arcade-array.onrender.com/api/games")
            .then(response => {
                const fetchedGames = response.data;
                setGames(fetchedGames);
                setLoading(false);

                // Filter games with discounts
                const discountedGames = fetchedGames.filter(game => game.price && game.discount);
                setSavingSpotlight(discountedGames.length > 0 ? discountedGames : fetchedGames);

                // Sort games by release date (newest first) for "Discover Something New"
                const sortedByRelease = [...fetchedGames].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
                setDiscoverNew(sortedByRelease.slice(0, 6));

                // Sort games by popularity (assuming `popularityScore` exists)
                const sortedByPopularity = [...fetchedGames].sort((a, b) => b.popularityScore - a.popularityScore);
                setMostPopular(sortedByPopularity.slice(0, 6));
            })
            .catch(error => {
                console.error("Error fetching games:", error);
                setLoading(false);
            });
    }, []);


    const loadMoreDiscover = () => {
        setVisibleDiscover(prev => prev + 6);
    };

    const loadMoreSpotlight = () => {
        setVisibleSpotlight(prev => prev + 6);
    };

    const loadMorePopular = () => setVisiblePopular(prev => prev + 6);

    return (
        <>
            <div className="game-store1">
                <div className="upper1">
                    <nav className="sidebar">
                        <div className="logo">
                            <img src={logo} alt="Arcade Alley" />
                        </div>
                        <a className="sidebarItem" onClick={() => navigate("/home1")}>🏠 Home</a>
                        <a className="sidebarItem" onClick={() => navigate("/catagory1")}>📁 Category</a>
                        <a className="sidebarItem" >👥 Community</a>
                        <a className="sidebarItem" onClick={() => navigate("/friends")}>👫 Friends</a>
                        <a className="sidebarItem" onClick={() => navigate("/wishlist")}>❤️ Wishlist</a>
                        <a className="sidebarItem">⬇️ Download</a>
                        <a className="sidebarItem" onClick={() => navigate("/setting")}>⚙️ Setting</a>
                    </nav>

                    {/* Main Content */}
                    <main className="main-content">
                        <div className='main-content'>
                            {/* Header */}
                            <header className="header">
                                <SearchBar />
                                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                    <span onClick={() => navigate("/notifications")} className='notification_icon'>🔔{friendRequests > 0 && (
                                        <span className="notificationCount">{friendRequests}</span> // Display notification count if friendRequests > 0
                                    )}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
                                        <img
                                            src={previewUrl}
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
                                                <button onClick={handleLogout} className="logoutButton">Logout</button>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </header>

                            {/* Popular Games Section */}
                            <section className="popular-section">
                                <div className="section-header">
                                    <h2 className="heading-secondary">Popular Games</h2>
                                    <div className="navigation-arrows">
                                        <button>&lt;</button>
                                        <button>&gt;</button>
                                    </div>
                                </div>

                                <div className="categories-grid">
                                    {popularGames.map(category => (
                                        <div key={category.id} className="category-card">
                                            <div className="category-images">
                                                {category.games.map(game => (
                                                    <img key={game.id} src={game.imageUrl} alt={game.title} className="category-image" />
                                                ))}
                                            </div>
                                            <div className="category-name">{category.category}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>


                    </main>


                </div>
                <section className="gameCarousel">
                    {/* Game Carousel */}
                    {/* Discover Something New Section */}
                    <div className="carouselHeader">
                        <h2>New Released</h2>
                        <div className="carouselControls">
                            <button className="controlButton">←</button>
                            <button className="controlButton" onClick={loadMoreDiscover}>→</button>
                        </div>
                    </div>
                    {loading ? (
                        <p>Loading games...</p>
                    ) : (
                        <div className="gameGrid">
                            {discoverNew.slice(0, visibleDiscover).map(game => (
                                <div key={game._id} className="game-card" onClick={() => navigate(`/game/${game._id}`)}>
                                    <div className="game-image">
                                        <img src={game.imageUrl} alt={game.name} />
                                        {game.discount && <span className="discount">-{game.discount}</span>}
                                    </div>
                                    <h3 className="subheading">{game.name}</h3>
                                    <p className="price">{game.price || "loading.."}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="gameCarousel">
                    <div className="carouselHeader">
                        <h2>Saving Spotlight</h2>
                        <div className="carouselControls">
                            <button className="controlButton">←</button>
                            <button className="controlButton">→</button>
                        </div>
                    </div>
                    {loading ? (
                        <p>Loading games...</p>
                    ) : (
                        <div className="gameGrid">
                            {savingSpotlight.slice(0, visibleSpotlight).map(game => (
                                <div key={game._id} className="game-card" onClick={() => navigate(`/game/${game._id}`)}>
                                    <div className="game-image">
                                        <img src={game.imageUrl} alt={game.name} />
                                        {game.discount && <span className="discount">-{game.discount}</span>}
                                    </div>
                                    <h3 className="subheading">{game.name}</h3>
                                    <p className="price">{game.price || "Free"}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="carouselHeader">
                        <h2>Most Popular</h2>
                        <div className="carouselControls">
                            <button className="controlButton">←</button>
                            <button className="controlButton" onClick={loadMorePopular}>→</button>
                        </div>
                    </div>

                    {loading ? (
                        <p>Loading games...</p>
                    ) : (
                        <div className="gameGrid">
                            {mostPopular.slice(0, visiblePopular).map(game => (
                                <div key={game._id} className="game-card" onClick={() => navigate(`/game/${game._id}`)}>
                                    <div className="game-image">
                                        <img src={game.imageUrl} alt={game.name} />
                                        {game.discount && <span className="discount">-{game.discount}</span>}
                                    </div>
                                    <h3 className="subheading">{game.name}</h3>
                                    <p className="price">{game.price || "Free"}</p>
                                </div>
                            ))}
                        </div>
                    )}

                </section>


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


        </>
    );
};

export default GameStore;