import { useNavigate } from "react-router-dom";
import SearchBar from "./Searchbar";
import axios from "axios";
import logo from '../assets/arcade_alley_logo.png';
import img2 from '../assets/wp9549839.png';
import { toast } from "react-toastify";

import React, { useState, useEffect } from 'react';
import '../styles/Home1.css';

const GamingPlatform = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown menu
  const [friendRequests, setFriendRequests] = useState(0); // State to store the count of friend requests
  const [loading, setLoading] = useState(true);
  const [savingSpotlight, setSavingSpotlight] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [games, setGames] = useState([]);
  const [slide, setSlide] = useState(false);
  const [discoverNew, setDiscoverNew] = useState([]);
  const [visibleDiscover, setVisibleDiscover] = useState(6);
  const [visibleSpotlight, setVisibleSpotlight] = useState(6);
  const [visiblePopular, setVisiblePopular] = useState(6);


  const loadMoreDiscover = () => {
    setVisibleDiscover(prev => prev + 6);
  };

  const loadMoreSpotlight = () => {
    setVisibleSpotlight(prev => prev + 6);
  };
  const loadMorePopular = () => setVisiblePopular(prev => prev + 6);


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

  useEffect(() => {
    axios.get("https://arcade-array.onrender.com/api/games")
      .then(response => {
        setGames(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching games:", error);
        setLoading(false);
      });
  }, []);




  const handleAddToWishlist = async (gameId, gameName) => {
    if (!userId) {
      toast.error("Please log in to add to wishlist.");
      return;
    }

    try {
      const response = await axios.post("https://arcade-array.onrender.com/api/games/add", {
        userId,
        gameId,
      });

      if (response.status === 200) {
        if (response.data.message === "Game already in wishlist") {
          toast.info("This game is already in your wishlist!");
        } else {
          toast.success(`${gameName} added to wishlist!`);
        }
      } else {
        toast.error(response.data.message || "Failed to add to wishlist.");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);

      if (error.response?.data?.message === "Game already in wishlist") {
        toast.info("This game is already in your wishlist!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };


  const handleBuyNow = async (game) => {
    if (!userId) {
      toast.error("Please log in to purchase.");
      return;
    }

    try {
      // Send request to backend to create order
      const response = await axios.post("https://arcade-array.onrender.com/api/payment/order", {
        userId,
        amount: game.price * 100, // Razorpay requires amount in paisa
        gameId: game._id,
      });

      const { orderId, currency, amount, key } = response.data; // Get order details from backend

      // Initialize Razorpay Checkout
      const options = {
        key,
        amount,
        currency,
        name: "Arcade Alley",
        description: `Purchase: ${game.name}`,
        image: logo, // Your platform's logo
        order_id: orderId,
        handler: async function (response) {
          // Handle successful payment
          await axios.post("https://arcade-array.onrender.com/api/payment/verify", {
            orderId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });

          toast.success(`Payment successful! You purchased ${game.name}`);
        },
        prefill: {
          name: user.username,
          email: user.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    }
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
            <a href="#" className="sidebarItem" onClick={() => navigate("/catagory1")}>📁 Category</a>
            <a href="#" className="sidebarItem">👥 Community</a>
            <a href="#" className="sidebarItem" onClick={() => navigate("/friends")}>👫 Friends</a>
            <a href="#" className="sidebarItem" onClick={() => navigate("/wishlist")}>❤️ Wishlist</a>
            <a href="#" className="sidebarItem">⬇️ Download</a>
            <a href="#" className="sidebarItem">⚙️ Setting</a>
          </nav>

          {/* Main Content */}
          <main className="mainContent">
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

            {/* Featured Game Section */}
            {!loading && games.length > 0 && (
              <div className={`featuredGame ${slide ? 'slide-out' : 'slide-in'}`} >
                <img src={games[currentIndex].poster} alt={games[currentIndex].name} className="featuredImage" />
                <div className="featuredInfo">
                  <h1>{games[currentIndex].name}</h1>
                  <p>{games[currentIndex].description}</p>
                  <div className="buttons">
                    <button className="buyButton" onClick={() => handleBuyNow(games[currentIndex])}>
                      Buy Now {games[currentIndex].price || 'Free'}
                    </button>
                    {user ? (
                      <button
                        className="controlButton"
                        onClick={() => {
                          if (games[currentIndex]) {
                            handleAddToWishlist(games[currentIndex]._id, games[currentIndex].name);
                          } else {
                            console.error("Game data is not available.");
                          }
                        }}>
                        ❤️
                      </button>

                    ) : (
                      <div></div>
                    )}

                  </div>
                </div>
              </div>
            )}

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
          {/* Game Carousel */}
          {/* Discover Something New Section */}
          <div className="carouselHeader">
            <h2>Discover Something New</h2>
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