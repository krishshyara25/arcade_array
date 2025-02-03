import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import logo from '../assets/arcade_alley_logo.png';
import img1 from '../assets/wp1854784-the-witcher-3-wallpapers.png';
import img2 from '../assets/tankhead-c7n4p.png';
import img3 from '../assets/image.png';
import img4 from '../assets/image2.png';

const GameStore = () => {
  const [user, setUser] = useState(null);

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

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <img src={logo} alt="Arcade Alley" />
          </div>
          <div className="search-bar">
            <input type="search" placeholder="Search" />
          </div>
        </div>
        <div className="header-right">
          {user ? (
            <div className="profile-info">
              <div className="profile-avatar"></div>
              <div>
                <div className="username">{user.username}</div>
                <div className="email">{user.email}</div>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/signup">
                <button>Signup</button>
              </Link>
            </div>
          )}
        </div>
      </header>

      <div className="game-store">
        <nav className="sidebar">
          <ul className="nav-items">
            <li>Home</li>
            <li>Category</li>
            <li>Community</li>
            <li>Friends</li>
            <li>Profile</li>
            <li>Download</li>
            <li>Setting</li>
          </ul>
        </nav>

        <main className="main-content">
          <section className="featured-game">
            <div className="game-info">
              <h1>The Witcher 3</h1>
              <p>The most awarded game of a generation, now enhanced for the next.</p>
              <button className="buy-button">Buy Now €14.99</button>
            </div>
            <div className="game-image">
              <img src={img1} alt="The Witcher 3" />
            </div>
          </section>

          <section className="game-section">
            <div className="section-header">
              <h2>Discover something new</h2>
            </div>
            <div className="game-grid">
              {[img2, img3, img4].map((image, index) => (
                <div key={index} className="game-card">
                  <img src={image} alt="Game" />
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default GameStore;
