import React from "react";
import { useNavigate } from 'react-router-dom';
import '../../styles/navbar.css';

export const Navbar = ({ setActiveSection }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <button className="btn navbar-btn" onClick={() => setActiveSection('myInfo')}>
                    My Info
                </button>
                <button className="btn navbar-btn" onClick={() => setActiveSection('users')}>
                    Users
                </button>
                <div className="ml-auto">
                    <button className="btn navbar-btn" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};
