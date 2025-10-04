/*********************************1: Imports / react *************************************/
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

/*********************************2: Prime React Imports ********************************/
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Avatar } from 'primereact/avatar';
import { Fieldset } from 'primereact/fieldset';
import { Toolbar } from 'primereact/toolbar';

/*********************************3: Imports / custom css *******************************/
import '../assets/css/prime-styles.css';
import '../assets/css/viewEvent.css';

/*********************************4: Start : Application Code ***************************/
// 4.1 : Configuration

const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

interface EventData {
  id: string;
  eventId: string;
  eventImage: string;
  eventTitle: string;
  eventSubTitle: string;
  eventSummary: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventLocationType: string;
  eventLocation: string;
  eventOrganizers:string[];
  eventOrganizersFullNames:string[];
  itenaries:any[];
  faqs:any[];
}

interface SelectedEvent {
    eventId:string;
};

const ViewEvent : React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentEventState = location.state?.eventData as EventData;

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentEvent, setCurrentEvent] = useState<EventData | null>(null);
    const [eventId, setEventId] = useState<string>();

    const formatTime = (isoString: string) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const itemTemplate = (event) => {
        return renderListItem(event);
    }

    const renderListItem = (data) => {
        return (
            <div className="col-12">
                <div className="event-list-item">
                    <img src="https://blog.her-healing-initiative.org/arts.png"/>
                    <div className="event-list-detail">
                        <div className="event-name" style={{cursor:'pointer'}}>{data.title}</div>
                        <div className="event-description">{data.description}</div>
                        <div className="event-description"><b>Location</b> :<i>{data.location}</i></div>
                        <div className="event-description">
                            <b>Start Time</b> : {formatTime(data.startTime)} &nbsp; | &nbsp;
                            <b>End Time</b> : {formatTime(data.endTime)}
                        </div>
                        <Avatar style={{'paddingLeft':'25px'}}image={require( `../assets/images/event-organizers/elwinsharvill.png`)} className="mr-2" size="normal" shape="circle" />
                    </div>
                </div>
            </div>
        );
    }

    // Add this utility function at the top (inside or outside the component)
    const formatToDate = (isoString: string) => {
        if (!isoString) return '';
            const date = new Date(isoString);
            return date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
        }).replace(/ /g, ' ');
    };

    const formatToTime = (isoString: string) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    };
    
    useEffect(() => {
        // Only fetch data if blogData exists
        if (!currentEventState) {
            setError("No Event data passed to this page.");
            setLoading(false);
            return;
        }
        console.log("----------Loaded ViewEvent-----------");
        console.log(currentEventState.id);
        // Async function to handle the API call
        const fetchEventData = async () => {
            try {
                const response = await axios.get(
                    config.API_URL + "/events/" + currentEventState.id,
                    {
                        headers: {
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0'
                        }
                    }
                );
                // Correct: Set state only after the data has been successfully fetched
                setCurrentEvent(response.data);
                setEventId(currentEventState.id);
            } catch (err) {
                    console.error("Failed to fetch event data:", err);
                    setError("Failed to load event. Please try again later.");
            } finally {
                // Correct: Always set loading to false when the request completes
                setLoading(false);
            }
        };
        fetchEventData();
    }, [currentEventState]);

    if (loading) {
        return <div>Loading Event...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!currentEvent) {
        return <div>Event not found.</div>;
    }

    const handleEdit = () => {
        //console.log('-------Edit Event Clicked--------');
        //console.log(eventId);
        navigate(`/editEvent?eventId=${eventId}`);
    };

    const handleDelete = () => {
        //navigate('/createEvent'); 
    };

    const handleBookmark = () => {
        //navigate('/createEvent'); 
    };

    const rightContents = () => {
        return (
            <React.Fragment>
                <Button icon="pi pi-user-edit" className="p-button-success mr-2" onClick={() => handleEdit()} />
                <Button icon="pi pi-trash" className="p-button-danger mr-2" onClick={handleDelete}/>
                <Button icon="pi pi-bookmark" className="p-button-info" onClick={handleBookmark}/>
            </React.Fragment>
        );
    }
   
    return (
    <div className="w-90" style={{padding:'2rem'}}>
        <div>
            <Toolbar end={rightContents} style={{backgroundColor: 'lightsteelblue'}}/>
        </div>
        <br></br>
        <div className="grid">
            {/* ---------------------------------Banner------------------------------------ */} 
            <div className="col-12">
                <img src={currentEvent.eventImage} style={{width:'100%', height:'300px'}}/>
            </div> 
        </div>
         <div className="card">
            <Fieldset legend="Event Summary" className="left-align-legend" toggleable>
                <h5>{currentEvent?.eventTitle.toUpperCase()}:{currentEvent.eventId}</h5>
                <Button icon="pi pi-tag" className="p-button-rounded p-button-secondary p-button-text">
                    &nbsp;{currentEvent?.eventSubTitle}
                </Button>
                <br/>
                <br/>
                <p>{currentEvent?.eventSummary}</p>
            </Fieldset>
            <Fieldset legend="Event Organizers" className="left-align-legend" toggleable>
                <ol className="pl-3">
                    {currentEvent?.eventOrganizersFullNames?.map((eventOrganizer) => (
                    <li className="mb-3">
                        <b>{eventOrganizer}</b>
                    </li>
                    ))}
                </ol>
            </Fieldset>
            <Fieldset legend="Event Location" className="left-align-legend" toggleable>
                <div className="grid">
                    <div className="col-2">
                        <b>Location Type</b>
                    </div>
                    <div className="col-10">
                        {currentEvent?.eventLocationType}
                    </div>
                    {currentEvent?.eventLocationType == 'Venue' && (
                        <div className="col-2">
                            <b>Event Location</b>
                        </div>
                    )}
                    {currentEvent?.eventLocationType == 'Venue' && (
                        <div className="col-2">
                           {currentEvent?.eventLocation}
                        </div>
                    )}
                </div>
            </Fieldset>  
            <Fieldset legend="Event Schedule" className="left-align-legend" toggleable>
                <div className="grid">
                    <div className="col-2">
                        <b>Event Date</b>
                    </div>
                    <div className="col-10">
                        {formatToDate(currentEvent?.eventDate)}
                    </div>
                        <div className="col-2">
                        <b>Start Time</b>
                    </div>
                    <div className="col-10">
                        {formatToTime(currentEvent?.eventStartTime)}
                    </div>
                     <div className="col-2">
                        <b>End Time</b>
                    </div>
                    <div className="col-10">
                        {formatToTime(currentEvent?.eventEndTime)}
                    </div>
                </div>
            </Fieldset>
            <Fieldset legend="Event Itenary" className="left-align-legend" toggleable>
                <div className="dataview-event">
                    <DataView layout={'list'}
                        value={currentEvent?.itenaries}
                        itemTemplate={itemTemplate}
                        paginator rows={9}/>
                </div>
            </Fieldset>
            <Fieldset legend="FAQS" className="left-align-legend" toggleable>
                <ol className="pl-3">
                    {currentEvent?.faqs?.map((faq) => (
                    <li className="mb-3">
                        <b>{faq.question}</b>
                        <p>{faq.answer}</p>
                    </li>
                    ))}
                </ol>
            </Fieldset>
        </div>
    </div>
    );
};

export default ViewEvent;