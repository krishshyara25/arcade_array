# 🎮 Arcade Array

![Netlify Status](https://api.netlify.com/api/v1/badges/b9ac7185-37d9-4e48-b2e0-a51610f19564/deploy-status)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)
![Socket.io](https://img.shields.io/badge/Realtime-Socket.io-010101?style=for-the-badge&logo=socketdotio)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

**Arcade Array** is a high-performance gaming platform designed for enthusiasts to discover new titles, manage personal wishlists, and build a social community. It features real-time interactions, secure payment gateways, and a sleek user experience inspired by modern gaming dashboards.

[🚀 **Live Demo**](https://arcadearray.netlify.app/) | [🎨 **Figma Design**](https://www.figma.com/design/muK3MA7Dhfr66f9SWSsjZZ/Archade-Alley-(Copy)?node-id=2057-401&t=cE1gAhGpSZzB8PEs-1) | [📄 **API Documentation**](https://documenter.getpostman.com/view/39216508/2sAYX2Miri)

---

## ✨ Key Features

* **🕹️ Comprehensive Game Library:** Browse games with detailed metadata including developers, release dates, and platform support.
* **🤝 Real-time Social Engine:** Built-in friends system allowing users to send, accept, or reject requests.
* **🟢 Live Status Tracking:** Real-time online/offline status updates for friends powered by Socket.io.
* **📌 Smart Wishlists:** Effortlessly curate your "must-play" list with add/remove functionality.
* **💳 Multi-Gateway Payments:** Integrated with **Stripe** and **Razorpay** for secure transactions.
* **🔐 Advanced Authentication:** Secure JWT-based auth featuring sign-up, login, and full password recovery via email.
* **🔔 Notification Hub:** Stay updated on friend activities and system alerts instantly.

---

## 🛠️ Tech Stack

### **Frontend**
* **Core:** React.js (Vite), React Router Dom v7
* **Real-time:** Socket.io-client
* **Styling:** Tailwind CSS, Framer Motion, Styled Components
* **Payments:** @stripe/react-stripe-js & Razorpay SDK
* **Tools:** Axios, Swiper, React Toastify

### **Backend**
* **Runtime:** Node.js & Express.js
* **Database:** MongoDB Atlas with Mongoose ODM
* **Security:** Bcrypt, Helmet, JSON Web Token (JWT)
* **Cloud Services:** Cloudinary (Media), Nodemailer (Email)

---

## 🏗️ Project Architecture

### **API Endpoints**
| Category | Endpoint | Method | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `/api/auth/signup` | `POST` | Register a new account |
| **Auth** | `/api/auth/login` | `POST` | Secure user login |
| **Games** | `/api/games` | `GET` | Fetch the full game library |
| **Games** | `/api/games/wishlist/:userId` | `GET` | Get user's wishlist |
| **Friends** | `/api/friends/request`| `POST` | Send a friend request |
| **Payment**| `/payment` | `POST` | Handle Stripe/Razorpay transactions |

---

## 🚀 Getting Started

### **Prerequisites**
* Node.js (v18+)
* MongoDB Atlas Account
* API Keys: Cloudinary, Stripe, Razorpay, and SMTP for Email

### **Installation**

1.  **Clone the Repo**
    ```bash
    git clone [https://github.com/krishshyara25/arcade_array.git](https://github.com/krishshyara25/arcade_array.git)
    cd arcade_array
    ```

2.  **Backend Setup**
    ```bash
    cd Backend
    npm install
    # Create a .env file with: MONGO_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS, etc.
    npm start
    ```

3.  **Frontend Setup**
    ```bash
    cd ../Frontend
    npm install
    npm run dev
    ```

---

## 🎯 Contributing
Contributions make the community amazing!
1.  **Fork** the Project.
2.  **Create** your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  **Commit** your Changes (`git commit -m 'Add AmazingFeature'`).
4.  **Push** to the Branch (`git push origin feature/AmazingFeature`).
5.  **Open** a Pull Request.

