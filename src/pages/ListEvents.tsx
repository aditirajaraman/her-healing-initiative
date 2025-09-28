import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import { Tooltip } from 'primereact/tooltip';

import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import '../assets/css/prime-styles.css';
import '../assets/css/eventView.css';

import { Card } from 'primereact/card';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { Badge } from 'primereact/badge';
import { Dialog } from 'primereact/dialog';

import { truncateString } from '../helpers/stringUtils';

import axios from 'axios';

import ViewEvent from './ViewEvent';

const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

const ListEvents = () => {
    const navigate = useNavigate();
    const handleCreateEvent = () => {
        navigate('/createEvent'); 
    };

    useEffect(() => {
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
        })
        .catch((err) => {
            console.log("----------process.env---------");
            console.log(process.env.NODE_ENV);
            console.log(err);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const [events, setEvents] = useState(null);
    const [layout, setLayout] = useState(null);
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const currentEventData = {
        id:'',
        eventTitle:''
    };
    const [currentEvent, setCurrentEvent] = useState(currentEventData);

    const sortOptions = [
        {label: 'Event Date', value: 'date'},
        {label: 'Event Category', value: 'category'},
        {label: 'Event Name', value: 'name'}
    ];

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

    const renderGridItem = (data) => {
        return (
            <div className="col-12 md:col-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-content"> 
                        <img src={data.eventImage}/>
                        <div className="product-name" onClick={() => handleEventClick('displayEvent', 'center', data._id,  data.eventTitle)}  style={{cursor:'pointer'}}>{truncateString(data.eventTitle, 35)}</div>
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

    const itemTemplate = (event, layout) => {
        if (layout === 'list')
            return renderListItem(event);
        else if (layout === 'grid')
            return renderGridItem(event);
        else
            return null;
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

    const header = renderHeader();

    const [displayEvent, setDisplayEvent] = useState(false);
    const [position, setPosition] = useState('center');
    const dialogFuncMap = {
        'displayEvent': setDisplayEvent
    }

    const handleEventClick = (name, position, id, eventTitle) => {
        //console.log(id)
        currentEventData.id = id;
        currentEventData.eventTitle = eventTitle;
        setCurrentEvent(currentEventData);

        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Edit Event" icon="pi pi-pencil" onClick={() => onHide(name)} autoFocus />
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>    
                <Button label="Delete Event" icon="pi pi-trash" severity='danger' onClick={() => onHide(name)}/>
            </div>
        );
    }
    
  return (
    
     <div className="grid">
        {/* ---------------------------View Event --------------------- */}
        <Dialog header={currentEvent.eventTitle} visible={displayEvent} style={{ width: '60vw' }} footer={renderFooter('displayEvent')} onHide={() => onHide('displayEvent')}>
        <br></br>
        <ViewEvent eventData={currentEvent}/>
      </Dialog>  

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
                header={header}
                itemTemplate={itemTemplate}
                paginator rows={9}
                sortOrder={sortOrder} sortField={sortField} />
        </div>
      </div>    
    </div>
  );
};

export default ListEvents;