import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = ({ socket }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch('https://arcade-array.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Login failed');
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            if (socket) {
                socket.emit('set-status', { userId: data.userId, status: 'online' });
                console.log(`Login: Emitted online for ${data.userId}`);
            }
            navigate('/home1');
        } catch (err) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <header>
                <div className="heading">Login</div>
            </header>
            <div className="form-header">
                <button className="backbutton2" onClick={() => navigate('/home')}>
                    ◀ Back
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
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                    <button type="submit">Login</button>
                </form>
            )}
            <p>
                Don't have an account? <a href="/signup">Signup</a> |{' '}
                <a href="/forgot-password">Forgot Password?</a>
            </p>
        </div>
    );
};

export default Login;