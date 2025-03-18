import React, { useState, useEffect } from 'react';
import '../styles/Friends.css';
import { useNavigate } from "react-router-dom";
import img from '../assets/arcade_alley_logo.png';
import addUserImage from '../assets/add-user.png';
import pendingrequest from '../assets/pending.png';
import bin from '../assets/bin.png';
import acceptIcon from '../assets/correct.png'; // Add Accept icon
import rejectIcon from '../assets/reject.png'; // Add Reject icon
import defaultProfilePic from "../assets/wp9549839.png";
import { toast } from 'react-toastify';

const Friends = ({ socket }) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [friendsList, setFriendsList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("search");
    const [user, setUser] = useState(null);
    const [requestStatus, setRequestStatus] = useState({});
    const [notifications, setNotifications] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!socket || !userId) return;

        socket.on('status-update', ({ friendId, status }) => {
            console.log(`Friends: ${friendId} is ${status}`);
            setFriendsList((prev) => {
                const updatedList = prev.map((friend) =>
                    friend._id === friendId ? { ...friend, status } : friend
                );
                console.log('Updated friendsList:', updatedList); // Debug
                return updatedList;
            });
        });

        return () => {
            socket.off('status-update');
        };
    }, [socket, userId]);

  const sendFriendRequest = async (targetUserId) => {
    try {
        const response = await fetch(
            "https://arcade-array.onrender.com/api/friends/friend-request",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, targetUserId }),
            }
        );

        const data = await response.json();

        if (response.ok) {
            if (data.message === "Friend request accepted automatically") {
                toast.success("Friend request accepted automatically");

                // Find the target user in the `users` array
                const targetUser = users.find((user) => user._id === targetUserId);
                if (targetUser) {
                    // Add the target user to the `friendsList` state
                    setFriendsList((prev) => [...prev, targetUser]);

                    // Remove the target user from the `users` state
                    setUsers((prevUsers) =>
                        prevUsers.filter((user) => user._id !== targetUserId)
                    );
                }
            } else {
                toast.success("Friend request sent");
            }

            // Update request status in the UI
            setRequestStatus((prevState) => ({
                ...prevState,
                [targetUserId]: true,
            }));
        } else {
            alert(data.message || "Error sending request");
        }
    } catch (error) {
        console.error("Error sending friend request:", error);
        toast.error("Failed to send friend request");
    }
};

  useEffect(() => {
        fetch("http://localhost:3000/api/friends/users")
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    useEffect(() => {
        if (!userId) return;
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/games/user/details/${userId}`);
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
                    const response = await fetch(`http://localhost:3000/api/friends/user_friends/${userId}`);
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    const data = await response.json();
                    setFriendsList(data.map(friend => ({
                        ...friend,
                        status: friend.status || 'offline' // Use DB status as initial value
                    })));
                    console.log('Fetched friends with statuses:', data);
                } catch (error) {
                    console.error("Error fetching friends:", error.message);
                    setFriendsList([]);
                }
            };
            fetchFriends();
        }
    }, [activeTab, userId]);

    useEffect(() => {
        if (!userId) return;
        const fetchPendingRequests = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/friends/pending-requests/${userId}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error("Error fetching pending requests:", error);
            }
        };
        fetchPendingRequests();
    }, [userId]);


    const removeFriend = async (friendId) => {
        if (!userId) {
            toast.error("User ID not found. Please log in again.");
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/api/friends/remove-friend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, friendId }),
            });
            const data = await response.json();
            if (response.ok) {
                setFriendsList(friendsList.filter(friend => friend._id !== friendId));
            } else {
                toast.error(data.message || "Error removing friend");
            }
        } catch (error) {
            console.error("Error removing friend:", error);
        }
    };

    const acceptFriendRequest = async (requesterId) => {
        try {
            const response = await fetch("http://localhost:3000/api/friends/accept-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, requesterId }),
            });
            const data = await response.json();
            if (response.ok) {
                setNotifications((prev) => prev.filter(req => req._id !== requesterId));
                const newFriend = notifications.find(req => req._id === requesterId);
                if (newFriend) {
                    setFriendsList((prev) => [...prev, { ...newFriend, status: 'offline' }]);
                }
            } else {
                toast.error(data.message || "Error accepting request");
            }
        } catch (error) {
            console.error("Error accepting friend request:", error);
        }
    };

    const rejectFriendRequest = async (requesterId) => {
        try {
            const response = await fetch("http://localhost:3000/api/friends/reject-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, requesterId }),
            });
            const data = await response.json();
            if (response.ok) {
                setNotifications(notifications.filter(req => req._id !== requesterId));
            } else {
                toast.error(data.message || "Error rejecting request");
            }
        } catch (error) {
            console.error("Error rejecting friend request:", error);
        }
    };



    return (
        <div className="app">
            <header className="header">
                <div className="logo-container">
                    <img src={img} alt="Arcade Alley Logo" className="logo" />
                </div>
                <div className="user-info">
                    <span onClick={() => navigate("/notifications")} className='notification_icon'>🔔</span>
                    <div className="user-details">
                        <img
                            src={user?.profilePicture ? user.profilePicture : defaultProfilePic}
                            style={{ borderRadius: "50%", width: "3vw", cursor: "pointer" }}
                            alt="Profile"
                            onClick={() => setDropdownVisible(!dropdownVisible)}
                        />
                        <div>
                            <h1 className="username">Welcome, {user?.username || "Guest"}</h1>
                            <p className="useremail">Email: {user?.email || "No email found"}</p>
                        </div>
                        {dropdownVisible && (
                            <div className="dropdownMenu">
                                <button onClick={handleLogout} className="logoutButton">Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <main className="main">
                <button className="backbutton1" onClick={() => navigate("/home1")}>
                    ◀ Back
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
                    {activeTab === "search" ? (
                        filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <div key={user._id} className="friend-item">
                                    <div className="friend-info">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
                                            alt={`${user.username} Avatar`}
                                            className="friend-avatar"
                                        />
                                        <span className="friend-name">
                                            {user.username}{" "}
                                            <span
                                                style={{
                                                    fontSize: "0.8rem",
                                                    color: user.profileVisibility ? "green" : "red",
                                                    marginLeft: "8px",
                                                }}
                                            >
                                                {user.profileVisibility ? "(Public)" : "(Private)"}
                                            </span>
                                        </span>
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
                            friendsList.map((friend) => (
                                <div key={friend._id} className="friend-item">
                                    <div className="friend-info">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${friend.username}&background=random`}
                                            alt={`${friend.username} Avatar`}
                                            className="friend-avatar"
                                        />
                                        <span className="friend-name">
                                            {friend.username}{" "}
                                            {friend.status === "online" ? (
                                                <span style={{ color: "green", fontWeight: "bold" }}>🟢 Online</span>
                                            ) : (
                                                <span style={{ color: "red", fontWeight: "bold" }}>🔴 Offline</span>
                                            )}
                                        </span>
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
                    )}
                </div>
            </main>
        </div>
    );
};

export default Friends;