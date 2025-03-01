import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader"; // Import Loader component
import "../styles/Searchbar.css"; // External CSS for styling

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [navigating, setNavigating] = useState(false); // New state for navigation loading
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      if (!searchTerm.trim()) {
        setGames([]);
        setShowDropdown(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://arcade-array.onrender.com/api/games/search?query=${searchTerm}`
        );
        const data = await response.json();

        if (response.ok) {
          setGames(data);
          setShowDropdown(true);
        } else {
          setGames([]);
          setError(data.message);
        }
      } catch (err) {
        console.error("Error fetching games:", err);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(fetchGames, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-container")) {
        setShowDropdown(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
  const handleGameClick = (game) => {
    setNavigating(true); // Show full-screen loader when navigating
    setShowDropdown(false);

    setTimeout(() => {
      navigate(`/game/${game._id}`, { state: game });
      setNavigating(false); // Hide loader after navigation
    }, 500);
  };

  return (
    <div className="search-container">
      {/* Full-Screen Loader when navigating */}
      {navigating && (
        <div className="full-screen-loader">
          <Loader />
        </div>
      )}

      {/* Search Input */}
      <input
        type="text"
        className="search-input"
        placeholder="Search games..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowDropdown(true)}
      />

      {/* Error Message */}
      {error && <p className="search-message error">{error}</p>}

      {/* Search Results Dropdown */}
      {showDropdown && !loading && !navigating && games.length > 0 && (
        <div className="search-dropdown">
          {games.map((game) => (
            <div
              key={game._id}
              className="search-result"
              onClick={() => handleGameClick(game)}
            >
              <img
                src={game.imageUrl || "https://via.placeholder.com/50"}
                alt={game.name}
                className="search-result-img"
              />
              <span className="search-result-name">{game.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
