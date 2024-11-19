// src/components/Contact.js
import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <div className="container mt-5">
            <h2>Contact Us</h2>
            <p>If you have any questions or feedback, feel free to reach out!</p>
            <h5>Email:</h5>
            <p>support@tasksphere.com</p>
            <h5>Phone:</h5>
            <p>+123 456 7890</p>
            <h5>Follow us on social media:</h5>
            <p>
                <a href="https://twitter.com/tasksphere" target="_blank" rel="noopener noreferrer">Twitter</a> | 
                <a href="https://facebook.com/tasksphere" target="_blank" rel="noopener noreferrer"> Facebook</a>
            </p>
            <Link to="/login" className="btn btn-primary mt-3">Back to Login</Link>
        </div>
    );
};

export default Contact;
