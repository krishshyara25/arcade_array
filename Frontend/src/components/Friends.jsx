import React, { useState, useEffect } from 'react';
import '../styles/Friends.css';
import { useNavigate } from "react-router-dom";
import img from '../assets/arcade_alley_logo.png';
import addUserImage from '../assets/add-user.png';
import pendingrequest from '../assets/pending.png';
import bin from '../assets/bin.png';
import acceptIcon from '../assets/correct.png';
import rejectIcon from '../assets/reject.png';
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
    const [isLoading, setIsLoading] = useState(false);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!socket || !userId) return;

        socket.on('status-update', ({ friendId, status }) => {
            console.log(`Friends: ${friendId} is ${status}`);
            setFriendsList((prev) => {
                const updatedList = prev.map((friend) =>
                    friend._id === friendId ? { ...friend, status } : friend
                );
                console.log('Updated friendsList:', updatedList);
                return updatedList;
            });
        });

        return () => {
            socket.off('status-update');
        };
    }, [socket, userId]);

    useEffect(() => {
        fetch("https://arcade-array.onrender.com/api/friends/users")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched users:", data);
                setUsers(data);
            })
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
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    const data = await response.json();
                    setFriendsList(data.map(friend => ({
                        ...friend,
                        status: friend.status || 'offline'
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
                const response = await fetch(`https://arcade-array.onrender.com/api/friends/pending-requests/${userId}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setNotifications(data);
                // Initialize requestStatus with pending outgoing requests
                const pendingRequests = {};
                data.forEach(request => {
                    if (request.from === userId) { // Outgoing requests
                        pendingRequests[request.to] = 'pending';
                    }
                });
                setRequestStatus(pendingRequests);
            } catch (error) {
                console.error("Error fetching pending requests:", error);
            }
        };
        fetchPendingRequests();
    }, [userId]);

    const sendFriendRequest = async (targetUserId) => {
        // Prevent sending request if already pending
        if (requestStatus[targetUserId] === 'pending') {
            toast.info("Friend request already sent!");
            return;
        }

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
                    const targetUser = users.find((user) => user._id === targetUserId);
                    if (targetUser) {
                        setFriendsList((prev) => [...prev, { ...targetUser, status: 'offline' }]);
                        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== targetUserId));
                    }
                } else {
                    toast.success("Friend request sent");
                    setRequestStatus((prevState) => ({
                        ...prevState,
                        [targetUserId]: 'pending',
                    }));
                }
            } else {
                toast.error(data.message || "Error sending request");
            }
        } catch (error) {
            console.error("Error sending friend request:", error);
            toast.error("Failed to send friend request");
        }
    };

    const removeFriend = async (friendId) => {
        if (!userId) {
            toast.error("User ID not found. Please log in again.");
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
                toast.error(data.message || "Error removing friend");
            }
        } catch (error) {
            console.error("Error removing friend:", error);
        }
    };

    const filteredUsers = users
        .filter(
            (user) =>
                user.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
                user._id !== userId &&
                !friendsList.some((friend) => friend._id === user._id)
        );

    const handleLogout = () => {
        if (socket && userId) {
            socket.emit('set-status', { userId, status: 'offline' });
            console.log(`Logout: Emitted offline for ${userId}`);
        }
        localStorage.removeItem('userId');
        navigate('/home');
    };

    const handleNavigation = (path) => {
        setIsLoading(true);
        setTimeout(() => {
            navigate(path);
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className="app">
            <nav className="nav-bar">
                <div className="nav-left">
                    <div className="logo1">
                        <img src={img} alt="Arcade Alley" />
                    </div>
                    <div className="nav-links">
                        <a href="#" onClick={() => {
                            const storedUserId = localStorage.getItem("userId");
                            handleNavigation(storedUserId ? "/home1" : "/home");
                        }}>Home</a>
                        <a href="#" onClick={() => {
                            const storedUserId = localStorage.getItem("userId");
                            handleNavigation(storedUserId ? "/catagory1" : "/catagory");
                        }}>Category</a>
                        <a href="#" onClick={() => handleNavigation("/community")}>Community</a>
                        <a href="#" onClick={() => handleNavigation("/friends")}>Friends</a>
                        <a href="#" onClick={() => handleNavigation("/wishlist")}>Wishlist</a>
                        <a href="#" onClick={() => handleNavigation("/download")}>Download</a>
                    </div>
                </div>
                <div className="nav-right">
                    <div className="user-info">
                            <div className="user-details">
                                <img
                                    src={user?.profilePicture ? user.profilePicture : defaultProfilePic}
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
                                {dropdownVisible && (
                                    <div className="dropdownMenu">
                                        <button onClick={handleLogout} className="logoutButton">Logout</button>
                                    </div>
                                )}
                            </div>
                        
                    </div>
                </div>
            </nav>

            <main className="main">
                {isLoading ? (
                    <div className="loader-container">
                        <p>Loading...</p>
                    </div>
                ) : (
                    <>
                        <button className="backbutton1" onClick={() => handleNavigation("/home1")}>
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
                                                            color: user.profileVisibility === true ? "green" : "red",
                                                            marginLeft: "8px",
                                                        }}
                                                    >
                                                        {user.profileVisibility === true ? "(Public)" : "(Private)"}
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="friend-actions">
                                                {requestStatus[user._id] === 'pending' ? (
                                                    <img
                                                        src={pendingrequest}
                                                        alt="Request Pending"
                                                        className="add-friend-icon"
                                                        title="Friend request pending"
                                                    />
                                                ) : (
                                                    <img
                                                        src={addUserImage}
                                                        alt="Add Friend"
                                                        onClick={() => sendFriendRequest(user._id)}
                                                        className="add-friend-icon"
                                                        title="Send friend request"
                                                        style={{ cursor: 'pointer' }}
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
                    </>
                )}
            </main>
        </div>
    );
};

export default Friends;