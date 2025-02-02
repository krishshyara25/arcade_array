import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Signup = () => {
    const [formData, setFormData] = useState({ firstname: "", lastname: "", username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(""); // Reset previous errors
    
        try {
            const response = await fetch("https://arcade-array.onrender.com/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData), // Ensure data is being correctly sent
            });
    
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
    
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };
    
    

    return (
        <div className="auth-container">
            <h2>Signup</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSignup}>
                <input type="text" name="firstname" placeholder="First Name" onChange={handleChange} required />
                <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange} required />
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Signup</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Signup;
