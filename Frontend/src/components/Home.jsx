import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import SearchBar from './Searchbar';
import logo from '../assets/arcade_alley_logo.png';
import axios from "axios";
import 'swiper/css';
import 'swiper/css/navigation';

const GameStore = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingSpotlight, setSavingSpotlight] = useState([]);
  const [discoverNew, setDiscoverNew] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [slide, setSlide] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [discoverIndex, setDiscoverIndex] = useState(0);
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [popularIndex, setPopularIndex] = useState(0);

  const [slidingDiscover, setSlidingDiscover] = useState(false);
  const [slidingSpotlight, setSlidingSpotlight] = useState(false);
  const [slidingPopular, setSlidingPopular] = useState(false);

  const gamesPerPage = 6; // Number of games shown at a time


  // Handle Popular Games Navigation
  const handlePrevPopular = () => {
    if (popularIndex > 0) {
      setSlidingPopular('left');
      setTimeout(() => {
        setPopularIndex(prev => Math.max(0, prev - gamesPerPage));
        setSlidingPopular('in');
      }, 500);
    }
  };

  const handleNextPopular = () => {
    if (popularIndex + gamesPerPage < mostPopular.length) {
      setSlidingPopular('right');
      setTimeout(() => {
        setPopularIndex(prev => Math.min(mostPopular.length - gamesPerPage, prev + gamesPerPage));
        setSlidingPopular('in');
      }, 500);
    }
  };

  // Handle Discover New Games Navigation
  const handlePrevDiscover = () => {
    if (discoverIndex > 0) {
      setSlidingDiscover('left');
      setTimeout(() => {
        setDiscoverIndex(prev => Math.max(0, prev - gamesPerPage));
        setSlidingDiscover('in');
      }, 500);
    }
  };

  const handleNextDiscover = () => {
    if (discoverIndex + gamesPerPage < discoverNew.length) {
      setSlidingDiscover('right');
      setTimeout(() => {
        setDiscoverIndex(prev => Math.min(discoverNew.length - gamesPerPage, prev + gamesPerPage));
        setSlidingDiscover('in');
      }, 500);
    }
  };

  // Handle Spotlight Games Navigation
  const handlePrevSpotlight = () => {
    if (spotlightIndex > 0) {
      setSlidingSpotlight('left');
      setTimeout(() => {
        setSpotlightIndex(prev => Math.max(0, prev - gamesPerPage));
        setSlidingSpotlight('in');
      }, 500);
    }
  };

  const handleNextSpotlight = () => {
    if (spotlightIndex + gamesPerPage < savingSpotlight.length) {
      setSlidingSpotlight('right');
      setTimeout(() => {
        setSpotlightIndex(prev => Math.min(savingSpotlight.length - gamesPerPage, prev + gamesPerPage));
        setSlidingSpotlight('in');
      }, 500);
    }
  };

  // Reset sliding states when component mounts
  useEffect(() => {
    setSlidingDiscover('in');
    setSlidingSpotlight('in');
    setSlidingPopular('in');
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

  const handleRestrictedAccess = () => {
    if (!user) {
      setShowPopup(true);
    } else {
      navigate("/restricted-page"); // Replace with actual paths if needed
    }
  };

  useEffect(() => {
    setLoading(true);
    axios.get("https://arcade-array.onrender.com/api/games")
      .then(response => {
        const fetchedGames = response.data;
        setGames(fetchedGames);

        const discountedGames = fetchedGames.filter(game => game.price && game.discount);
        setSavingSpotlight(discountedGames.length > 0 ? discountedGames : fetchedGames);

        const sortedByRelease = [...fetchedGames].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        setDiscoverNew(sortedByRelease);

        const sortedByPopularity = [...fetchedGames].sort((a, b) => b.popularityScore - a.popularityScore);
        setMostPopular(sortedByPopularity);

        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching games:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % games.length); // Cycle games
        setSlide(false);
      }, 500); // Match this with CSS transition duration
    }, 3500); // Change game every 3 seconds

    return () => clearInterval(interval);
  }, [games]);

  // Determine slider class based on sliding state
  const getSliderClass = (slidingState) => {
    if (slidingState === 'left') return 'game-slider sliding-left';
    if (slidingState === 'right') return 'game-slider sliding-right';
    return 'game-slider sliding-in';
  };

  return (
    <>
      <div className="container">
        <div className="upper1">
          {/* Sidebar */}
          <nav className="sidebar">
            <div className="logo">
              <img src={logo} alt="Arcade Alley" />
            </div>
            <a className="sidebarItem">🏠 Home</a>
            <a className="sidebarItem" onClick={() => navigate("/catagory")}>📁 Category</a>
            <a className="sidebarItem" onClick={handleRestrictedAccess}>👥 Community</a>
            <a className="sidebarItem" onClick={handleRestrictedAccess}>👫 Friends</a>
            <a className="sidebarItem" onClick={handleRestrictedAccess}>❤️ Wishlist</a>
            <a className="sidebarItem" onClick={handleRestrictedAccess}>⬇️ Download</a>
            <a className="sidebarItem" onClick={handleRestrictedAccess}>⚙️ Setting</a>
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

            {/* Featured Game Section */}
            {!loading && games.length > 0 && (
              <div className={`featuredGame ${slide ? 'slide-out' : 'slide-in'}`}>
                <img src={games[currentIndex].poster} alt={games[currentIndex].name} className="featuredImage" />
                <div className="featuredInfo">
                  <h1>{games[currentIndex].name}</h1>
                  <p>{games[currentIndex].description}</p>
                  <div className="buttons">
                    <button className="buyButton" onClick={handleRestrictedAccess}>Buy Now {games[currentIndex].price || 'Price loading..'}</button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Discover Something New Section */}
        <div className="carouselHeader">
          <h2>Discover Something New</h2>
          <div className="carouselControls">
            <button
              className="controlButton"
              onClick={handlePrevDiscover}
              disabled={discoverIndex === 0}
            >←</button>
            <button
              className="controlButton"
              onClick={handleNextDiscover}
              disabled={discoverIndex + gamesPerPage >= discoverNew.length}
            >→</button>
          </div>
        </div>

        {loading ? (
          <p>Loading games...</p>
        ) : (
          <div className={getSliderClass(slidingDiscover)}>
            <div className="gameGrid">
              {discoverNew.slice(discoverIndex, discoverIndex + gamesPerPage).map(game => (
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
          </div>
        )}

        {/* Saving Spotlight Section */}
        <div className="carouselHeader">
          <h2>Saving Spotlight</h2>
          <div className="carouselControls">
            <button
              className="controlButton"
              onClick={handlePrevSpotlight}
              disabled={spotlightIndex === 0}
            >←</button>
            <button
              className="controlButton"
              onClick={handleNextSpotlight}
              disabled={spotlightIndex + gamesPerPage >= savingSpotlight.length}
            >→</button>
          </div>
        </div>

        {loading ? (
          <p>Loading games...</p>
        ) : (
          <div className={getSliderClass(slidingSpotlight)}>
            <div className="gameGrid">
              {savingSpotlight.slice(spotlightIndex, spotlightIndex + gamesPerPage).map(game => (
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
          </div>
        )}

        {/* Most Popular Section */}
        <div className="carouselHeader">
          <h2>Most Popular</h2>
          <div className="carouselControls">
            <button
              className="controlButton"
              onClick={handlePrevPopular}
              disabled={popularIndex === 0}
            >←</button>
            <button
              className="controlButton"
              onClick={handleNextPopular}
              disabled={popularIndex + gamesPerPage >= mostPopular.length}
            >→</button>
          </div>
        </div>

        {loading ? (
          <p>Loading games...</p>
        ) : (
          <div className={getSliderClass(slidingPopular)}>
            <div className="gameGrid">
              {mostPopular.slice(popularIndex, popularIndex + gamesPerPage).map(game => (
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
          </div>
        )}
      </div>

      {/* Login Required Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Login Required</h2>
            <p>You need to log in to access this page.</p>
            <div className="popup-buttons">
              <button onClick={() => setShowPopup(false)}>Close</button>
              <Link to="/login"><button>Login</button></Link>
            </div>
          </div>
        </div>
      )}

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
            <a href="/policies" target="_blank" className="underline">
              Terms and Conditions
            </a>
            <a href="#" className="link">Privacy Policy/Store</a>
            <a href="#" className="link">Refund Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default GameStore;