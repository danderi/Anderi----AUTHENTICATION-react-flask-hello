import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../component/Navbar.jsx';
import {Card} from 'react-bootstrap/Card';


export const Private = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [userList, setUserList] = useState([]);
    const [activeSection, setActiveSection] = useState('myInfo');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
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
            {activeSection === 'myInfo' && userInfo && (
                <div>
                    <h2>My Info</h2>
                    <Card>
                        <Card.Body>
                            <Card.Title>Email: {userInfo.email}</Card.Title>
                            <Card.Text>
                                Name: {userInfo.firstName} {userInfo.lastName}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )}
            {activeSection === 'users' && (
                <div>
                    <h2>Users</h2>
                    {userList.map(user => (
                        <Card key={user.id}>
                            <Card.Body>
                                <Card.Title>Email: {user.email}</Card.Title>
                                <Card.Text>
                                    Name: {user.firstName} {user.lastName}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};




