import React from "react";
import { useNavigate } from 'react-router-dom';

export const Navbar = ({ setActiveSection }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwt-token');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <button className="btn btn-link navbar-brand mb-0 h1" onClick={() => setActiveSection('myInfo')}>
                    My Info
                </button>
                <button className="btn btn-link navbar-brand mb-0 h1" onClick={() => setActiveSection('users')}>
                    Users
                </button>
                <div className="ml-auto">
                    <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};