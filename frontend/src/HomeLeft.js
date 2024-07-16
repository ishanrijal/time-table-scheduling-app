import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function HomeLeft() {
  return (
    <div className="home-left">
        <h1 className="home-title">SYNCED</h1>
        <div className="text-container">
            <h2>Master Your Time, Seamlessly</h2>
            <p>At SYNCED, we make time management effortless. Our intuitive platform helps you organize your schedule in one place, so you can stay on top of your day and achieve your goals with ease. Transform your time management with SYNCED and focus on what truly matters.</p>
        </div>
        <div className="btn-container">
            <Link to="/login" className="btn login-btn">Log In</Link>
            <Link to="/signup" className="btn signup-btn">Sign Up</Link>
        </div>
    </div>
  );
}

export default HomeLeft;
