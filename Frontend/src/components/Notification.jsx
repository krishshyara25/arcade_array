import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/Notification.css';
import logo from '../assets/arcade_alley_logo.png';
import defaultProfilePic from "../assets/wp9549839.png";
import axios from "axios";
import { toast } from "react-toastify";


const Notification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(defaultProfilePic);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!userId) return;
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://arcade-array.onrender.com/api/games/user/details/${userId}`);
        if (response.status === 200) {
          const userData = response.data;
          setUser(userData);
          setUsername(userData.username || "");
          setEmail(userData.email || "");
          setPreviewUrl(userData.profilePicture || defaultProfilePic);
        } else {
          toast.error("Failed to load user information");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Error loading user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const fetchPendingRequests = async () => {
      try {
        const response = await fetch(`https://arcade-array.onrender.com/api/friends/requests/${userId}`);
        const data = await response.json();
        console.log("API Response:", data);

        if (response.ok) {
          if (Array.isArray(data.receivedRequests)) {
            setNotifications(data.receivedRequests);
          } else {
            console.error("Expected an array but received:", data);
            setNotifications([]);
          }
        }
      } catch (error) {
        console.error("Error fetching pending requests:", error);
      }
    };
    fetchPendingRequests();
  }, [userId]);

  const acceptRequest = async (requesterId) => {
    console.log("Accepting request from:", requesterId);

    try {
      const response = await fetch("https://arcade-array.onrender.com/api/friends/accept-friend-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, senderId: requesterId }),
      });

      const data = await response.json();
      console.log("Accept Response:", data);

      if (response.ok) {
        setNotifications(notifications.filter(req => req.senderId !== requesterId));
      } else {
        alert(data.message || "Error accepting request");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const rejectRequest = async (requesterId) => {
    console.log("Rejecting request from:", requesterId);

    try {
      const response = await fetch("https://arcade-array.onrender.com/api/friends/reject-friend-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, senderId: requesterId }),
      });

      const data = await response.json();
      console.log("Reject Response:", data);

      if (response.ok) {
        setNotifications(notifications.filter(req => req._id !== requesterId));
      } else {
        alert(data.message || "Error rejecting request");
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="notifications-page">
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
            <a href="#" >Community</a>
            <a href="#" onClick={() => navigate("/friends")}>Friends</a>
            <a href="#" onClick={() => navigate("/wishlist")}>Wishlist</a>
            <a href="#" >Download</a>
          </div>
        </div>

        <div className="nav-right">
          <div className="user-info">


            {/* If user is logged in, show profile and logout button */}
            <div className="user-details">
              <img
                src={previewUrl}
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


            </div>

          </div>
        </div>
      </nav>
      <button className="backbutton1" onClick={() => navigate(-1)}>
        ◀ Back
      </button>
      <main className="notifications-main">
        <h1 className="notifications-title">Friend Requests</h1>

        {notifications.length === 0 ? (
          <p className="no-requests-message">No pending friend requests</p>
        ) : (
          notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              <div className="notification-info">
                <img
                  src={`https://ui-avatars.com/api/?name=${notification.username || "Unknown"}&background=random`}
                  alt={`${notification.username || "Unknown"} Avatar`}
                  className="notification-avatar"
                />
                <span className="notification-name">{notification.username || "Unknown"}</span>
              </div>
              <div className="notification-actions">
                <button onClick={() => acceptRequest(notification._id)} className="accept-button">
                  Accept
                </button>
                <button onClick={() => rejectRequest(notification._id)} className="reject-button">
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default Notification;
