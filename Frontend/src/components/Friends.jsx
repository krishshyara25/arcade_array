import React, { useState, useEffect } from 'react';
import '../styles/Friends.css';
import { useNavigate } from "react-router-dom";
import img from '../assets/arcade_alley_logo.png';
import img2 from '../assets/wp9549839.png';
import addUserImage from '../assets/add-user.png';
import pendingrequest from '../assets/pending.png';
import bin from '../assets/bin.png';
import acceptIcon from '../assets/correct.png'; // Add Accept icon
import rejectIcon from '../assets/reject.png'; // Add Reject icon

const Friends = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  const [user, setUser] = useState(null);
  const [requestStatus, setRequestStatus] = useState({});
  const [notifications, setNotifications] = useState([]); // Track incoming requests
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown menu
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch("https://arcade-array.onrender.com/api/friends/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    if (!userId) return;
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://arcade-array.onrender.com/api/games/user/details/${userId}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };
    fetchUserDetails();
  }, [userId]);

  useEffect(() => {
    if (activeTab === "friends" && userId) {
      const fetchFriends = async () => {
        try {
          const response = await fetch(`https://arcade-array.onrender.com/api/friends/user_friends/${userId}`);
          const data = await response.json();
          if (response.ok) {
            setFriendsList(data);
          } else {
            setFriendsList([]);
          }
        } catch (error) {
          console.error("Error fetching friends:", error.message);
        }
      };
      fetchFriends();
    }
  }, [activeTab, userId]);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`https://arcade-array.onrender.com/api/friends/pending-requests/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setNotifications(data);
        }
      } catch (error) {
        console.error("Error fetching pending requests:", error);
      }
    };
    fetchPendingRequests();
  }, [userId]);

  const sendFriendRequest = async (targetUserId) => {
    try {
      const response = await fetch("https://arcade-array.onrender.com/api/friends/friend-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, targetUserId }),
      });

      const data = await response.json();
      if (response.ok) {
        setRequestStatus(prevState => ({
          ...prevState,
          [targetUserId]: true
        }));
      } else {
        alert(data.message || "Error sending request");
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const removeFriend = async (friendId) => {
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("https://arcade-array.onrender.com/api/friends/remove-friend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, friendId }),
      });

      const data = await response.json();
      if (response.ok) {
        setFriendsList(friendsList.filter(friend => friend._id !== friendId));
      } else {
        alert(data.message || "Error removing friend");
      }
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  const acceptFriendRequest = async (requesterId) => {
    setNotifications(notifications.filter(req => req._id !== requesterId));

    try {
      const response = await fetch("https://arcade-array.onrender.com/api/friends/accept-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, requesterId }),
      });

      const data = await response.json();
      if (response.ok) {
        setNotifications(notifications.filter(req => req._id !== requesterId)); // Remove accepted request
      } else {
        alert(data.message || "Error accepting request");
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const rejectFriendRequest = async (requesterId) => {
    try {
      const response = await fetch("https://arcade-array.onrender.com/api/friends/reject-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, requesterId }),
      });

      const data = await response.json();
      if (response.ok) {
        setNotifications(notifications.filter(req => req._id !== requesterId)); // Remove rejected request
      } else {
        alert(data.message || "Error rejecting request");
      }
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
  };

  const filteredUsers = users
    .filter(user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
      user._id !== userId && // Exclude the logged-in user
      !friendsList.some(friend => friend._id === user._id) // Exclude users who are already friends
    );

    const handleLogout = () => {
      localStorage.removeItem('userId'); // Remove user ID from localStorage
      navigate('/home'); // Navigate to login page after logout
    };

  return (
    <div className="app">
      <header className="header">
        <div className="logo-container">
          <img src={img} alt="Arcade Alley Logo" className="logo" />
        </div>
        <div className="user-info">
          <span onClick={() => navigate("/notifications")} className='notification_icon'>🔔</span>
          <i className="fas fa-bell icon"></i>
          <div className="user-details">
            <img
              src={img2}
              style={{ borderRadius: '50%', width: '3vw', cursor: 'pointer' }}
              alt="Profile"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            />
            <div>
              <h1 className="username">Welcome, {user?.username || "Guest"}</h1>
              <p className="useremail">Email: {user?.email || "No email found"}</p>
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
          {activeTab === "notifications" ? (
            notifications.length > 0 ? (
              notifications.map((request, index) => (
                <div key={index} className="friend-item">
                  <div className="friend-info">
                    <img
                      src={`https://ui-avatars.com/api/?name=${request.username}&background=random`}
                      alt={`${request.username} Avatar`}
                      className="friend-avatar"
                    />
                    <span className="friend-name">{request.username}</span>
                  </div>
                  <div className="friend-actions">
                    <img
                      src={acceptIcon}
                      alt="Accept Request"
                      onClick={() => acceptFriendRequest(request._id)}
                      className="accept-icon"
                    />
                    <img
                      src={rejectIcon}
                      alt="Reject Request"
                      onClick={() => rejectFriendRequest(request._id)}
                      className="reject-icon"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No notifications</p>
            )
          ) : (
            activeTab === "search" ? (
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
                      {requestStatus[user._id] ? (
                        <img src={pendingrequest} alt="Pending Request" className="add-friend-icon" />
                      ) : (
                        <img
                          src={addUserImage}
                          alt="Add Friend"
                          onClick={() => sendFriendRequest(user._id)}
                          className="add-friend-icon"
                        />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No users found</p>
              )
            ) : (
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
                    <div className="friend-actions">
                      <img
                        src={bin}
                        alt="Remove Friend"
                        onClick={() => removeFriend(friend._id)}
                        className="remove-friend-icon"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>No friends found</p>
              )
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Friends;
