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
        <div >
            <div className="lex justify-content-center flex-wrap">
                <div className="flex align-items-center justify-content-center pt-2">
                    <h1>Frequently asked questions</h1>
                </div>
            </div>
            <div className="grid" style={{padding: '2rem'}}>
                <div className="col-6">
                    <Panel header="Do we need to Create an Account?" toggleable>
                       <ul style={{ listStyleType: 'decimal', paddingLeft: '1.5rem' }} >
                        <li>What are the advantages of creating an Account
                            <p>Creating an account allows you to access additional features such as creating events, writing blogs, and engaging with the community.</p>
                        </li>
                        <li>What are the linitations of not registering?
                            <p>Without an account, you can browse events and read blogs, but you won't be able to create events, write blogs, or engage with the community.
                            </p>
                        </li>
                       </ul>
                    </Panel>
                </div>
                <div className="col-6">
                    <Panel header="Event Management" toggleable>
                        <ul style={{ listStyleType: 'decimal', paddingLeft: '1.5rem' }} >
                            <li>How to share & like events ?
                                <p>To share an event, click the share button and choose your preferred platform. To like an event, click  the like button.</p>
                            </li>
                            <li>What are the advantages of hosting an Event at her-healing initiative?
                                <p>Hosting an event allows you to reach a wider audience, engage with the community, and promote your cause effectively.</p>
                            </li>
                       </ul>
                    </Panel>
                </div>
                <div className="col-6">
                    <Panel header="Blogs" toggleable>
                        <ul style={{ listStyleType: 'decimal', paddingLeft: '1.5rem' }} >
                            <li>How to share & like events ?
                                <p>To share an event, click the share button and choose your preferred platform. To like an event, click  the like button.</p>
                            </li>
                            <li>What are the advantages of hosting an Event at her-healing initiative?
                                <p>Hosting an event allows you to reach a wider audience, engage with the community, and promote your cause effectively.</p>
                            </li>
                       </ul>
                    </Panel>
                </div>
                <div className="col-6">
                    <Panel header="Donations" toggleable>
                        <ul style={{ listStyleType: 'decimal', paddingLeft: '1.5rem' }} >
                            <li>How to share & like events ?
                                <p>To share an event, click the share button and choose your preferred platform. To like an event, click  the like button.</p>
                            </li>
                            <li>What are the advantages of hosting an Event at her-healing initiative?
                                <p>Hosting an event allows you to reach a wider audience, engage with the community, and promote your cause effectively.</p>
                            </li>
                       </ul>
                    </Panel>
                </div>
            </div>
        </div>
    );
};

export default FAQS;