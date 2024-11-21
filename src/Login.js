import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Link, Navigate } from 'react-router-dom';

const secretKey = "kishore123";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '', 
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLogin = () => {
    const { email, password } = this.state;
    
    if (password === secretKey) {
      Cookies.set("secKey", secretKey, { expires: 30 });
      console.log('Logging in with:', { email, password });
      this.setState({ isLoggedIn: true }); 
    } else {
      console.log("You did a mistake");
    }
  };


  render() {
    const { email, password, } = this.state;
    const key = Cookies.get('secKey')
    if (key !== undefined) {
      return <Navigate to="/" replace={true} />;
    }

    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Login</h2>
        <input
          name="email"
          placeholder="Username or Email"
          type="text"
          value={email}
          onChange={this.handleInputChange}
          style={{ margin: '10px 0', padding: '10px', width: '250px' }}
        />
        <br />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={this.handleInputChange}
          style={{ margin: '10px 0', padding: '10px', width: '250px' }}
        />
        <br />
        <button
          onClick={this.handleLogin}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Login
        </button>
        <br />
        <Link
          to="/register"
          style={{
            marginTop: '20px',
            display: 'block',
            textDecoration: 'none',
          }}
        >
          Don't have an account? Register here
        </Link>
      </div>
    );
  }
}

export default Login;
