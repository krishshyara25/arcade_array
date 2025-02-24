import React from 'react';

import '../styles/Catagory.css';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './Searchbar';


import logo from '../assets/arcade_alley_logo.png';
import img2 from '../assets/wp9549839.png';
import img1 from '../assets/wp1854784-the-witcher-3-wallpapers.png'
import img5 from '../assets/image5.png';
import img6 from '../assets/image6.png';
import img7 from '../assets/image7.png';
import img8 from '../assets/image8.png';
import img9 from '../assets/image9.png';
import img10 from '../assets/image10.png';
import img11 from '../assets/image11.png';
import img12 from '../assets/image12.png';
import img13 from '../assets/image13.png';
import image1 from '../assets/img1.png';
import image2 from '../assets/img2.png';
import image3 from '../assets/img3.png';
import image4 from '../assets/img4.png';
import image5 from '../assets/img5.png';
import image6 from '../assets/img6.png';

import { useState, useEffect } from 'react';

const GameStore = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem("userId");
    const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown menu
    const [friendRequests, setFriendRequests] = useState(0); // State to store the count of friend requests


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

    const newReleases = [
        { id: 1, title: "EA SPORTS FCT™ 24 Standard Edition", price: "₹1,599.60", imageUrl: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118324/tihfukuhizvkwpu0lrsw.png", discount: "60%" },
        { id: 2, title: "Marvel’s Spider-Man 2", price: "₹3,999", imageUrl: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740168767/image20_tq2dmu.png" },
        { id: 3, title: "Kingdom Come: Deliverance II", price: "₹3,360", imageUrl: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740168768/image21_xlpkxr.png" },
        { id: 4, title: "Sid Meier's Civilization® VII", price: "₹3,999", imageUrl: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740168767/image22_ldfqqm.png" },
        { id: 1, title: "EA SPORTS™ Madden NFL 25", price: "₹1,199.70", imageUrl: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740168768/image23_qnma9l.png", discount: "70%" },
        { id: 2, title: "Black Myth: Wukong", price: "₹3,599", imageUrl: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740168768/image24_rnmhlz.png" }
    ];

    const SavingSpotlight = [
        { id: 1, title: 'Dying Light 2 + Brecken + Rais Bundles', price: '₹1,158', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118322/fp9hmxdwo64po9s7a8u6.png" , discount: "60%"},
        { id: 2, title: 'Tiny Tinas Wonderlands Chaotic Great Edition', price: '₹798', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118323/ut917gaf22nqcbmkwz11.png" , discount: "80%"},
        { id: 3, title: 'Borderlands 3: Ultimate Edition', price: ' ₹1,255', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118323/dgbqmamjjfmekvpsivv1.png" , discount: "75%"},
        { id: 4, title: 'Marvels Midnight Suns Legendary Edition', price: '₹1,424', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118320/ize6trkemrn0xdegtwxr.png" , discount: "75%"},
        { id: 5, title: 'Goat Simulator 3', price: '₹520', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118323/tdihouenei5kqzn7pcr6.png", discount: "65%" },
        { id: 6, title: 'Tony Hawks™ Pro Skater™ 1 +2', price: ' ₹884.10', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118323/syijluveutafcayvgevd.png" , discount: "60%"},
      ];

      const MostPopular = [
        { id: 1, title: 'Grand Theft Auto V: Premium Edition', price: '₹2,321.44', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118321/dnggn7nfiwr9iopsq3ho.png" },
        { id: 2, title: 'VALORANT', price: '₹ Free', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118322/amgfdsiyg0yph7aoezte.png" },
        { id: 3, title: 'The Last Stand: Aftermath', price: ' ₹589', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118324/aseazclmnulkejgizjyo.png" },
        { id: 4, title: 'EA SPORTS FCT™ 24 Standard Edition', price: '₹1,199', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118324/tihfukuhizvkwpu0lrsw.png" },
        { id: 5, title: 'Satisfactory', price: '₹1,600', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118324/becudv5d8ajzvyapot7v.png" },
        { id: 6, title: 'Farming Simulator 22', price: ' ₹1,559', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118321/uhvtwkenynbvtynqdlgo.png" },
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

    return (
        <>
            <div className="game-store1">
                <div className="upper1">
                    <nav className="sidebar">
                        <div className="logo">
                            <img src={logo} alt="Arcade Alley" />
                        </div>
                        <a href="#" className="sidebarItem" onClick={() => navigate("/home1")}>🏠 Home</a>
                        <a href="#" className="sidebarItem" onClick={() => navigate("/catagory1")}>📁 Category</a>
                        <a href="#" className="sidebarItem" >👥 Community</a>
                        <a href="#" className="sidebarItem" onClick={() => navigate("/friends")}>👫 Friends</a>
                        <a href="#" className="sidebarItem">❤️ Wishlist</a>
                        <a href="#" className="sidebarItem">⬇️ Download</a>
                        <a href="#" className="sidebarItem">⚙️ Setting</a>
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
                                            src={img2}
                                            style={{ borderRadius: '50%', width: '3vw', cursor: 'pointer' }}
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
                    <div className="carouselHeader1">
                        <h2 className="heading-secondary">New Released</h2>
                        <div className="navigation-arrows">
                            <button>&lt;</button>
                            <button>&gt;</button>
                        </div>
                    </div>

                    <div className="gameGrid1">
                        {newReleases.map(game => (
                            <div key={game.id} className="game-card">
                                <div className="game-image">
                                    <img src={game.imageUrl} alt={game.title} />
                                    {game.discount && <span className="discount">-{game.discount}</span>}
                                </div>
                                <h3 className="subheading">{game.title}</h3>
                                <p className="price">{game.price}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="gameCarousel">
                    <div className="carouselHeader1">
                        <h2 className="heading-secondary">Saving Spotlight</h2>
                        <div className="navigation-arrows">
                            <button>&lt;</button>
                            <button>&gt;</button>
                        </div>
                    </div>

                    <div className="gameGrid1">
                        {SavingSpotlight.map(game => (
                            <div key={game.id} className="game-card">
                                <div className="game-image">
                                    <img src={game.image} alt={game.title} />
                                    {game.discount && <span className="discount">-{game.discount}</span>}
                                </div>
                                <h3 className="subheading">{game.title}</h3>
                                <p className="price">{game.price}</p>
                            </div>
                        ))}
                    </div>

                    <div className="carouselHeader">
                        <h2>Most Popular</h2>
                        <div className="carouselControls">
                            <button className="controlButton">←</button>
                            <button className="controlButton">→</button>
                        </div>
                    </div>
                    <div className="gameGrid">
                        {MostPopular.map(game => (
                            <div key={game.id} className="game-card">
                                <div className="game-image">
                                    <img src={game.image} alt={game.title} />
                                    {game.discount && <span className="discount">-{game.discount}</span>}
                                </div>
                                <h3 className="subheading">{game.title}</h3>
                                <p className="price">{game.price}</p>
                            </div>
                        ))}
                    </div>

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