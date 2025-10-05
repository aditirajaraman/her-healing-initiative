import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { Divider } from 'primereact/divider';
import { Panel, PanelHeaderTemplateOptions  } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
 

const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

const FAQS: React.FC = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    return (    
        <div>
            <div className="lex justify-content-center flex-wrap">
                <div className="flex align-items-center justify-content-center pt-5">
                    <h1>Getting started: frequently asked questions</h1>
                </div>
            </div>
        </div>
    );
};

export default FAQS;