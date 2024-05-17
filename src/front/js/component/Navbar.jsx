import React from "react";

export const Navbar = ({ onSectionChange, fetchMyInfo, fetchUsers }) => {
    const handleMyInfoClick = () => {
        onSectionChange("myInfo");
        fetchMyInfo();
    };

    const handleUsersClick = () => {
        onSectionChange("users");
        fetchUsers();
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <button className="btn btn-link navbar-brand mb-0 h1" onClick={handleMyInfoClick}>
                    My Info
                </button>
                <button className="btn btn-link navbar-brand mb-0 h1" onClick={handleUsersClick}>
                    Users
                </button>
                <div className="ml-auto">
                    <button className="btn btn-primary">Logout</button>
                </div>
            </div>
        </nav>
    );
};