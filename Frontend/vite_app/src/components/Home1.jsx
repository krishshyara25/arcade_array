import React from 'react';
import '../styles/Home1.css';
import { useNavigate } from "react-router-dom";
import logo from '../assets/arcade_alley_logo.png';
import img1 from '../assets/wp1854784-the-witcher-3-wallpapers.png'
import img2 from '../assets/wp9549839.png';
import img3 from '../assets/tankhead-c7n4p.png'
import img4 from '../assets/image2.png'



const GameStore = () => {
  const navigate = useNavigate();
  const onlineFriends = [
    { name: "Quantum spectre55", email: "quantums@gmail.com", status: "online", avatar: "/avatar1.jpg" },
    { name: "Crimsontiger69", status: "online", game: "Resident Evil 4", avatar: "/avatar2.jpg", action: "Join" },
    { name: "Stealth_sniper", status: "online", game: "Fortnite", avatar: "/avatar3.jpg", action: "Playing" },
    { name: "IceDragon", status: "online", game: "Roblox", avatar: "/avatar4.jpg", action: "Playing" },
    { name: "Blitzxcreag86", status: "online", game: "EA Sports FC 2024", avatar: "/avatar5.jpg", action: "Join" },
    { name: "phenix_rising", status: "online", game: "Rocket league", avatar: "/avatar6.jpg", action: "Playing" },
    { name: "noenNova", status: "online", game: "GTA 5", avatar: "/avatar7.jpg", action: "Playing" }
  ];

  const discoverGames = [
    { title: "TankHead", price: "₹1,300", image: "/tankhead.jpg" },
    { title: "EA SPORTS FC™ 25 Standard Edition", price: "₹3,999", image: "/fc25.jpg" },
    { title: "Warhammer 40,000: Space Marine 2", price: "₹2,799", image: "/warhammer.jpg" },
    { title: "Squirrel with a Gun", price: "₹719", image: "/squirrel.jpg" },
    { title: "Wild Bastards", price: "₹1,249", image: "/wild-bastards.jpg" }
  ];

  const recentlyPlayed = [
    { title: "Grand Theft Auto V", progress: "72%", image: "/gtav.jpg" },
    { title: "Farming Simulator 22", progress: "52%", image: "/farming-sim.jpg" },
    { title: "VALORANT", progress: "84%", image: "/valorant.jpg" },
    { title: "The Witcher 3 Wild Hunt", progress: "12%", image: "/witcher3.jpg" }
  ];

  return (
    <div className="game-store1">
      
      <div className="poster">
      <nav className="sidebar">
        <div className="logo">
          <img src={logo} alt="Arcade Alley" />
        </div>
        <ul className="nav-menu">
          <li className="active" onClick={() => navigate("/home1")}><span className="icon">🏠</span>Home</li>
          <li><span className="icon" >📑</span>Category</li>
          <li><span className="icon">👥</span>Community</li>
          <li onClick={() => navigate("/friends")}><span className="icon" >👤</span>Friends</li>
          <li><span className="icon">❤️</span>Wishlist</li>
          <li><span className="icon">⬇️</span>Download</li>
          <li><span className="icon">⚙️</span>Setting</li>
        </ul>
      </nav>

      <main className="main-content">
        <header className="top-bar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search" />
          </div>
          <div className="user-profile">
            <div className="notification-bell">🔔</div>
            <div className="user-avatar">
              <img src={img2} alt="User Profile" />
            </div>
          </div>
        </header>

        <section className="hero-section">
          <div className="hero-content">
            <h1>The Witcher 3</h1>
            <p>The most awarded game of a generation, now enhanced for the next!</p>
            <div className="hero-actions">
              <button className="buy-now">Buy Now ₹1,163</button>
              <button className="wishlist-btn">❤️</button>
            </div>
          </div>
        <div className="game-image">
            <img src={img1} />
        </div>
        </section>

         <section className="game-section">
                  <div className="section-header">
                    <h2>Discover something new</h2>
                    <div className="navigation-arrows">
                      <button className="arrow-left">←</button>
                      <button className="arrow-right">→</button>
                    </div>
                  </div>
                  <div className="game-grid">
                    {discoverGames.map((game, index) => (
                      <div key={index} className="game-card">
                        <img src={img3} alt={game.title} />
                        <h3>{game.title}</h3>
                        <p>{game.price}</p>
                      </div>
                    ))}
                  </div>
                </section>
      </main>
      <aside className="right-sidebar">
        <section className="friends-online">
          <div className="section-header">
            <h2>Friends Online</h2>
            <span className="online-count">{onlineFriends.length}</span>
          </div>
          <div className="friends-list">
            {onlineFriends.map((friend, index) => (
              <div key={index} className="friend-item">
                <div className="friend-avatar">
                  <img src={img2} alt={friend.name} />
                  <span className="online-indicator"></span>
                </div>
                <div className="friend-details">
                  <h4>{friend.name}</h4>
                  <p>{friend.game || friend.email}</p>
                </div>
                {friend.action && (
                  <button className={`friend-action ${friend.action.toLowerCase()}`}>
                    {friend.action}
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="recently-played">
          <div className="section-header">
            <h2>Recently Played</h2>
            <button className="more-options">•••</button>
          </div>
          <div className="recent-games">
            {recentlyPlayed.map((game, index) => (
              <div key={index} className="recent-game">
                <img src={img4} alt={game.title} />
                <div className="game-progress">
                  <h4>{game.title}</h4>
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{width: game.progress}}
                    ></div>
                  </div>
                  <span className="progress-text">{game.progress}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </aside>
      </div>

      
    </div>
  );
};

export default GameStore;
