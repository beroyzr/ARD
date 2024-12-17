import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <Link to="/" className="px-4 py-2 hover:bg-gray-700 rounded">Home</Link> |
            <Link to="/media-scans" className="px-4 py-2 hover:bg-gray-700 rounded">Media Scans</Link> |
            <Link to="/case-tracking" className="px-4 py-2 hover:bg-gray-700 rounded">Case Tracking</Link>
        </nav>
    );
};

export default Navbar;
