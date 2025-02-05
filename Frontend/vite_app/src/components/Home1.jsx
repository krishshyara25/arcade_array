// import React, { useState, useEffect } from 'react';
// import '../styles/Home1.css';
// import { useNavigate } from "react-router-dom";
import logo from '../assets/arcade_alley_logo.png';
import img1 from '../assets/wp1854784-the-witcher-3-wallpapers.png'
import img2 from '../assets/wp9549839.png';
import img3 from '../assets/tankhead-c7n4p.png'
import img4 from '../assets/image2.png'
import img5 from '../assets/image5.png'
import img6 from '../assets/image6.png'
import img7 from '../assets/image7.png'
import img8 from '../assets/image8.png'
import img9 from '../assets/image9.png'
import img10 from '../assets/image10.png'
import img11 from '../assets/image11.png'
import img12 from '../assets/image12.png'
import img13 from '../assets/image13.png'
import img14 from '../assets/image14.png'
import img15 from '../assets/image15.png'
import img16 from '../assets/image16.png'
import img17 from '../assets/image17.png'
import img18 from '../assets/image18.png'



// const GameStore = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const onlineFriends = [
//     { name: "Quantum spectre55", email: "quantums@gmail.com", status: "online", avatar: "/avatar1.jpg" },
//     { name: "Crimsontiger69", status: "online", game: "Resident Evil 4", avatar: "/avatar2.jpg", action: "Join" },
//     { name: "Stealth_sniper", status: "online", game: "Fortnite", avatar: "/avatar3.jpg", action: "Playing" },
//     { name: "IceDragon", status: "online", game: "Roblox", avatar: "/avatar4.jpg", action: "Playing" },
//     { name: "Blitzxcreag86", status: "online", game: "EA Sports FC 2024", avatar: "/avatar5.jpg", action: "Join" },
//     { name: "phenix_rising", status: "online", game: "Rocket league", avatar: "/avatar6.jpg", action: "Playing" },
//     { name: "noenNova", status: "online", game: "GTA 5", avatar: "/avatar7.jpg", action: "Playing" }
//   ];

//   const discoverGames = [
//     { title: "TankHead", price: "₹1,300", image: "/tankhead.jpg" },
//     { title: "EA SPORTS FC™ 25 Standard Edition", price: "₹3,999", image: "/fc25.jpg" },
//     { title: "Warhammer 40,000: Space Marine 2", price: "₹2,799", image: "/warhammer.jpg" },
//     { title: "Squirrel with a Gun", price: "₹719", image: "/squirrel.jpg" },
//     { title: "Wild Bastards", price: "₹1,249", image: "/wild-bastards.jpg" }
//   ];

//   const recentlyPlayed = [
//     { title: "Grand Theft Auto V", progress: "72%", image: "/gtav.jpg" },
//     { title: "Farming Simulator 22", progress: "52%", image: "/farming-sim.jpg" },
//     { title: "VALORANT", progress: "84%", image: "/valorant.jpg" },
//     { title: "The Witcher 3 Wild Hunt", progress: "12%", image: "/witcher3.jpg" }
//   ];


//   useEffect(() => {
//     // Fetch the user details after login
//     const fetchUserDetails = async () => {
//       const userId = JSON.parse(localStorage.getItem('user'))?.userId; // Assuming the user data is saved in localStorage
//       if (userId) {
//         try {
//           // Use the correct API endpoint to fetch user details
//           const response = await fetch(`https://arcade-array.onrender.com/api/games/user/details/${userId}`);
//           const data = await response.json();
          
//           // Handle errors if any
//           if (response.ok) {
//             setUser(data); // Set the user data in state
//           } else {
//             console.error('Error fetching user data:', data.message);
//           }
//         } catch (error) {
//           console.error('Error fetching user details:', error);
//         }
//       } else {
//         console.log('No userId found in localStorage');
//       }
//     };

//     fetchUserDetails();
//   }, []);


//   return (
//     <div className="game-store1">
      
//       <div className="poster">
//       <nav className="sidebar">
        // <div className="logo">
        //   <img src={logo} alt="Arcade Alley" />
        // </div>
//         <ul className="nav-menu">
//           <li className="active" onClick={() => navigate("/home1")}><span className="icon">🏠</span>Home</li>
//           <li><span className="icon" >📑</span>Category</li>
//           <li><span className="icon">👥</span>Community</li>
//           <li onClick={() => navigate("/friends")}><span className="icon" >👤</span>Friends</li>
//           <li><span className="icon">❤️</span>Wishlist</li>
//           <li><span className="icon">⬇️</span>Download</li>
//           <li><span className="icon">⚙️</span>Setting</li>
//         </ul>
//       </nav>

//       <main className="main-content">
//         <header className="top-bar">
//           <div className="search-box">
//             <span className="search-icon">🔍</span>
//             <input type="text" placeholder="Search" />
//           </div>
//           <div className="user-profile">
//             <div className="notification-bell">🔔</div>
//             <div className="user-avatar">
//               <img src={img2} alt="User Profile" />
//             </div>
//             {user && (
//                 <div className="user-info">
//                   <p className="username">{user.username}</p>
//                   <p className="email">{user.email}</p>
//                 </div>
//               )}
//           </div>
//         </header>

//         <section className="hero-section">
//           <div className="hero-content">
//             <h1>The Witcher 3</h1>
//             <p>The most awarded game of a generation, now enhanced for the next!</p>
//             <div className="hero-actions">
//               <button className="buy-now">Buy Now ₹1,163</button>
//               <button className="wishlist-btn">❤️</button>
//             </div>
//           </div>
//         <div className="game-image">
//             <img src={img1} />
//         </div>
//         </section>

//          <section className="game-section">
//                   <div className="section-header">
//                     <h2>Discover something new</h2>
//                     <div className="navigation-arrows">
//                       <button className="arrow-left">←</button>
//                       <button className="arrow-right">→</button>
//                     </div>
//                   </div>
//                   <div className="game-grid">
//                     {discoverGames.map((game, index) => (
//                       <div key={index} className="game-card">
//                         <img src={img3} alt={game.title} />
//                         <h3>{game.title}</h3>
//                         <p>{game.price}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </section>
//       </main>
//       <aside className="right-sidebar">
//         <section className="friends-online">
//           <div className="section-header">
//             <h2>Friends Online</h2>
//             <span className="online-count">{onlineFriends.length}</span>
//           </div>
//           <div className="friends-list">
//             {onlineFriends.map((friend, index) => (
//               <div key={index} className="friend-item">
//                 <div className="friend-avatar">
//                   <img src={img2} alt={friend.name} />
//                   <span className="online-indicator"></span>
//                 </div>
//                 <div className="friend-details">
//                   <h4>{friend.name}</h4>
//                   <p>{friend.game || friend.email}</p>
//                 </div>
//                 {friend.action && (
//                   <button className={`friend-action ${friend.action.toLowerCase()}`}>
//                     {friend.action}
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="recently-played">
//           <div className="section-header">
//             <h2>Recently Played</h2>
//             <button className="more-options">•••</button>
//           </div>
//           <div className="recent-games">
//             {recentlyPlayed.map((game, index) => (
//               <div key={index} className="recent-game">
//                 <img src={img4} alt={game.title} />
//                 <div className="game-progress">
//                   <h4>{game.title}</h4>
//                   <div className="progress-bar">
//                     <div 
//                       className="progress" 
//                       style={{width: game.progress}}
//                     ></div>
//                   </div>
//                   <span className="progress-text">{game.progress}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </aside>
//       </div>

      
//     </div>
//   );
// };

// export default GameStore;






















import React from 'react';
import '../styles/Home1.css'
const GamingPlatform = () => {
  const styles = {
    container: {
      // display: 'flex',
      minHeight: '180vh',
      backgroundColor: '#1a1a1a',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
    },
    upper: {
      display: 'flex',
      minHeight: '90vh',
      backgroundColor: '#1a1a1a',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
    },
    sidebar: {
      width: '200px',
      backgroundColor: '#2d2d3a',
      padding: '20px',
    },
    sidebarItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px',
      color: 'white',
      textDecoration: 'none',
      marginBottom: '10px',
      fontSize: '14px',
    },
    mainContent: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    searchBar: {
      flex: 1,
      maxWidth: '600px',
      margin: '0 20px',
      position: 'relative',
    },
    searchInput: {
      width: '100%',
      padding: '10px 40px',
      borderRadius: '20px',
      border: 'none',
      backgroundColor: '#e0e0e0',
      fontSize: '16px',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: '#4a90e2',
      fontSize: '20px',
    },
    featuredGame: {
      position: 'relative',
      borderRadius: '10px',
      overflow: 'hidden',
      marginBottom: '30px',
    },
    featuredImage: {
      width: '100%',
      height: '500px',
      objectFit: 'cover',
    },
    featuredInfo: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '20px',
      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
      display : 'flex',
      gap : '140px'

    },
    buyButton: {
      backgroundColor: '#ff5722',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
    },
    gameCarousel: {
      marginleft: '20px',
      padding:'30px'

    },
    carouselHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
    },
    carouselControls: {
      display: 'flex',
      gap: '10px',
    },
    controlButton: {
      backgroundColor: '#404040',
      border: 'none',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: 'white',
    },
    gameGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '20px',
    },
    gameCard: {
      backgroundColor: '#2d2d3a',
      borderRadius: '10px',
      width:'14vw',
      overflow: 'hidden',
    },
    gameCardImage: {
      width: '14vw',
      height: '275px',
      objectFit: 'cover',
    },
    gameCardInfo: {
      padding: '10px',
    },
    price: {
      color: '#4a90e2',
      fontWeight: 'bold',
    },
    friendsSection: {
      width: '250px',
      backgroundColor: '#2d2d3a',
      padding: '20px',
    },
    friendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '10px',
    },
    onlineStatus: {
      width: '8px',
      height: '8px',
      backgroundColor: '#4caf50',
      borderRadius: '50%',
    },
    gameStatus: {
      backgroundColor: '#404040',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
    },
    recentlyPlayed: {
      marginTop: '20px',
    },
    progressBar: {
      width: '100%',
      height: '4px',
      backgroundColor: '#404040',
      borderRadius: '2px',
      marginTop: '5px',
    },
    progress: {
      height: '100%',
      backgroundColor: '#4caf50',
      borderRadius: '2px',
    },
  };

  const gameData = [
    { id: 1, title: 'TankHead', price: '₹1,300', image: img3},
    { id: 2, title: 'EA SPORTS FC™ 25', price: '₹3,999', image: img4 },
    { id: 3, title: 'Space Marine 2', price: '₹2,799', image: img5},
    { id: 4, title: 'Squirrel with a Gun', price: '₹719', image: img6 },
    { id: 5, title: 'Wild Bastards', price: '₹1,249', image: img7 },
    { id: 6, title: 'VALORANT', price: '₹ Free', image: img8 },
  ];

  const gameData1 = [
    { id: 1, title: 'Dying Light 2 + Brecken + Rais Bundles', price: '₹1,158', image: img9},
    { id: 2, title: 'Tiny Tinas Wonderlands Chaotic Great Edition', price: '₹798', image: img10},
    { id: 3, title: 'Borderlands 3: Ultimate Edition', price: ' ₹1,255', image: img11},
    { id: 4, title: 'Marvels Midnight Suns Legendary Edition', price: '₹1,424', image: img12},
    { id: 5, title: 'Goat Simulator 3', price: '₹520', image: img13},
    { id: 6, title: 'Tony Hawks™ Pro Skater™ 1 +2', price: ' ₹884.10', image: img14},
  ];

  const gameData2 = [
    { id: 1, title: 'Dying Light 2 + Brecken + Rais Bundles', price: '₹1,158', image: img2},
    { id: 2, title: 'Tiny Tinas Wonderlands Chaotic Great Edition', price: '₹798', image: img8},
    { id: 3, title: 'Borderlands 3: Ultimate Edition', price: ' ₹1,255', image: img15},
    { id: 4, title: 'Marvels Midnight Suns Legendary Edition', price: '₹1,424', image: img16},
    { id: 5, title: 'Goat Simulator 3', price: '₹520', image: img17},
    { id: 6, title: 'Tony Hawks™ Pro Skater™ 1 +2', price: ' ₹884.10', image: img18},
  ];

  const recentlyPlayed = [
    { title: 'Grand Theft Auto V', progress: 72 },
    { title: 'Farming Simulator 22', progress: 22 },
    { title: 'VALORANT', progress: 91 },
    { title: 'The Witcher 3 Wild Hunt', progress: 12 },
  ];

  return (
    <>
    <div style={styles.container}>
      <div style={styles.upper}>
      {/* Sidebar */}
      <nav style={styles.sidebar}>
        <div style={styles.logo}>
        <div className="logo">
          <img src={logo} alt="Arcade Alley" />
        </div>
        </div>
        <a href="#" style={styles.sidebarItem}>🏠 Home</a>
        <a href="#" style={styles.sidebarItem}>📁 Category</a>
        <a href="#" style={styles.sidebarItem}>👥 Community</a>
        <a href="#" style={styles.sidebarItem}>👫 Friends</a>
        <a href="#" style={styles.sidebarItem}>❤️ Wishlist</a>
        <a href="#" style={styles.sidebarItem}>⬇️ Download</a>
        <a href="#" style={styles.sidebarItem}>⚙️ Setting</a>
      </nav>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <div style={styles.searchBar}>
            <input type="text" placeholder="Search" style={styles.searchInput} />
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span>🔔</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={img2} style={{ borderRadius: '50%' }} alt="Profile" />
              <span>quantums@gmail.com</span>
            </div>
          </div>
        </header>

        {/* Featured Game */}
        <div style={styles.featuredGame}>
          <img src={img1} alt="The Witcher 3" style={styles.featuredImage} />
          <div style={styles.featuredInfo}>
            <div>
              <h1>The Witcher 3</h1>
              <p>The most awarded game of a generation, now enhanced for the next!</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '20px' , gap: '30px' }}>
              <button style={styles.buyButton}>Buy Now ₹1,163</button>
              <button style={{ ...styles.controlButton, backgroundColor: '#2d2d3a' }}>❤️</button>
            </div>
          </div>
        </div>

        
      </main>

      {/* Friends & Recently Played Section */}
      <aside style={styles.friendsSection}>
        <h2>Friends Online</h2>
        {['Crimsontiger69', 'St3alth_sniper', 'IceDragon', 'Blitzcreag66', 'phenix_rising', 'noenNova'].map(friend => (
          <div key={friend} style={styles.friendItem}>
            <div style={styles.onlineStatus}></div>
            <div>
              <div>{friend}</div>
              <div style={styles.gameStatus}>Playing Fortnite</div>
            </div>
          </div>
        ))}

        <div style={styles.recentlyPlayed}>
          <h2>Recently Played</h2>
          {recentlyPlayed.map(game => (
            <div key={game.title} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{game.title}</span>
                <span>{game.progress}%</span>
              </div>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progress, width: `${game.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </aside>
      </div>

      {/* Game Carousel */}
    <div style={styles.gameCarousel}>
          <div style={styles.carouselHeader}>
            <h2>Discover something new</h2>
            <div style={styles.carouselControls}>
              <button style={styles.controlButton}>←</button>
              <button style={styles.controlButton}>→</button>
            </div>
          </div>
          <div style={styles.gameGrid}>
            {gameData.map(game => (
              <div key={game.id} style={styles.gameCard}>
                <img src={game.image} alt={game.title} style={styles.gameCardImage} />
                <div style={styles.gameCardInfo}>
                  <h3>{game.title}</h3>
                  <p style={styles.price}>{game.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.carouselHeader}>
            <h2>Saving Spotlight</h2>
            <div style={styles.carouselControls}>
              <button style={styles.controlButton}>←</button>
              <button style={styles.controlButton}>→</button>
            </div>
          </div>
          <div style={styles.gameGrid}>
            {gameData1.map(game => (
              <div key={game.id} style={styles.gameCard}>
                <img src={game.image} alt={game.title} style={styles.gameCardImage} />
                <div style={styles.gameCardInfo}>
                  <h3>{game.title}</h3>
                  <p style={styles.price}>{game.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.carouselHeader}>
            <h2>Most Popular</h2>
            <div style={styles.carouselControls}>
              <button style={styles.controlButton}>←</button>
              <button style={styles.controlButton}>→</button>
            </div>
          </div>
          <div style={styles.gameGrid}>
            {gameData2.map(game => (
              <div key={game.id} style={styles.gameCard}>
                <img src={game.image} alt={game.title} style={styles.gameCardImage} />
                <div style={styles.gameCardInfo}>
                  <h3>{game.title}</h3>
                  <p style={styles.price}>{game.price}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

    </div>
    
    </>
  );
};

export default GamingPlatform;




















// // GamingPlatform.jsx
// import React from 'react';
// import '../styles/home1.css';
// import logo from '../assets/arcade_alley_logo.png';
// import img1 from '../assets/wp1854784-the-witcher-3-wallpapers.png';
// import img2 from '../assets/wp9549839.png';
// import img3 from '../assets/tankhead-c7n4p.png';
// import img4 from '../assets/image2.png';
// import img5 from '../assets/image5.png';
// import img6 from '../assets/image6.png';
// import img7 from '../assets/image7.png';
// import img8 from '../assets/image8.png';

// const GamingPlatform = () => {
//   const gameData = [
//     { id: 1, title: 'TankHead', price: '₹1,300', image: img3 },
//     { id: 2, title: 'EA SPORTS FC™ 25', price: '₹3,999', image: img4 },
//     { id: 3, title: 'Space Marine 2', price: '₹2,799', image: img5 },
//     { id: 4, title: 'Squirrel with a Gun', price: '₹719', image: img6 },
//     { id: 5, title: 'Wild Bastards', price: '₹1,249', image: img7 },
//     { id: 6, title: 'VALORANT', price: '₹ Free', image: img8 },
//   ];

//   const recentlyPlayed = [
//     { title: 'Grand Theft Auto V', progress: 72 },
//     { title: 'Farming Simulator 22', progress: 22 },
//     { title: 'VALORANT', progress: 91 },
//     { title: 'The Witcher 3 Wild Hunt', progress: 12 },
//   ];

//   return (
//     <div className="container">
//       <div className="upper">
//         {/* Sidebar */}
//         <nav className="sidebar">
//           <img src={logo} alt="Arcade Alley" className="logo" />
//           <a href="#" className="sidebar-item">🏠 Home</a>
//           <a href="#" className="sidebar-item">📁 Category</a>
//           <a href="#" className="sidebar-item">👥 Community</a>
//           <a href="#" className="sidebar-item">👫 Friends</a>
//           <a href="#" className="sidebar-item">❤️ Wishlist</a>
//           <a href="#" className="sidebar-item">⬇️ Download</a>
//           <a href="#" className="sidebar-item">⚙️ Setting</a>
//         </nav>

//         {/* Main Content */}
//         <main className="main-content">
//           <header className="header">
//             <input type="text" placeholder="Search" className="search-input" />
//             <div className="profile-section">
//               <img src={img2} className="profile-pic" alt="Profile" />
//               <span>quantums@gmail.com</span>
//             </div>
//           </header>

//           {/* Featured Game */}
//           <div className="featured-game">
//             <img src={img1} alt="The Witcher 3" className="featured-image" />
//             <div className="featured-info">
//               <h1>The Witcher 3</h1>
//               <p>The most awarded game of a generation, now enhanced for the next!</p>
//               <button className="buy-button">Buy Now ₹1,163</button>
//             </div>
//           </div>
//         </main>

//         {/* Friends & Recently Played Section */}
//         <aside className="friends-section">
//           <h2>Friends Online</h2>
//           {['Crimsontiger69', 'St3alth_sniper', 'IceDragon', 'Blitzcreag66', 'phenix_rising', 'noenNova'].map(friend => (
//             <div key={friend} className="friend-item">
//               <div className="online-status"></div>
//               <div>
//                 <div>{friend}</div>
//                 <div className="game-status">Playing Fortnite</div>
//               </div>
//             </div>
//           ))}

//           <div className="recently-played">
//             <h2>Recently Played</h2>
//             {recentlyPlayed.map(game => (
//               <div key={game.title} className="recent-game">
//                 <div className="recent-game-header">
//                   <span>{game.title}</span>
//                   <span>{game.progress}%</span>
//                 </div>
//                 <div className="progress-bar">
//                   <div className="progress" style={{ width: `${game.progress}%` }}></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default GamingPlatform;
