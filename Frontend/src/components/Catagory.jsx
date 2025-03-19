import React, { useState, useEffect } from 'react';
import '../styles/Catagory.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/arcade_alley_logo.png';
import SearchBar from './Searchbar';
import axios from "axios";

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
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);
    const [savingSpotlight, setSavingSpotlight] = useState([]);
    const [discoverNew, setDiscoverNew] = useState([]);
    const [mostPopular, setMostPopular] = useState([]);
    const [visibleDiscover, setVisibleDiscover] = useState(6);
    const [visibleSpotlight, setVisibleSpotlight] = useState(6);
    const [visiblePopular, setVisiblePopular] = useState(6);

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
        { id: 1, title: "EA SPORTS FCT™ 24 Standard Edition", price: "₹1,599.60", imageUrl: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118324/tihfukuhizvkwpu0lrsw.png", discount: "60%" },
        { id: 2, title: "Marvel’s Spider-Man 2", price: "₹3,999", imageUrl: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740168767/image20_tq2dmu.png" },
        { id: 3, title: "Kingdom Come: Deliverance II", price: "₹3,360", imageUrl: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740168768/image21_xlpkxr.png" },
        { id: 4, title: "Sid Meier's Civilization® VII", price: "₹3,999", imageUrl: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740168767/image22_ldfqqm.png" },
        { id: 1, title: "EA SPORTS™ Madden NFL 25", price: "₹1,199.70", imageUrl: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740168768/image23_qnma9l.png", discount: "70%" },
        { id: 2, title: "Black Myth: Wukong", price: "₹3,599", imageUrl: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740168768/image24_rnmhlz.png" }
    ];

    const SavingSpotlight = [
        { id: 1, title: 'Dying Light 2 + Brecken + Rais Bundles', price: '₹1,158', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118322/fp9hmxdwo64po9s7a8u6.png", discount: "60%" },
        { id: 2, title: 'Tiny Tinas Wonderlands Chaotic Great Edition', price: '₹798', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118323/ut917gaf22nqcbmkwz11.png", discount: "80%" },
        { id: 3, title: 'Borderlands 3: Ultimate Edition', price: ' ₹1,255', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118323/dgbqmamjjfmekvpsivv1.png", discount: "75%" },
        { id: 4, title: 'Marvels Midnight Suns Legendary Edition', price: '₹1,424', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118320/ize6trkemrn0xdegtwxr.png", discount: "75%" },
        { id: 5, title: 'Goat Simulator 3', price: '₹520', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118323/tdihouenei5kqzn7pcr6.png", discount: "65%" },
        { id: 6, title: 'Tony Hawks™ Pro Skater™ 1 +2', price: ' ₹884.10', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118323/syijluveutafcayvgevd.png", discount: "60%" },
    ];

    const MostPopular = [
        { id: 1, title: 'Grand Theft Auto V: Premium Edition', price: '₹2,321.44', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118321/dnggn7nfiwr9iopsq3ho.png" },
        { id: 2, title: 'VALORANT', price: '₹ Free', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118322/amgfdsiyg0yph7aoezte.png" },
        { id: 3, title: 'The Last Stand: Aftermath', price: ' ₹589', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118324/aseazclmnulkejgizjyo.png" },
        { id: 4, title: 'EA SPORTS FCT™ 24 Standard Edition', price: '₹1,199', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118324/tihfukuhizvkwpu0lrsw.png" },
        { id: 5, title: 'Satisfactory', price: '₹1,600', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118324/becudv5d8ajzvyapot7v.png" },
        { id: 6, title: 'Farming Simulator 22', price: ' ₹1,559', image: "https://res.cloudinary.com/drno4r3vd/image/upload/v1740118321/uhvtwkenynbvtynqdlgo.png" },
    ];

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

                const sortedByPopularity = [...fetchedGames].sort((a, b) => b.popularityScore - a.popularityScore);
                setMostPopular(sortedByPopularity.slice(0, 6));
            })
            .catch(error => {
                console.error("Error fetching games:", error);
                setLoading(false);
            });
    }, []);

    const loadMoreDiscover = () => setVisibleDiscover(prev => prev + 6);
    const loadMoreSpotlight = () => setVisibleSpotlight(prev => prev + 6);
    const loadMorePopular = () => setVisiblePopular(prev => prev + 6);

    // Loading Spinner Component
    const LoadingSpinner = () => (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading games...</p>
        </div>
    );

    return (
        <>
            <div className="game-store1">
                <div className="upper1">
                    <nav className="sidebar">
                        <div className="logo">
                            <img src={logo} alt="Arcade Alley" />
                        </div>
                        <a className="sidebarItem" onClick={() => navigate("/home")}>🏠 Home</a>
                        <a className="sidebarItem" onClick={() => navigate("/catagory")}>📁 Category</a>
                        <a className="sidebarItem" onClick={() => navigate("/login")}>👥 Community</a>
                        <a className="sidebarItem" onClick={() => navigate("/login")}>👫 Friends</a>
                        <a className="sidebarItem">❤️ Wishlist</a>
                        <a className="sidebarItem" onClick={() => navigate("/login")}>⬇️ Download</a>
                        <a className="sidebarItem">⚙️ Setting</a>
                    </nav>

                    <main className="main-content">
                        <div className='main-content'>
                            <header className="header">
                                <SearchBar />
                                <div className="auth-buttons">
                                    <Link to="/login"><button>Login</button></Link>
                                    <Link to="/signup"><button>Signup</button></Link>
                                </div>
                            </header>

                            <section className="popular-section">
                                <div className="section-header">
                                    <h2 className="heading-secondary">Popular Genres</h2>
                                    <div className="carouselControls">
                                        <button className="controlButton">←</button>
                                        <button className="controlButton">→</button>
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
                        </div>
                    </main>
                </div>

                <div className="carouselHeader">
                    <h2>New Released</h2>
                    <div className="carouselControls">
                        <button className="controlButton">←</button>
                        <button className="controlButton" onClick={loadMoreDiscover}>→</button>
                    </div>
                </div>
                {loading ? (
                    <LoadingSpinner />
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
                        <button className="controlButton" onClick={loadMoreSpotlight}>→</button>
                    </div>
                </div>
                {loading ? (
                    <LoadingSpinner />
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
                    <LoadingSpinner />
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
            </div>
        </>
    );
};

export default GameStore;