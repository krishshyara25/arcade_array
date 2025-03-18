import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');
        try {
            const response = await fetch('http://localhost:3000/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Request failed');
            setMessage('A reset link has been sent to your email.');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <header>
                <div className="heading">Forgot Password</div>
            </header>
            <div className="form-header">
                <button className="backbutton2" onClick={() => navigate('/login')}>
                    ◀ Back
                </button>
            </div>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p className="error">{error}</p>}
            {loading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                    <p>Loading...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                    <button type="submit">Send Reset Link</button>
                </form>
            )}
        </div>
    );
};

export default ForgotPassword;