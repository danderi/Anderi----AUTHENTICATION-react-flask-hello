import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../component/Navbar.jsx';
import '../../styles/private.css';

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
                        <div className="info-item">
                            <strong>Email:</strong> {userInfo.email}
                        </div>
                        <div className="info-item">
                            <strong>Name:</strong> {userInfo.first_name}
                        </div>
                        <div className="info-item">
                            <strong>Last Name:</strong> {userInfo.last_name}
                        </div>
                    </div>
                )}
                {activeSection === 'users' && (
                    <div className="card">
                        <h2>Users</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Name</th>
                                    <th>Last Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.email}</td>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};






