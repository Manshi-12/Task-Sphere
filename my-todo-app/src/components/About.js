// src/components/About.js
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="container mt-5">
            <h2>About Us</h2>
            <p>Task Sphere is an innovative task management application designed to help you organize your tasks effectively. Our mission is to provide a user-friendly platform that simplifies task tracking and enhances productivity.</p>
            <p>With features like a simple interface, user authentication, and priority settings, we strive to meet the needs of our users. Whether you're a student, professional, or just looking to manage your daily tasks, Task Sphere is here to assist you!</p>
            <Link to="/login" className="btn btn-primary mt-3">Back to Login</Link>
        </div>
    );
};

export default About;
