import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';  // Import the custom CSS

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/signup', { username, password });
            alert('Signup successful');
            navigate('/login');
        } catch (error) {
            alert('Signup successful');
            navigate('/login');
        }
    };

    return (
        <div className="signup-page">
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="signup-card shadow-lg p-4 rounded">
                    <h2 className="text-center mb-4">Signup</h2>
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
                    <button className="btn btn-primary w-100 mb-3" onClick={handleSignup}>
                        Signup
                    </button>

                    <div className="text-center">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
