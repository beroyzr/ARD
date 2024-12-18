import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const handleLogout = () => {
        logout(); // Clear auth state
        navigate("/login");
    };

    if (!isAuthenticated) {
        return null; // Don't show navbar if not authenticated
    }

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
