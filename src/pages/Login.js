import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
        const response = await axios.get('http://localhost:1245/users', {
          params: { email: username, password: password },
        });

        if (response.data && response.data.length > 0) {
          const user = response.data[0]; 
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userId', user._id); 
          navigate(`/logged/${user._id}`); 
        } else {
          setError('Invalid email or password');
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
          <p>Don't have an account? <a href="/signup">Create one</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

