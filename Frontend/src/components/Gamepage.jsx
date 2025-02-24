import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import "../styles/Gamepage.css";
import img2 from "../assets/wp9549839.png";
import logo from '../assets/arcade_alley_logo.png';


const GamePage = () => {
  const { id } = useParams(); // Get game ID from URL
  const [game, setGame] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); // Retrieve user ID from local storage
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);


  const handleRestrictedAccess = () => {
    if (!user) {
      setShowPopup(true);
    } else {
      navigate("/restricted-page"); // Replace with actual paths if needed
    }
  };


  // Fetch game details
  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        console.log(`Fetching game details from: https://arcade-array.onrender.com/api/games/games/${id}`);
        const response = await fetch(`https://arcade-array.onrender.com/api/games/games/${id}`);
        if (!response.ok) throw new Error("Failed to fetch game details");

        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error("Error fetching game details:", error);
        setError("Error fetching game details");
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  // Fetch user details only if logged in
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!game) return <div>No game found</div>;

  return (
    <div className="game-page">
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
            <a href="#" onClick={handleRestrictedAccess}>Community</a>
            <a href="#" onClick={handleRestrictedAccess}>Friends</a>
            <a href="#" onClick={handleRestrictedAccess}>Wishlist</a>
            <a href="#" onClick={handleRestrictedAccess}>Download</a>
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

      {/* Main Content */}
      <main className="maincontent">
        <div className="game-container">

          {/* Game Cover */}
          <div className="game-cover">
            <img src={game.poster} alt={game.name} />
          </div>


          {/* Game Info */}
          <div className="game-info">
            <button className="backbutton" onClick={() => navigate(-1)}>
              ◀ Back
            </button>
            <div className="gamedata">
              <div className="gamedata2">
                <div className="gameimg">
                  <img src={"https://res.cloudinary.com/drno4r3vd/image/upload/v1740395233/img15_jsn3xq.png"} alt="game_img" className="game_img"/>
                </div>


                <div>
                  <h1>{game.name}</h1>
                  <p className="game-description">{game.description}</p>

                  {/* Platform Icons */}
                  <div className="platform-icons">
                    {game.platforms?.map((platform, index) => (
                      <div key={index} className="platform-badge">
                        <span>{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>


              {/* Game Details */}
              <div className="game-details">
                <div className="detail-item">
                  <div className="detail-label">Developer</div>
                  <div className="detail-value">{game.developer}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Publisher</div>
                  <div className="detail-value">{game.publisher}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Release Date</div>
                  <div className="detail-value">{new Date(game.releaseDate).toDateString()}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Price</div>
                  <div className="detail-value">{game.price}</div>
                </div>

                {/* Buy Section */}
                <div className="buy-section">
                  <button className="buy-button">Buy Now {game.price}</button>
                  <button className="wishlist-button">❤️</button>
                </div>
              </div>


            </div>
          </div>
        </div>

        {/* Screenshot Gallery */}
        <div className="screenshot-gallery">
          {game.screenshots?.map((screenshot, index) => (
            <img key={index} src={screenshot} alt={`Screenshot ${index + 1}`} />
          ))}
        </div>
      </main>

      {/* Login Required Popup */}
      {
        showPopup && (
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
        )
      }










      {/* <div className="game-page">
        <nav className="nav-bar">
          <div className="nav-left">
            <button className="back-button" onClick={() => navigate(-1)}>
              ◀ Back
            </button>
            <div className="logo1">
              <img src="/logo.png" alt="Game Store Logo" />
            </div>
            <div className="nav-links">
              <a href="/">Home</a>
              <a href="/store">Store</a>
              <a href="/about">About</a>
            </div>
          </div>
          <div className="nav-right">
            <button className="notification-button">🔔</button>
            <div className="user-profile">
              <img src="/user-avatar.png" alt="User Avatar" />
              <div className="user-info">
                <span className="username">John Doe</span>
                <span className="user-email">johndoe@gmail.com</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="game-container">

          <div className="game-cover">
            <img src={game.image} alt={game.title} />
          </div>

          <div className="game-info">
            <h1>{game.title}</h1>
            <p className="game-description">{game.description}</p>

            <div className="platform-icons">
              {game.platforms.map((platform, index) => (
                <span key={index} className="platform-badge">
                  {platform}
                </span>
              ))}
            </div>

            <div className="game-details">
              <div className="detail-item">
                <span className="detail-label">Developer:</span>
                <span className="detail-value">{game.developer}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Publisher:</span>
                <span className="detail-value">{game.publisher}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Release Date:</span>
                <span className="detail-value">{game.releaseDate}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Genres:</span>
                <span className="detail-value">{game.genre.join(", ")}</span>
              </div>
            </div>

            <div className="buy-section">
              <button className="buy-button">Buy Now - ${game.price}</button>
              <button className="wishlist-button">❤️</button>
            </div>
          </div>
        </div>

        <div className="screenshot-gallery">
          {game.screenshots.map((screenshot, index) => (
            <img key={index} src={screenshot} alt={`Screenshot ${index + 1}`} />
          ))}
        </div>
      </div> */}




    </div>
  );
};

export default GamePage;




















