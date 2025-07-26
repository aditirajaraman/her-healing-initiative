/*********************************1: Imports / react *************************************/
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

/*********************************2: Imports / primereact ********************************/ 
import { Accordion, AccordionTab } from 'primereact/accordion';
import { SelectButton } from 'primereact/selectbutton';
import { Card } from 'primereact/card';

/*********************************3: Imports / custom css ********************************/

/*********************************4: Imports config ********************************/
const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

/*********************************5: Start : Application Code ********************************/
const ViewBlog = ({blogData}) => {
    const [currentBlog, setCurrentBlog] = useState(null);
    useEffect(() => {
        //console.log("----------Loaded ViewBlog-----------");
        //console.log(eventData);
        console.log(process.env.NODE_ENV?.trim());
        axios({
            url: config.API_URL + "/api/blogs/" + blogData.id,
            method: "GET",
            })
            .then((res) => {
                console.log("----------Loaded Blog Data-----------");
                console.log(res.data);
                setCurrentBlog(res.data);
            })
            .catch((err) => {
                console.log(err);
        });
    }, []); 
    
    return (
        <div>
            <Card style={{ marginBottom: '2em' }}>
                <h3>What is endometriosis?</h3>
                <p>{currentBlog?.content}</p>
            </Card>
        </div>
    );
};

/*********************************5: End : Application Code ********************************/
export default ViewBlog;