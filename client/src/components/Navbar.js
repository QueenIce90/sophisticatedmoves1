// Navigation component (e.g., NavBar.js)
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function NavBar() {
    
    return (
    <div className="navbar">
        <ul>
        <img className="logo" src='/logo.png' alt="logo"/>
        </ul>
        <ul>
            <NavLink to="/">
            <button className="navbar-button">Home</button>
            </NavLink>

            <NavLink to="/services">
            <button className="navbar-button">Services</button>
            </NavLink>

            <NavLink to="/contact">
            <button className="navbar-button">Contact Us</button>
            </NavLink>

            <NavLink to="/quote">
            <button className="navbar-button">Free Quote</button>
            </NavLink>
            <span class="material-symbols-outlined">close</span>
    </ul>
        <span class="material-symbols-outlined">menu</span>
    </div>
    );
}

export default NavBar;