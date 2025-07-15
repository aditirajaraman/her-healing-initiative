import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { SelectButton } from 'primereact/selectbutton';

const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

const EventInterest = ({eventData}) => {
    const [currentEvent, setCurrentEvent] = useState(null);
    useEffect(() => {
        console.log("----------Loaded ViewEvent-----------");
        //console.log(eventData);
        console.log(process.env.NODE_ENV?.trim());
        axios({
            url: config.API_URL + "/api/events/" + eventData.id,
            method: "GET",
            })
            .then((res) => {
                console.log("----------Loaded Event Data-----------");
                console.log(res.data);
                setCurrentEvent(res.data);
            })
            .catch((err) => {
                console.log(err);
        });
    }, []);  
    const [eventState, setEventState] = useState('Withdraw');
    const eventStateOptions = ['Withdraw Event', 'Resume Event', 'Cancel Event'];
    return (
    <div>
      Event Interest
    </div>
    );
};

export default EventInterest;