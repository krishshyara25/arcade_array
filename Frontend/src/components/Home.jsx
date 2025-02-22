import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import SearchBar from './Searchbar';
import logo from '../assets/arcade_alley_logo.png';


const GameStore = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('https://arcade-array.onrender.com/api/user/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('authToken');
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };


  const Discover = [
    { id: 1, title: 'TankHead', price: '₹1,300', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118324/mos3g07a8dqk9ddftmni.png" },
    { id: 2, title: 'EA SPORTS FC™ 25', price: '₹3,999', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118321/iuthw8gvt6bbjp8u7x58.png" },
    { id: 3, title: 'Space Marine 2', price: '₹2,799', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118320/lwlk9qdbswacidtrgb7r.png" },
    { id: 4, title: 'Squirrel with a Gun', price: '₹719', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118320/smwheajgcqxnqtai8siq.png" },
    { id: 5, title: 'Wild Bastards', price: '₹1,249', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118320/n4bmgrbkcu8lvau0lkp1.png" },
    { id: 6, title: 'VALORANT', price: '₹ Free', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118322/amgfdsiyg0yph7aoezte.png "},
  ];

  const Savingspotlight = [
    { id: 1, title: 'Dying Light 2 + Brecken + Rais Bundles', price: '₹1,158', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118322/fp9hmxdwo64po9s7a8u6.png" , discount: "60%"},
    { id: 2, title: 'Tiny Tinas Wonderlands Chaotic Great Edition', price: '₹798', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118323/ut917gaf22nqcbmkwz11.png" , discount: "80%"},
    { id: 3, title: 'Borderlands 3: Ultimate Edition', price: ' ₹1,255', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118323/dgbqmamjjfmekvpsivv1.png" , discount: "75%"},
    { id: 4, title: 'Marvels Midnight Suns Legendary Edition', price: '₹1,424', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118320/ize6trkemrn0xdegtwxr.png" , discount: "75%"},
    { id: 5, title: 'Goat Simulator 3', price: '₹520', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118323/tdihouenei5kqzn7pcr6.png", discount: "65%" },
    { id: 6, title: 'Tony Hawks™ Pro Skater™ 1 +2', price: ' ₹884.10', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118323/syijluveutafcayvgevd.png" , discount: "60%"},
  ];

  const gameData2 = [
    { id: 1, title: 'Grand Theft Auto V: Premium Edition', price: '₹2,321.44', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118321/dnggn7nfiwr9iopsq3ho.png" },
    { id: 2, title: 'VALORANT', price: '₹ Free', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118322/amgfdsiyg0yph7aoezte.png" },
    { id: 3, title: 'The Last Stand: Aftermath', price: ' ₹589', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118324/aseazclmnulkejgizjyo.png" },
    { id: 4, title: 'EA SPORTS FCT™ 24 Standard Edition', price: '₹1,199', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118324/tihfukuhizvkwpu0lrsw.png" },
    { id: 5, title: 'Satisfactory', price: '₹1,600', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118324/becudv5d8ajzvyapot7v.png" },
    { id: 6, title: 'Farming Simulator 22', price: ' ₹1,559', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118321/uhvtwkenynbvtynqdlgo.png" },
  ];

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
            <a href="#" className="sidebarItem" onClick={() => navigate("/catagory")}>📁 Category</a>
            <a href="#" className="sidebarItem" onClick={() => navigate("/login")}>👥 Community</a>
            <a href="#" className="sidebarItem" onClick={() => navigate("/login")}>👫 Friends</a>
            <a href="#" className="sidebarItem">❤️ Wishlist</a>
            <a href="#" className="sidebarItem" onClick={() => navigate("/login")}>⬇️ Download</a>
            <a href="#" className="sidebarItem">⚙️ Setting</a>
          </nav>

          {/* Main Content */}
          <main className="mainContent">
            <header className="header">
            <SearchBar />
              <div className="auth-buttons">
                <Link to="/login">
                  <button>Login</button>
                </Link>
                <Link to="/signup">
                  <button>Signup</button>
                </Link>
              </div>

            </header>

            {/* Featured Game */}
            <div className="featuredGame" style={{ display: 'flex', justifyContent: 'center' }}>
              <img src="https://res.cloudinary.com/drno4r3vd/image/upload/v1740118330/ynaroxlk7eapw0mxic8u.png" alt="The Witcher 3" className="featuredImage" style={{ width: '70%' }} />
              <div className="featuredInfo">
                <div>
                  <h1>The Witcher 3</h1>
                  <p>The most awarded game of a generation, now enhanced for the next!</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '20px', gap: '30px' }}>
                  <button className="buyButton">Buy Now ₹1,163</button>
                </div>
              </div>
            </div>
          </main>

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
            {Discover.map(game => (
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
            <h2>Saving Spotlight</h2>
            <div className="carouselControls">
              <button className="controlButton">←</button>
              <button className="controlButton">→</button>
            </div>
          </div>
          <div className="gameGrid">
            {Savingspotlight.map(game => (
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
            {gameData2.map(game => (
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

export default GameStore;


