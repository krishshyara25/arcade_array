import React, { useState, useEffect, useRef } from "react";
import "../styles/Searchbar.css"; // Import external CSS

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchGames = async () => {
      if (!searchTerm.trim()) {
        setGames([]);
        setIsOpen(false);
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
          setIsOpen(true);
        } else {
          setGames([]);
          setError(data.message);
          setIsOpen(false);
        }
      } catch (err) {
        console.error("Error fetching games:", err);
        setError("Something went wrong.");
        setIsOpen(false);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(fetchGames, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-container" ref={dropdownRef}>
      {/* Search Input */}
      <input
        type="text"
        className="search-input"
        placeholder="Search games..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Dropdown Results */}
      {isOpen && (
        <div className="search-dropdown">
          {loading && <p className="search-message">Loading...</p>}
          {error && <p className="search-error">{error}</p>}

          {games.length > 0 ? (
            games.map((game) => (
              <div key={game._id} className="search-result">
                {/* Game Image */}
                <img
                  src={game.imageUrl || "https://via.placeholder.com/50"}
                  alt={game.name}
                  className="search-game-image"
                />
                <span className="search-game-title">{game.name}</span>
              </div>
            ))
          ) : (
            <p className="search-message">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
