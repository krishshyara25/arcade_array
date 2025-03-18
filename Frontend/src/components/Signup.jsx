import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/signup.css';
import seen from '../assets/visibility_off_24dp_E8EAED.svg';
import { useAuth0 } from '@auth0/auth0-react';

function SignUpForm() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
    });
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://arcade-array.onrender.com/api/auth/signup', formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            alert(response.data.message);
            setFormData({ firstname: '', lastname: '', username: '', email: '', password: '' });
            if (response.status === 200 || response.status === 201) {
                navigate('/login');
            }
        } catch (err) {
            console.error('Error submitting form', err);
            setError('Signup failed. Please try again.');
        }
    };

    const handleGoogleLogin = async () => {
        await loginWithRedirect({
            authorizationParams: {
                connection: 'google-oauth2',
                prompt: 'select_account',
                scope: 'openid profile email',
            },
        });
    };

    const auth0Callback = async () => {
        try {
            if (!user) {
                console.error('No user data found.');
                setError('No user data found. Please try again.');
                return;
            }
            const userData = {
                firstname: user.given_name || user.name?.split(' ')[0] || 'Unknown',
                lastname: user.family_name || user.name?.split(' ')[1] || '',
                username: user.nickname || user.email?.split('@')[0] || 'user_' + Math.random().toString(36).substring(7),
                email: user.email || '',
                profilePicture: user.picture || '',
            };
            const res = await axios.post('https://arcade-array.onrender.com/api/auth/auth0signup', userData);
            if (res.data.token && res.data.userId) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.userId);
                navigate('/home1');
            } else {
                setError('Signup failed. Please try again.');
            }
        } catch (err) {
            console.error('Google Auth Error:', err);
            setError(err.response?.data?.message || 'Failed to sign up with Google.');
        }
    };

    useEffect(() => {
        if (isAuthenticated && user && window.location.pathname === '/signup' && !localStorage.getItem('token')) {
            auth0Callback();
        }
    }, [isAuthenticated, user]);

    const handleFacebookLogin = async () => {
        await loginWithRedirect({
            authorizationParams: { connection: 'facebook' },
        });
    };

    return (
        <div className="signup-container">
            <header>
                <div className="heading">Signup</div>
            </header>
            <main className="form-container">
                <div className="form-header">
                    <button className="backbutton2" onClick={() => navigate(-1)}>
                        ◀ Back
                    </button>
                </div>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-grid">
                        <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required />
                        <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required />
                    </div>
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                    <div className="password-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <img src={seen} alt="" className="eyeicon" /> : '👁'}
                        </button>
                    </div>
                    <button type="submit" className="signup-button">Sign up</button>
                    <div className="divider-container">
                        <div className="divider-line"></div>
                    </div>
                    <div className="divider-text">Or Sign up with</div>
                    <div className="social-buttons">
                        <button type="button" className="social-button" onClick={handleGoogleLogin}>G</button>
                        <button type="button" className="social-button" onClick={handleFacebookLogin}>F</button>
                    </div>
                    <div onClick={() => navigate('/login')} className="login-button">Already have an account?</div>
                </form>
            </main>
        </div>
    );
}

export default SignUpForm;