import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Card } from 'primereact/card';

const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

const ViewEvent = ({eventData}) => {
    const [currentEvent, setCurrentEvent] = useState(null);
    useEffect(() => {
        //console.log("----------Loaded ViewEvent-----------");
        //console.log(eventData);
        console.log(process.env.NODE_ENV?.trim());
        axios({
            url: config.API_URL + "/events/" + eventData.id,
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
        <Accordion activeIndex={0} multiple>
            <AccordionTab header="Event Summary">
            <div className="grid">
                <div className="col-3">
                    <b>Event Title</b>
                </div>
                <div className="col-9">
                    {currentEvent?.eventTitle}
                </div>
                <div className="col-3">
                    <b>Event SubTitle</b>
                </div>
                <div className="col-9">
                    {currentEvent?.eventSubTitle}
                </div>
                <div className="col-3">
                    <b>Event Summary</b>
                </div>
                <div className="col-9">
                    {currentEvent?.eventSummary}
                </div>
            </div>
            </AccordionTab>
            <AccordionTab header="Event Schedule">
                <div className="grid">
                    <div className="col-3">
                        <b>Event Date</b>
                    </div>
                    <div className="col-9">
                        {currentEvent?.eventDate}
                    </div>
                        <div className="col-3">
                        <b>Event Start Time</b>
                    </div>
                    <div className="col-9">
                        {currentEvent?.eventStartTime}
                    </div>
                     <div className="col-3">
                        <b>End Time</b>
                    </div>
                    <div className="col-9">
                        {currentEvent?.eventEndTime}
                    </div>
                </div>
            </AccordionTab>
            <AccordionTab header="Event Itinerary">
                {currentEvent?.itenaries?.map((itenary) => (
                    <Card title={itenary.title} style={{ width: '25rem', marginBottom: '2em' }}>
                        <p>{itenary.description}</p>
                    </Card>
                ))}
            </AccordionTab>
            <AccordionTab header="FAQs">
                <ol className="pl-3">
                    {currentEvent?.faqs?.map((faq, index) => (
                    <li key={index} className="mb-3">
                        <b>{faq.question}</b>
                        <p>{faq.answer}</p>
                    </li>
                    ))}
                </ol>
            </AccordionTab>
        </Accordion>
    </div>
    );
};

export default ViewEvent;