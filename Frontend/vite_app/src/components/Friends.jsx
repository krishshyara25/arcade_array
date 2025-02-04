// import React, { useState, useEffect } from 'react';
// import '../styles/Friends.css';
// import { useNavigate } from "react-router-dom";
// import img from '../assets/arcade_alley_logo.png';

// const Friends = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     fetch("https://arcade-array.onrender.com/api/friends/users")
//       .then(response => response.json())
//       .then(data => setUsers(data))
//       .catch(error => console.error("Error fetching users:", error));
//   }, []);

//   // Filter users based on search input
//   const filteredUsers = users.filter(user =>
//     user.username.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="app">
//       <header className="header">
//         <div className="logo-container">
//           <img src={img} alt="Arcade Alley Logo" className="logo" />
//         </div>
//         <div className="user-info">
//           <i className="fas fa-bell icon"></i>
//           <div className="user-details">
//             <img
//               src="https://storage.googleapis.com/a1aa/image/Se4YuxzXWjWgSMiSPiTFipzgOdzgPYEaBdTA5j98Xkw.jpg"
//               alt="User Avatar"
//               className="avatar"
//             />
//             <div>
//               <p>Quantum spectre55</p>
//               <p>quantums@gmail.com</p>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="main">
//         <button className="back-button" onClick={() => navigate("/home1")}>
//           <i className="fas fa-arrow-left"></i> Back
//         </button>

//         <div className="search-container">
//           <input
//             type="text"
//             placeholder="Search profile"
//             className="search-input"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button className="search-button">
//             <i className="fas fa-search"></i>
//           </button>
//         </div>

//         <div className="tabs">
//           <button className="tab search-tab">Search</button>
//           <button className="tab friends-tab">Friends</button>
//         </div>

//         <div className="friends-list">
//           {filteredUsers.length > 0 ? (
//             filteredUsers.map((user, index) => (
//               <div key={index} className="friend-item">
//                 <div className="friend-info">
//                   <img
//                     src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
//                     alt={`${user.username} Avatar`}
//                     className="friend-avatar"
//                   />
//                   <span className="friend-name">{user.username}</span>
//                 </div>
//                 <div className="friend-actions">
//                   <i className="fas fa-user-plus"></i>
//                   <i className="fas fa-ellipsis-h"></i>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No users found</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Friends;
















import React, { useState, useEffect } from 'react';
import '../styles/Friends.css';
import { useNavigate } from "react-router-dom";
import img from '../assets/arcade_alley_logo.png';

const Friends = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // All users for searching
  const [friendsList, setFriendsList] = useState([]); // Friends of the logged-in user
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("search"); // Track active tab ('search' or 'friends')

  useEffect(() => {
    // Fetch all users for search
    fetch("https://arcade-array.onrender.com/api/friends/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    // Fetch user's friends when 'friends' tab is active
    if (activeTab === "friends") {
      fetch("https://arcade-array.onrender.com/api/friends/search?query={krish}") // Replace with your actual API endpoint
        .then(response => response.json())
        .then(data => setFriendsList(data))
        .catch(error => console.error("Error fetching friends:", error));
    }
  }, [activeTab]);

  // Filter users based on search input
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <div className="logo-container">
          <img src={img} alt="Arcade Alley Logo" className="logo" />
        </div>
        <div className="user-info">
          <i className="fas fa-bell icon"></i>
          <div className="user-details">
            <img
              src="https://storage.googleapis.com/a1aa/image/Se4YuxzXWjWgSMiSPiTFipzgOdzgPYEaBdTA5j98Xkw.jpg"
              alt="User Avatar"
              className="avatar"
            />
            <div>
              <p>Quantum spectre55</p>
              <p>quantums@gmail.com</p>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <button className="back-button" onClick={() => navigate("/home1")}>
          <i className="fas fa-arrow-left"></i> Back
        </button>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search profile"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="tabs">
          <button
            className={`tab search-tab ${activeTab === "search" ? "active" : ""}`}
            onClick={() => setActiveTab("search")}
          >
            Search
          </button>
          <button
            className={`tab friends-tab ${activeTab === "friends" ? "active" : ""}`}
            onClick={() => setActiveTab("friends")}
          >
            Friends
          </button>
        </div>

        <div className="friends-list">
          {activeTab === "search" ? (
            // Display filtered users for search
            filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <div key={index} className="friend-item">
                  <div className="friend-info">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
                      alt={`${user.username} Avatar`}
                      className="friend-avatar"
                    />
                    <span className="friend-name">{user.username}</span>
                  </div>
                  <div className="friend-actions">
                    <i className="fas fa-user-plus"></i>
                    <i className="fas fa-ellipsis-h"></i>
                  </div>
                </div>
              ))
            ) : (
              <p>No users found</p>
            )
          ) : (
            // Display friends list when 'friends' tab is active
            friendsList.length > 0 ? (
              friendsList.map((friend, index) => (
                <div key={index} className="friend-item">
                  <div className="friend-info">
                    <img
                      src={`https://ui-avatars.com/api/?name=${friend.username}&background=random`}
                      alt={`${friend.username} Avatar`}
                      className="friend-avatar"
                    />
                    <span className="friend-name">{friend.username}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No friends found</p>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Friends;
