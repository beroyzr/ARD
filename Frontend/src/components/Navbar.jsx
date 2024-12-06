import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Home</Link> | <Link to="/media-scans">Media Scans</Link> | <Link to="/case-tracking">Case Tracking</Link>
        </nav>
    );
};

export default Navbar;
