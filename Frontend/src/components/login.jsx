import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // New loading state
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loader when login starts

        try {
            const response = await fetch("https://arcade-array.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

                    // Store token and userId in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId); // Store userId

            navigate("/home1");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Hide loader after login attempt
        }   
    };

    return (
        <div className="auth-container">
            <header>
                <div className="heading">Login</div>
            </header>
            <div className="form-header">
          <button className="back-button" onClick={() => navigate("/home")}>
            ⬅
          </button>
        </div>
            {error && <p className="error">{error}</p>}

            {loading ? (
                <div className="loader-container">
                <div className="loader"></div>
                 <p>Loading...</p>
                 </div>
            ) : (
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Login</button>
                </form>
            )}

            <p>Don't have an account? <a href="/signup">Signup</a></p>
        </div>
    );
};

export default Login;