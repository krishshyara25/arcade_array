# 🎮 Arcade Array

**Live Demo:** [🔗 Deployed Website](https://arcade-array.onrender.com)  
**Figma Design:** [🎨 View on Figma](https://www.figma.com/design/muK3MA7Dhfr66f9SWSsjZZ/Archade-Alley-(Copy)?node-id=2057-401&t=cE1gAhGpSZzB8PEs-1)  
**API Documentation:** [📄 Postman Docs](https://documenter.getpostman.com/view/39216508/2sAYX2Miri)  

Arcade Array is a gaming platform where users can **browse games, manage wishlists, and connect with friends**. It allows users to **add games to their wishlist, send and accept friend requests**, and access game details such as **developer, release date, and platforms**.

## 🚀 Features

- 🕹 **Game Management** – Browse games with detailed information.
- 📌 **Wishlist** – Add or remove games from your wishlist.
- 🤝 **Friends System** – Send, accept, or reject friend requests.
- 🔑 **User Authentication** – Secure sign-up and login system.
- 🏠 **Homepage Dashboard** – View quick access features and notifications.

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Frontend:** React.js,HTML,CSS,JavaScript  
- **Database:** MongoDB Atlas  

## 📌 API Endpoints

### 🔹 Authentication
- **POST** `/api/auth/signup` – Register a new user  
- **POST** `/api/auth/login` – User login  

### 🔹 Games
- **GET** `/api/games` – Fetch all games  
- **POST** `/api/games/add` – Add a game to wishlist  
- **DELETE** `/api/games/remove` – Remove a game from wishlist  
- **GET** `/api/games/wishlist/:userId` – Get user’s wishlist  

### 🔹 Friends
- **POST** `/api/friends/request` – Send a friend request  
- **POST** `/api/friends/accept` – Accept a friend request  
- **POST** `/api/friends/reject` – Reject a friend request  

## 🎯 Contributing
Feel free to **fork** this repository, create a new branch, and submit a pull request! Contributions are always welcome.
