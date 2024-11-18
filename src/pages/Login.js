import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // For navigation after login
import './Login.css';  // Your login page styles

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);  // To store user data after login
    const navigate = useNavigate(); // Hook to navigate after successful login

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!email || !password) {
            setError('Both fields are required.');
            return;
        }

        setError('');
        setIsLoading(true);

        // Mock login process (replace this with real authentication logic)
        try {
            // Simulate a login API request or authentication process
            setTimeout(() => {
                // In a real app, you might check the credentials with an API call here
                if (email === 'user@example.com' && password === 'password123') {
                    // Mock user data (this would come from an API in a real app)
                    const mockUserData = {
                        name: 'John Doe',
                        email: 'user@example.com',
                        profileImage: 'https://www.example.com/user-image.jpg' // Example image URL
                    };

                    // Store user data
                    setUser(mockUserData);

                    // Successful login, reset loading state and navigate to dashboard
                    setIsLoading(false);
                    navigate('/dashboard');  // Navigate to the dashboard or homepage
                } else {
                    setError('Invalid email or password');
                    setIsLoading(false);
                }
            }, 1500); // Simulate an async operation
        } catch (err) {
            setIsLoading(false);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            {!user ? (
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="submit-button" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>

                    <div className="signup-link">
                        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                    </div>
                </form>
            ) : (
                <div className="user-info">
                    <h3>Welcome, {user.name}!</h3>
                    <div className="user-profile">
                        <img src={user.profileImage} alt="User" className="user-avatar" />
                        <p>Email: {user.email}</p>
                    </div>
                    <button className="logout-button" onClick={() => setUser(null)}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Login;

