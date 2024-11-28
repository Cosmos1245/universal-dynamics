import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext'; 
import axios from 'axios'; 
import './Login.css';

const Login = () => {
  const { theme } = useContext(ThemeContext); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      const userId = localStorage.getItem('userId');
      navigate(`/logged/${userId}`);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username && password) {
      setLoading(true); 
      try {
        const response = await axios.post('https://universal-dynamics-backend.onrender.com/login', {
          email: username,
          password: password,
        });

        if (response.data.success) {
          const user = response.data.user;
          const token = response.data.token;

          // Store the token and user info in localStorage (or sessionStorage if you prefer)
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userId', user._id); 
          localStorage.setItem('token', token); 

          navigate(`/logged/${user._id}`); 
        } else {
          setError(response.data.message);  // Error message from backend
        }
      } catch (error) {
        console.error('Login error:', error);
        setError('An error occurred during login');
      } finally {
        setLoading(false); 
      }
    } else {
      setError('Please fill in both fields');
    }
  };

  return (
    <div className={`login-container ${theme === 'Dark Theme' ? 'dark-theme' : 'light-theme'}`}>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          
          <div className="button-group">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </div>
        </form>
        <div className="signup-link">
          <p>Don't have an account? <Link to="/signup">Create one</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
