import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Searchbar.css"; // External CSS for styling

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const handleGameClick = (game) => {
    navigate(`/game/${game._id}`, { state: game });
    setShowDropdown(false);
  };

  return (
    <div className="search-container">
      {/* Search Input */}
      <input
        type="text"
        className="search-input"
        placeholder="Search games..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowDropdown(true)}
      />

      {/* Loading & Error Messages */}
      {loading && <p className="search-message">Loading...</p>}
      {error && <p className="search-message error">{error}</p>}

      {/* Search Results Dropdown */}
      {showDropdown && games.length > 0 && (
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
