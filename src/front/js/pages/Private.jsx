import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../component/Navbar.jsx';

export const Private = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [userList, setUserList] = useState([]);
    const [activeSection, setActiveSection] = useState('myInfo');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        } else {
            // Si hay token, se carga la información del usuario
            fetchUserInfo();
        }
    }, [navigate]);

    useEffect(() => {
        if (activeSection === 'myInfo') {
            fetchUserInfo();
        } else if (activeSection === 'users') {
            fetchUserList();
        }
    }, [activeSection]);

    const fetchUserInfo = async () => {
        const data = await actions.getUserInfo();
        setUserInfo(data);
    };

    const fetchUserList = async () => {
        const data = await actions.getUserList();
        setUserList(data);
    };

    return (
        <div>
            <Navbar setActiveSection={setActiveSection} />
            <div className="private-container">
                {activeSection === 'myInfo' && userInfo && (
                    <div className="card">
                        <h2>My Info</h2>
                        <p>Email: {userInfo.email}</p>
                        <p>Name: {userInfo.first_name}</p>
                        <p>Last Name: {userInfo.last_name}</p>
                    </div>
                )}
                {activeSection === 'users' && (
                    <div className="card">
                        <h2>Users</h2>
                        <ul>
                            {userList.map(user => (
                                <li key={user.id}>
                                    <p>Email: {user.email}</p>
                                    <p>Name: {user.first_name}</p>
                                    <p>Last Name: {user.last_name}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};





