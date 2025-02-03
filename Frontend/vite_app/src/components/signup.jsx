import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/signup.css";
import logo from '../assets/arcade_alley_logo.png'

function SignUpForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://arcade-array.onrender.com/api/auth/signup",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert(response.data.message);
      setFormData({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
      });

      if (response.status === 200 || response.status === 201) {
        navigate("/login"); // Redirect to login page after successful signup
      }
    } catch (err) {
      console.error("Error submitting form", err);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <header>
        <div className="heading">Signup</div>
      </header>
      {/* Main Form */}
      <main className="form-container">
        <div className="form-header">
          <button className="back-button" onClick={() => navigate("/home")}>
            ⬅
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-grid">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          <div className="forgot-password">
            <button type="button">Forget Password?</button>
          </div>

          <button type="submit" className="signup-button">
            Sign up
          </button>

          <div className="divider-container">
            <div className="divider-line"></div>
          </div>
          <div className="divider-text">Or Sign up with</div>

          <div className="social-buttons">
            <button type="button" className="social-button">G</button>
            <button type="button" className="social-button">F</button>
          </div>
          <div onClick={() => navigate("/login")} className="login-button">
              already have an accout?
            </div>
        </form>
      </main>
    </div>
  );
}

export default SignUpForm;
