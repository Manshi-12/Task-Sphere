import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Auth.css'; // Import the custom CSS

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            alert('Error logging in: ' + error.response.data.message);
        }
    };

    return (
        <div className="login-page">
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="login-card shadow-lg p-4 rounded">
                    <h2 className="text-center mb-4">Login</h2>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingUsername"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="floatingUsername">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
                        Login
                    </button>

                    <div className="text-center">
                        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
