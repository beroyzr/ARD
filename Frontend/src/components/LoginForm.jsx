import React, { useState } from "react";
import { login } from "../services/api";

const LoginForm = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const { token } = await login(email, password); // Call backend login function
            localStorage.setItem("token", token); // Store token in localStorage
            onLoginSuccess(token); // Call parent callback
        } catch (err) {
            setError(err.message || "Login failed on comp");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full"
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full"
                    required
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="btn btn-primary w-full">
                Login
            </button>
        </form>
    );
};

export default LoginForm;
