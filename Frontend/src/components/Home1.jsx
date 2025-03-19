import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import SearchBar from "./Searchbar";
import axios from "axios";
import logo from '../assets/arcade_alley_logo.png';
import defaultProfilePic from "../assets/wp9549839.png";
import { toast } from "react-toastify";
import '../styles/Home1.css';

const GamingPlatform = ({ socket }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [previewUrl, setPreviewUrl] = useState(defaultProfilePic);
  const userId = localStorage.getItem("userId");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [friendRequests, setFriendRequests] = useState(0);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
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
  const gamesPerPage = 6;

  // New state for friends list
  const [friendsList, setFriendsList] = useState([]);

  const navigate = useNavigate();

  // Fetch user details
  useEffect(() => {
    if (!userId) {
      toast.error("User ID not found. Please log in again.");
      navigate("/login");
      return;
    }

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
  }, [userId, navigate]);

  // Fetch friends list and listen for status updates
  useEffect(() => {
    if (!userId || !socket) return;

    // Fetch friends list
    const fetchFriends = async () => {
      try {
        const response = await fetch(`https://arcade-array.onrender.com/api/friends/user_friends/${userId}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setFriendsList(data.map(friend => ({
          ...friend,
          status: friend.status || 'offline' // Initial status from DB
        })));
        console.log('Fetched friends with statuses:', data);
      } catch (error) {
        console.error("Error fetching friends:", error.message);
        setFriendsList([]);
      }
    };

    fetchFriends();

    // Listen for status updates from socket
    socket.on('status-update', ({ friendId, status }) => {
      console.log(`Home1: ${friendId} is ${status}`);
      setFriendsList((prev) => {
        const updatedList = prev.map((friend) =>
          friend._id === friendId ? { ...friend, status } : friend
        );
        console.log('Updated friendsList:', updatedList);
        return updatedList;
      });
    });

    // Cleanup socket listener
    return () => {
      socket.off('status-update');
    };
  }, [socket, userId]);

  // Fetch games (unchanged)
  useEffect(() => {
    axios.get("https://arcade-array.onrender.com/api/games")
      .then(response => {
        const fetchedGames = response.data;
        setGames(fetchedGames);
        setLoading(false);
        const discountedGames = fetchedGames.filter(game => game.price && game.discount);
        setSavingSpotlight(discountedGames.length > 0 ? discountedGames : fetchedGames);
        const sortedByRelease = [...fetchedGames].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        setDiscoverNew(sortedByRelease.slice(0, 6));
        const sortedByPopularity = [...fetchedGames].sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0));
        setMostPopular(sortedByPopularity.slice(0, 6));
      })
      .catch(error => {
        console.error("Error fetching games:", error);
        setLoading(false);
      });
  }, []);

  // Handle logout
  const handleLogout = () => {
    if (socket && userId) {
      socket.emit('set-status', { userId, status: 'offline' });
      console.log(`Logout: Emitted offline for ${userId}`);
    }
    localStorage.removeItem('userId');
    navigate('/home');
  };

  // Navigation handlers (unchanged)
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

  useEffect(() => {
    setSlidingDiscover('in');
    setSlidingSpotlight('in');
    setSlidingPopular('in');
  }, []);

  const getSliderClass = (slidingState) => {
    if (slidingState === 'left') return 'game-slider sliding-left';
    if (slidingState === 'right') return 'game-slider sliding-right';
    return 'game-slider sliding-in';
  };

  const recentlyPlayed = [
    { title: 'Grand Theft Auto V', progress: 72 },
    { title: 'Farming Simulator 22', progress: 22 },
    { title: 'VALORANT', progress: 91 },
    { title: 'The Witcher 3 Wild Hunt', progress: 12 },
  ];

  return (
    <>
      <div className="container">
        <div className="upper">
          <nav className="sidebar">
            <div className="logo">
              <img src={logo} alt="Arcade Alley" />
            </div>
            <a className="sidebarItem">🏠 Home</a>
            <a className="sidebarItem" onClick={() => navigate("/catagory1")}>📁 Category</a>
            <a className="sidebarItem">👥 Community</a>
            <a className="sidebarItem" onClick={() => navigate("/friends")}>👫 Friends</a>
            <a className="sidebarItem" onClick={() => navigate("/wishlist")}>❤️ Wishlist</a>
            <a className="sidebarItem">⬇️ Download</a>
            <a className="sidebarItem" onClick={() => navigate("/setting")}>⚙️ Setting</a>
          </nav>

          <main className="mainContent">
            <header className="header">
              <SearchBar />
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <span onClick={() => navigate("/notifications")} className='notification_icon'>
                  🔔 {friendRequests > 0 && (
                    <span className="notificationCount">{friendRequests}</span>
                  )}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
                  <img
                    src={previewUrl}
                    style={{ borderRadius: "50%", width: "3vw", cursor: "pointer" }}
                    alt="Profile"
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: 'max-content' }}>
                    <div>
                      <h1 className="username">Welcome, {user?.username || "Guest"}</h1>
                      <p className="useremail">Email: {user?.email || "No email found"}</p>
                    </div>
                  </div>
                  {dropdownVisible && (
                    <div className="dropdownMenu">
                      <button onClick={handleLogout} className="logoutButton">Logout</button>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {!loading && games.length > 0 && (
              <div className={`featuredGame ${slide ? 'slide-out' : 'slide-in'}`}>
                <img src={games[currentIndex].poster} alt={games[currentIndex].name} className="featuredImage" />
                <div className="featuredInfo">
                  <h1>{games[currentIndex].name}</h1>
                  <p>{games[currentIndex].description}</p>
                  <div className="buttons">
                    <button className="buyButton" onClick={() => handleBuyNow(games[currentIndex])}>
                      Buy Now {games[currentIndex].price || 'Free'}
                    </button>
                    {/* Add to Wishlist button unchanged */}
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* Friends Online Section */}
          <aside className="friendsSection">
            <h2>Friends Online</h2>
            {friendsList.length > 0 ? (
              friendsList
                .filter(friend => friend.status === 'online') // Show only online friends
                .map(friend => (
                  <div key={friend._id} className="friendItem">
                    <div className="onlineStatus" style={{ backgroundColor: 'green' }}></div>
                    <div>
                      <div>{friend.username}</div>
                      <div className="gameStatus">Playing a Game</div> {/* Placeholder, update with real data if available */}
                    </div>
                  </div>
                ))
            ) : (
              <p>No friends online</p>
            )}

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

        {/* Game Carousel unchanged */}
        <div className="gameCarousel">
          <div className="carouselHeader">
            <h2>Discover Something New</h2>
            <div className="carouselControls">
              <button className="controlButton" onClick={handlePrevDiscover} disabled={discoverIndex === 0}>←</button>
              <button className="controlButton" onClick={handleNextDiscover} disabled={discoverIndex + gamesPerPage >= discoverNew.length}>→</button>
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

          <div className="carouselHeader">
            <h2>Saving Spotlight</h2>
            <div className="carouselControls">
              <button className="controlButton" onClick={handlePrevSpotlight} disabled={spotlightIndex === 0}>←</button>
              <button className="controlButton" onClick={handleNextSpotlight} disabled={spotlightIndex + gamesPerPage >= savingSpotlight.length}>→</button>
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

          <div className="carouselHeader">
            <h2>Most Popular</h2>
            <div className="carouselControls">
              <button className="controlButton" onClick={handlePrevPopular} disabled={popularIndex === 0}>←</button>
              <button className="controlButton" onClick={handleNextPopular} disabled={popularIndex + gamesPerPage >= mostPopular.length}>→</button>
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
      </div>

      {/* Footer unchanged */}
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

