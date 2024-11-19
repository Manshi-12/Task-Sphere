import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import TodoList from './components/TodoList';
import About from './components/About.js'; // Import About component
import Contact from './components/Contact'; // Import Contact component
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <Router>
            <div>
                <nav className="navbar navbar-light bg-light">
                    <span className="navbar"><h3>Task Sphere</h3></span>
                    <div>
                        <Link to="/about" className="btn btn-link">About</Link>
                        <Link to="/contact" className="btn btn-link">Contact</Link>
                    </div>
                    {token && (
                        <div className="text-center">
                            <button className="btn btn-danger" style={{ marginRight: '10px' }} onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </nav>

                <Routes>
                    <Route
                        path="/login"
                        element={token ? <Navigate to="/todos" /> : <Login setToken={setToken} />}
                    />
                    <Route
                        path="/signup"
                        element={<Signup />}
                    />
                    <Route
                        path="/todos"
                        element={token ? <TodoList token={token} /> : <Navigate to="/login" />}
                    />
                    <Route path="/about" element={<About />} /> {/* Updated route */}
                    <Route path="/contact" element={<Contact />} /> {/* Updated route */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
