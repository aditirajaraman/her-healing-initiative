import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

const Profile: React.FC = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const url =  `${config.API_URL}/users/profile`;
                const res = await axios.get(url);
                setMessage(res.data.message);
            } catch (error) {
                console.error('Failed to fetch profile', error);
                logout();
                navigate('/login');
            }
        };
        if (token) {
            fetchProfile();
        }
    }, [token, logout, navigate]);

    return (
        <div>
            <h1>Profile Page</h1>
            <p>{message}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Profile;