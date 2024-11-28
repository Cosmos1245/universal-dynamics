import React, { useState, useContext } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext'; 
import axios from 'axios'; 
import './SignUp.css';

const SignUp = () => {
  const { theme } = useContext(ThemeContext);
  const [userName, setUserName] = useState('');  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const phoneNumberRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !email || !password || !confirmPassword || !gender || !phoneNumber || !address || !shippingAddress || !billingAddress) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    if (!phoneNumberRegex.test(phoneNumber)) {
      setError('Please enter a valid phone number.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://universal-dynamics-backend.onrender.com/users', {
        name: userName,
        email,
        password,
        gender,
        phone_number: phoneNumber,
        address,
        shipping_address: shippingAddress,
        billing_address: billingAddress,
        role: 'user',
        account_status: 'active', 
        payment_method: 'credit_card', 
      });

      if (response.status === 201) {
      
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', response.data._id); 

        navigate(`/logged/${response.data._id}`);
      } else {
        setError('Something went wrong, please try again.');
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      setError('An error occurred during sign-up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`signup-container ${theme === 'Dark Theme' ? 'dark-theme' : 'light-theme'}`}>
      <div className="signup-box">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
      
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <select
              style={{ marginLeft:'6px' }}
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="shippingAddress">Shipping Address</label>
            <input
              type="text"
              id="shippingAddress"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Enter your shipping address"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="billingAddress">Billing Address</label>
            <input
              type="text"
              id="billingAddress"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              placeholder="Enter your billing address"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          <div className="button-group">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? <span>Loading...</span> : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="login-link">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

