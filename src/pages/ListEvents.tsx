/*********************************1: Imports / react *************************************/
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/*********************************2: Prime React Imports ********************************/
import { Avatar } from 'primereact/avatar';
import { Tooltip } from 'primereact/tooltip';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { Badge } from 'primereact/badge';
import axios from 'axios';

/*********************************3: Imports / custom css *******************************/
import '../assets/css/prime-styles.css';
import '../assets/css/eventView.css';

/*********************************4: Imports / utils *******************************/
import { truncateString } from '../helpers/stringUtils';

/*********************************5: Imports / config *******************************/
const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

/*********************************6: Interfaces *******************************/
interface EventData {
    id:string,
    eventId:string;
};

/*********************************7: Component : View *******************************/
const ListEvents = () => {
    // 7.1 : Navigation
    const navigate = useNavigate();
    const handleCreateEvent = () => {
        navigate('/createEvent'); 
    };
    
    // 7.2 Variables  
    const currentEventData = {
        id:'',
        eventTitle:''
    };
    
    // 7.3 : State Management
    const hasRun = useRef(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [events, setEvents] = useState(null);
    const [layout, setLayout] = useState(null);
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);

    // 7.4 Utility functions 

    // 7.5 UI Templates
    const renderListItem = (data) => {
        return (
            <div className="col-12">
                <div className="product-list-item">
                    <img src={data.eventImage}/>
                    <div className="product-list-detail">
                        <div className="product-name">{data.eventTitle}</div>
                        <div className="product-description">{data.eventSummary}</div>
                        <Avatar image={require( `../assets/images/event-organizers/amyelsner.png`)} className="mr-2" size="normal" shape="circle" />
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.eventTag}</span>
                    </div>
                </div>
            </div>
        );
    }

    const renderHeader = () => {
        return (
            <div className="grid grid-nogutter">
                <div className="col-2">
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Event" onChange={onSortChange}/>
                </div>
                <div className="col-2">
                    <Button style={{float: 'left'}} label="Host Event" className="p-button-raised p-button-warning" onClick={handleCreateEvent}/>
                </div>
                <div className="col-8" style={{float: 'right'}}>
                    <DataViewLayoutOptions style={{float: 'right'}} layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </div>
        );
    }

    const renderGridItem = (data) => {
        return (
            <div className="col-12 md:col-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-content"> 
                        <img src={data.eventImage}/>
                        <div className="product-name" style={{cursor:'pointer'}} onClick={() => handleEventClick(data._id, data.eventId)}>{truncateString(data.eventTitle, 35)}</div>
                        <i className="pi pi-tag product-category-icon"></i>
                        <span className="product-category">{data.eventTag}</span>
                        <div className="product-description">{data.eventSummary}</div>
                    </div>
                    <div className="product-list-action">
                        <Tooltip target=".registered-users" />
                        <i className="registered-users pi pi-check-circle mr-4 p-text-secondary p-overlay-badge" data-pr-tooltip="Registered Users" data-pr-position="bottom" data-pr-at="right+5 top" data-pr-my="left center-2" style={{ fontSize: '2rem', float: 'left', cursor: 'pointer'}}><Badge value="2"></Badge></i>
                        <Tooltip target=".interested-users" />
                        <i className="interested-users pi pi-question-circle mr-4 p-text-secondary p-overlay-badge" data-pr-tooltip="Interested Users" data-pr-position="bottom" data-pr-at="right+5 top" data-pr-my="left center-2" style={{ fontSize: '2rem', float: 'left', cursor: 'pointer'}}><Badge value="10+"></Badge></i>
                        <Tooltip target=".liked" />
                        <i className="liked pi pi-thumbs-up mr-4 p-text-secondary p-overlay-badge" data-pr-tooltip="Likes !" data-pr-position="bottom" data-pr-at="right+5 top" data-pr-my="left center-2"  style={{ fontSize: '2rem', float: 'left', cursor: 'pointer' }}><Badge value="100"></Badge></i>
                    </div>
                </div>
            </div>
        );
    }

    const renderItem = (event, layout) => {
        if (layout === 'list')
            return renderListItem(event);
        else if (layout === 'grid')
            return renderGridItem(event);
        else
            return null;
    }

    const sortOptions = [
        {label: 'Event Date', value: 'date'},
        {label: 'Event Category', value: 'category'},
        {label: 'Event Name', value: 'name'}
    ];

    // 7.6: Event Handlers
    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        }
        else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    }

    const handleEventClick = (id, eventId) => {
        //console.log(id)
        let currentEventData:EventData = {
            id : id,
            eventId : eventId
        }
        //console.log(currentEventData);
        navigate('/viewEvent', { state: { eventData : currentEventData } }); 
    }

    // 7.7 React Hooks for Component OnLoad() 
    useEffect(() => {
        setLoading(true);

        axios({
        // Endpoint to send files
        url: config.API_URL + "/events",
        method: "GET",
        headers: {
            // Add any auth token here
            //authorization: "your token comes here",
        },
        })
        // Handle the response from backend here
        .then((res) => {
            console.log("----------process.env---------");
            console.log(process.env.NODE_ENV);
            console.log(res.data);
            setEvents(res.data);
            setLayout("grid");
            setLoading(false); // Stop loading after data is fetched
        })
        .catch(() => {
            //console.log("----------process.env---------");
            //console.log(process.env.NODE_ENV);
            //console.log(err);
            setError("Failed to load events.");
            setLoading(false); // Stop loading on error
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // 7.8 : Page Handlers and Logic
    if (loading) {
        return <div>Loading Events...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    
  return (
     <div className="grid">
      {/* ---------------------------Upcoming Events --------------------- */}
      <Divider align="left">
          <div className="inline-flex align-items-center">
              <i className="pi pi-user mr-2" style={{color: 'green', 'fontSize': '2em'}}></i>
              <b>Upcoming Events</b>
          </div>
      </Divider>
      {/* --------------------------- Events--------------------- */}
      <div className="dataview-event">
        <div className="card">
            <DataView layout={layout} 
                value={events}
                header={renderHeader()}
                itemTemplate={(event, layout) => renderItem(event, layout)}
                paginator rows={9}
                sortOrder={sortOrder} sortField={sortField} />
        </div>
      </div>    
    </div>
  );
};

export default ListEvents;