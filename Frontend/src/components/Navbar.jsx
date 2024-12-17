import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear token
        navigate("/login"); // Redirect to login page
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <Link to="/" className="px-4 py-2 hover:bg-gray-700 rounded">Home</Link>
            <Link to="/media-scans" className="px-4 py-2 hover:bg-gray-700 rounded">Media Scans</Link>
            <Link to="/case-tracking" className="px-4 py-2 hover:bg-gray-700 rounded">Case Tracking</Link>
            <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 bg-red-500 rounded hover:bg-red-700"
            >
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
