import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="home-page">
            <section className="hero">
                <h1>Welcome to Garavel</h1>
                <p>Experience the future of reservation and AI services.</p>
                <div className="hero-actions">
                    <Link to="/booking" className="btn btn-primary">Book Now</Link>
                    <Link to="/register" className="btn btn-secondary">Get Started</Link>
                </div>
            </section>

            <section className="features">
                <div className="feature-card">
                    <h3>AI Services</h3>
                    <p>Utilize our advanced AI for nail simulation and more.</p>
                </div>
                <div className="feature-card">
                    <h3>Easy Booking</h3>
                    <p>Seamless reservation process for all your needs.</p>
                </div>
                <div className="feature-card">
                    <h3>Secure</h3>
                    <p>Your data is protected with top-tier security.</p>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
