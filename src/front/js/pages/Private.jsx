import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import {Navbar} from "../component/Navbar.jsx";

export const Private = () => {
    const { actions } = useContext(Context);
    const [section, setSection] = useState("myInfo");
    const [userInfo, setUserInfo] = useState(null);
    const [usersList, setUsersList] = useState([]);

    const fetchMyInfo = async () => {
        try {
            const userInfoResponse = await actions.fetchMyInfo();
            setUserInfo(userInfoResponse);
        } catch (error) {
            console.error("Error fetching my info:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const usersListResponse = await actions.fetchUsers();
            setUsersList(usersListResponse);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchMyInfo();
    }, []);

    const handleSectionChange = newSection => {
        setSection(newSection);
    };

    return (
        <div className="container">
            <Navbar
                onSectionChange={handleSectionChange}
                fetchMyInfo={fetchMyInfo}
                fetchUsers={fetchUsers}
            />
            <div className="mt-3">
                {section === "myInfo" && (
                    <>
                        <h2>My Info</h2>
                        {userInfo ? (
                            <div>
                                <p>Email: {userInfo.email}</p>
                                <p>First Name: {userInfo.firstName}</p>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </>
                )}
                {section === "users" && (
                    <>
                        <h2>Users</h2>
                        {usersList.length > 0 ? (
                            <ul>
                                {usersList.map(user => (
                                    <li key={user.id}>
                                        {user.name} - {user.email}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No users found</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};