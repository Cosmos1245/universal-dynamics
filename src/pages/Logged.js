import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logged.css';

const Logged = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) {
        navigate('/login');
        return;
      }
      
      try {
        const response = await fetch('https://universal-dynamics-backend.onrender.com/users');
        const data = await response.json();
        const currentUser = data.find(user => user._id === userId);
        
        if (currentUser) {
          setUser(currentUser); 
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId, navigate]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="logged-in-container">
      <div className="logged-content">
        <h2>Welcome, {user.name}!</h2>
        <p>You are successfully logged in.</p>
        <div className="user-profile">
          <h3>User Information</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Date of Birth:</strong> {user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Phone Number:</strong> {user.phone_number}</p>

          <h3>Shipping Address</h3>
          <p><strong>Address:</strong> {user.shipping_address}</p>
          <p><strong>City:</strong> {user.shipping_city || 'N/A'}</p>
          <p><strong>Country:</strong> {user.shipping_country || 'N/A'}</p>
          <p><strong>Postal Code:</strong> {user.shipping_postal_code || 'N/A'}</p>

          <h3>Billing Address</h3>
          <p><strong>Address:</strong> {user.billing_address}</p>
          <p><strong>City:</strong> {user.billing_city || 'N/A'}</p>
          <p><strong>Country:</strong> {user.billing_country || 'N/A'}</p>
          <p><strong>Postal Code:</strong> {user.billing_postal_code || 'N/A'}</p>

          <h3>Account Information</h3>
          <p><strong>Account Status:</strong> {user.account_status}</p>
          <p><strong>Payment Method:</strong> {user.payment_method}</p>
          <p><strong>Last Login:</strong> {user.last_login ? new Date(user.last_login).toLocaleString() : 'N/A'}</p>
          <p><strong>Account Created:</strong> {new Date(user.account_created).toLocaleDateString()}</p>
        </div>

        <button className="logout-button" onClick={() => {
          localStorage.setItem('isLoggedIn', 'false');
          localStorage.removeItem('userId');
          navigate('/login');
        }}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Logged;
