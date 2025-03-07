import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/Notification.css';

const Notification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("userId");

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
      <header className="notifications-header">
      <button className="backbutton1" onClick={() => navigate("/home1")}>
          ◀ Back
        </button>
      </header>

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
