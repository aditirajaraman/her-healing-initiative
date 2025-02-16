import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { SelectButton } from 'primereact/selectbutton';

const ViewEvent = ({eventData}) => {
    const [currentEvent, setCurrentEvent] = useState(null);
    useEffect(() => {
        //console.log("----------Loaded ViewEvent-----------");
        //console.log(eventData);
        axios({
            url: "http://localhost:5500/api/events/" + eventData.id,
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
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>
            </AccordionTab>
            <AccordionTab header="Event Itinerary">
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>
            </AccordionTab>
            <AccordionTab header="Event Management">
            <div className="grid">
                <div className=" col-12 md:col-12">
                    <SelectButton value={eventState} options={eventStateOptions} onChange={(e) => setEventState(e.value)} />
                </div>
            </div>
            </AccordionTab>
            <AccordionTab header="FAQs">
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
                cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
            </AccordionTab>
        </Accordion>
    </div>
    );
};

export default ViewEvent;