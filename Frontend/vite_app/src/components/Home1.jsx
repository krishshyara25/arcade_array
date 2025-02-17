import { useNavigate } from "react-router-dom";
import logo from '../assets/arcade_alley_logo.png';
import img1 from '../assets/wp1854784-the-witcher-3-wallpapers.png'
import img2 from '../assets/wp9549839.png';
import img3 from '../assets/tankhead-c7n4p.png'
import img20 from '../assets/image2.png'
import img5 from '../assets/image5.png'
import img6 from '../assets/image6.png'
import img7 from '../assets/image7.png'
import img8 from '../assets/image8.png'
import img9 from '../assets/image9.png'
import img10 from '../assets/image10.png'
import img11 from '../assets/image11.png'
import img12 from '../assets/image12.png'
import img13 from '../assets/image13.png'
import img14 from '../assets/image14.png'
import img15 from '../assets/image15.png'
import img16 from '../assets/image16.png'
import img17 from '../assets/image17.png'
import img18 from '../assets/image18.png'
import img19 from '../assets/image19.png'







import React, { useState, useEffect } from 'react';
import '../styles/Home1.css';

const GamingPlatform = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown menu
  const [friendRequests, setFriendRequests] = useState(0); // State to store the count of friend requests



  const navigate = useNavigate();

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



  const gameData = [
    { id: 1, title: 'TankHead', price: '₹1,300', image: img3 },
    { id: 2, title: 'EA SPORTS FC™ 25', price: '₹3,999', image: img19 },
    { id: 3, title: 'Space Marine 2', price: '₹2,799', image: img5 },
    { id: 4, title: 'Squirrel with a Gun', price: '₹719', image: img6 },
    { id: 5, title: 'Wild Bastards', price: '₹1,249', image: img7 },
    { id: 6, title: 'VALORANT', price: '₹ Free', image: img8 },
  ];

  const Savingspotlight = [
      { id: 1, title: 'Dying Light 2 + Brecken + Rais Bundles', price: '₹1,158', image: img9 , discount: "60%"},
      { id: 2, title: 'Tiny Tinas Wonderlands Chaotic Great Edition', price: '₹798', image: img10 , discount: "80%"},
      { id: 3, title: 'Borderlands 3: Ultimate Edition', price: ' ₹1,255', image: img11 , discount: "75%"},
      { id: 4, title: 'Marvels Midnight Suns Legendary Edition', price: '₹1,424', image: img12 , discount: "75%"},
      { id: 5, title: 'Goat Simulator 3', price: '₹520', image: img13, discount: "65%" },
      { id: 6, title: 'Tony Hawks™ Pro Skater™ 1 +2', price: ' ₹884.10', image: img14 , discount: "60%"},
    ];

  const gameData2 = [
    { id: 1, title: 'Grand Theft Auto V: Premium Edition', price: '₹2,321.44', image: img20 },
    { id: 2, title: 'VALORANT', price: '₹ Free', image: img8 },
    { id: 3, title: 'The Last Stand: Aftermath', price: ' ₹589', image: img15 },
    { id: 4, title: 'EA SPORTS FCT™ 24 Standard Edition', price: '₹1,199', image: img16 },
    { id: 5, title: 'Satisfactory', price: '₹1,600', image: img17 },
    { id: 6, title: 'Farming Simulator 22', price: ' ₹1,559', image: img18 },
  ];

  const recentlyPlayed = [
    { title: 'Grand Theft Auto V', progress: 72 },
    { title: 'Farming Simulator 22', progress: 22 },
    { title: 'VALORANT', progress: 91 },
    { title: 'The Witcher 3 Wild Hunt', progress: 12 },
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
      <div className="container">
        <div className="upper">
          {/* Sidebar */}
          <nav className="sidebar">
            <div className="logo">
              <img src={logo} alt="Arcade Alley" />
            </div>
            <a href="#" className="sidebarItem">🏠 Home</a>
            <a href="#" className="sidebarItem">📁 Category</a>
            <a href="#" className="sidebarItem">👥 Community</a>
            <a href="#" className="sidebarItem" onClick={() => navigate("/friends")}>👫 Friends</a>
            <a href="#" className="sidebarItem">❤️ Wishlist</a>
            <a href="#" className="sidebarItem">⬇️ Download</a>
            <a href="#" className="sidebarItem">⚙️ Setting</a>
          </nav>

          {/* Main Content */}
          <main className="mainContent">
            <header className="header">
              <div className="searchBar">
                <input type="text" placeholder="Search" className="searchInput" />
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <span onClick={() => navigate("/notifications")} className='notification_icon'>🔔{friendRequests > 0 && (
                  <span className="notificationCount">{friendRequests}</span> // Display notification count if friendRequests > 0
                )}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' , position: 'relative' }}>
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

            {/* Featured Game */}
            <div className="featuredGame">
              <img src={img1} alt="The Witcher 3" className="featuredImage" />
              <div className="featuredInfo">
                <div>
                  <h1>The Witcher 3</h1>
                  <p>The most awarded game of a generation, now enhanced for the next!</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '20px', gap: '30px' }}>
                  <button className="buyButton">Buy Now ₹1,163</button>
                  <button className="controlButton" style={{ backgroundColor: '#2d2d3a' }}>❤️</button>
                </div>
              </div>
            </div>
          </main>

          {/* Friends & Recently Played Section */}
          <aside className="friendsSection">
            <h2>Friends Online</h2>
            {['Crimsontiger69', 'St3alth_sniper', 'IceDragon', 'Blitzcreag66', 'phenix_rising', 'noenNova'].map(friend => (
              <div key={friend} className="friendItem">
                <div className="onlineStatus"></div>
                <div>
                  <div>{friend}</div>
                  <div className="gameStatus">Playing Fortnite</div>
                </div>
              </div>
            ))}

            <div className="recentlyPlayed">
              <h2>Recently Played</h2>
              {recentlyPlayed.map(game => (
                <div key={game.title} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{game.title}</span>
                    <span>{game.progress}%</span>
                  </div>
                  <div className="progressBar">
                    <div className="progress" style={{ width: `${game.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* Game Carousel */}
        <div className="gameCarousel">
          <div className="carouselHeader">
            <h2>Discover something new</h2>
            <div className="carouselControls">
              <button className="controlButton">←</button>
              <button className="controlButton">→</button>
            </div>
          </div>
          <div className="gameGrid">
            {gameData.map(game => (
              <div key={game.id} className="gameCard">
                <img src={game.image} alt={game.title} className="gameCardImage" />
                <div className="gameCardInfo">
                  <h3>{game.title}</h3>
                  <p className="price">{game.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="carouselHeader">
            <h2>Saving Spotlight</h2>
            <div className="carouselControls">
              <button className="controlButton">←</button>
              <button className="controlButton">→</button>
            </div>
          </div>
          <div className="gameGrid">
            {Savingspotlight.map(game => (
              <div key={game.id} className="gameCard">
                <img src={game.image} alt={game.title} className="gameCardImage" />
                <div className="gameCardInfo">
                  <h3>{game.title}</h3>
                  <p className="price">{game.price}</p>
                </div>
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
            {gameData2.map(game => (
              <div key={game.id} className="gameCard">
                <img src={game.image} alt={game.title} className="gameCardImage" />
                <div className="gameCardInfo">
                  <h3>{game.title}</h3>
                  <p className="price">{game.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
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
    </>
  );
};

export default GamingPlatform;