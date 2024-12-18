import React from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Login = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const setAuth = useAuthStore((state) => state.setAuth);

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleLoginSuccess = (token) => {
        setAuth(true); // Update isAuthenticated state to true
        navigate("/");
    };

    return (
        <div>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
    );
};

export default Login;
