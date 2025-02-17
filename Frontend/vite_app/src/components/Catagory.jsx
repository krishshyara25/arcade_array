import React from 'react';
import '../styles/Catagory.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/arcade_alley_logo.png';

import img5 from '../assets/image5.png';
import img6 from '../assets/image6.png';
import img7 from '../assets/image7.png';
import img8 from '../assets/image8.png';
import img9 from '../assets/image9.png';
import img10 from '../assets/image10.png';
import img11 from '../assets/image11.png';
import img12 from '../assets/image12.png';
import img13 from '../assets/image13.png';

const GameStore = () => {
    const navigate = useNavigate();

    const popularGames = [
        {
            id: 1,
            category: "Action Games",
            games: [
                { id: 1, title: "Game 1", price: "$29.99", imageUrl: img5 },
                { id: 2, title: "Game 2", price: "$39.99", imageUrl: img6 },
                { id: 3, title: "Game 3", price: "$19.99", imageUrl: img7 }
            ]
        },
        {
            id: 2,
            category: "Action-Adventure Games",
            games: [
                { id: 4, title: "Game 4", price: "$49.99", imageUrl: img8 },
                { id: 5, title: "Game 5", price: "$34.99", imageUrl: img9 },
                { id: 6, title: "Game 6", price: "$34.99", imageUrl: img10 },
            ]
        },
        {
            id: 3,
            category: "Adventure Games",
            games: [
                { id: 7, title: "Game 7", price: "$49.99", imageUrl: img11 },
                { id: 8, title: "Game 8", price: "$34.99", imageUrl: img12 },
                { id: 9, title: "Game 9", price: "$34.99", imageUrl: img13 },
            ]
        }
    ];

    const newReleases = [
        { id: 1, title: "New Game 1", price: "$59.99", imageUrl: img10, discount: "30%" },
        { id: 2, title: "New Game 2", price: "$49.99", imageUrl: img11 },
        { id: 3, title: "New Game 3", price: "$39.99", imageUrl: img12 },
        { id: 4, title: "New Game 4", price: "$29.99", imageUrl: img13 },
        { id: 1, title: "New Game 1", price: "$59.99", imageUrl: img10, discount: "30%" },
        { id: 2, title: "New Game 2", price: "$49.99", imageUrl: img11 },
        { id: 3, title: "New Game 3", price: "$39.99", imageUrl: img12 },
        { id: 4, title: "New Game 4", price: "$29.99", imageUrl: img13 }
    ];


    return (
        <div className="game-store">
            {/* Sidebar */}
            <nav className="sidebar">
                <div className="logo">
                    <img src={logo} alt="Arcade Alley" />
                </div>
                <a href="#" className="sidebarItem" onClick={() => navigate("/home")}>🏠 Home</a>
                <a href="#" className="sidebarItem" onClick={() => navigate("/catagory")}>📁 Category</a>
                <a href="#" className="sidebarItem" onClick={() => navigate("/login")}>👥 Community</a>
                <a href="#" className="sidebarItem" onClick={() => navigate("/friends")}>👫 Friends</a>
                <a href="#" className="sidebarItem">❤️ Wishlist</a>
                <a href="#" className="sidebarItem" onClick={() => navigate("/login")}>⬇️ Download</a>
                <a href="#" className="sidebarItem">⚙️ Setting</a>
            </nav>

            {/* Main Content */}
            <main className="main-content">
                {/* Header */}
                <header className="header">
                    <div className="searchBar">
                        <input type="text" placeholder="Search" className="searchInput" />
                    </div>
                    <div className="auth-buttons">
                        <Link to="/login">
                            <button>Login</button>
                        </Link>
                        <Link to="/signup">
                            <button>Signup</button>
                        </Link>
                    </div>
                </header>

                {/* Popular Games Section */}
                <section className="popular-section">
                    <div className="section-header">
                        <h2 className="heading-secondary">Popular Games</h2>
                        <div className="navigation-arrows">
                            <button>&lt;</button>
                            <button>&gt;</button>
                        </div>
                    </div>

                    <div className="categories-grid">
                        {popularGames.map(category => (
                            <div key={category.id} className="category-card">
                                <div className="category-images">
                                    {category.games.map(game => (
                                        <img key={game.id} src={game.imageUrl} alt={game.title} className="category-image" />
                                    ))}
                                </div>
                                <div className="category-name">{category.category}</div>
                            </div>
                        ))}
                    </div>

                    

                </section>

                {/* New Releases Section */}
                <section className="new-releases">
                    <div className="section-header">
                        <h2 className="heading-secondary">New Released</h2>
                        <div className="navigation-arrows">
                            <button>&lt;</button>
                            <button>&gt;</button>
                        </div>
                    </div>

                    <div className="games-horizontal">
                        {newReleases.map(game => (
                            <div key={game.id} className="game-card">
                                <div className="game-image">
                                    <img src={game.imageUrl} alt={game.title} />
                                    {game.discount && <span className="discount">-{game.discount}</span>}
                                </div>
                                <h3 className="subheading">{game.title}</h3>
                                <p className="price">{game.price}</p>
                            </div>
                        ))}
                    </div>
                </section>

               
            </main>
        </div>
    );
};

export default GameStore;
