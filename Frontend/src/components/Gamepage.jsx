import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Gamepage.css";
import img2 from "../assets/wp9549839.png";

const GamePage = () => {
  const { id } = useParams(); // Get game ID from URL
  const [game, setGame] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); // Retrieve user ID from local storage
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(true);

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
          <button
            className="back-button"
            onClick={() => {
              const storedUserId = localStorage.getItem("userId");
              navigate(storedUserId ? "/home1" : "/home");
            }}
          >
            <i className="fas fa-arrow-left"></i> Back
          </button>



          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">Category</a>
            <a href="#">Community</a>
            <a href="#">Friends</a>
            <a href="#">Wishlist</a>
            <a href="#">Download</a>
          </div>
        </div>

        <div className="nav-right">
          <span onClick={() => navigate("/notifications")} className="notification_icon">
            🔔
          </span>
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
                <div>
                  <h1 className="username">Welcome, {user.username}</h1>
                  <p className="useremail">Email: {user.email}</p>
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
                <div className="detail-value">₹{game.price}</div>
              </div>
            </div>

            {/* Buy Section */}
            <div className="buy-section">
              <button className="buy-button">Buy Now ₹{game.price}</button>
              <button className="wishlist-button">❤️</button>
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
    </div>
  );
};

export default GamePage;
