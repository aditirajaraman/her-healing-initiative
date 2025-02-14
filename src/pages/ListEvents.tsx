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

import axios from 'axios';

const ListEvents = () => {
    const navigate = useNavigate();
    const handleCreateEvent = () => {
        navigate('/createEvent'); 
    };

    useEffect(() => {
        axios({
        // Endpoint to send files
        url: "http://localhost:5500/api/events",
        method: "GET",
        headers: {
            // Add any auth token here
            //authorization: "your token comes here",
        },
        })
        // Handle the response from backend here
        .then((res) => {
            console.log(res.data);
            setEvents(res.data);
            setLayout("grid");
        })
        .catch((err) => {
            console.log(err);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const [events, setEvents] = useState(null);
    const [layout, setLayout] = useState(null);
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
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
                    <img src={require( `../assets/images/events/${data.eventImage}.png`)}/>
                    <div className="product-list-detail">
                        <div className="product-name">{data.eventTitle}</div>
                        <div className="product-description">{data.eventSummary}</div>
                        <Avatar image={require( `../assets/images/event-organizers/${data.eventOrganizer}.png`)} className="mr-2" size="normal" shape="circle" />
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
                        <img src={require( `../assets/images/events/${data.eventImage}.png`)}/>
                        <div className="product-name">{data.eventTitle}</div>
                        <i className="pi pi-tag product-category-icon"></i>
                        <span className="product-category">{data.eventTag}</span>
                        <div className="product-description">{data.eventSummary}</div>
                    </div>
                    <div className="product-list-action">
                        <Tooltip target=".registered-users" />
                        <i className="registered-users pi pi-check-circle mr-4 p-text-secondary p-overlay-badge" data-pr-tooltip="Registered Users" data-pr-position="bottom" data-pr-at="right+5 top" data-pr-my="left center-2" style={{ fontSize: '2rem', float: 'left', cursor: 'pointer', color:'green' }}><Badge value="2" severity="success" ></Badge></i>
                        <Tooltip target=".interested-users" />
                        <i className="interested-users pi pi-question-circle mr-4 p-text-secondary p-overlay-badge" data-pr-tooltip="Interested Users" data-pr-position="bottom" data-pr-at="right+5 top" data-pr-my="left center-2" style={{ fontSize: '2rem', float: 'left', cursor: 'pointer', color:'orange' }}><Badge value="10+" severity="warning" ></Badge></i>
                        <Tooltip target=".liked" />
                        <i className="liked pi pi-thumbs-up mr-4 p-text-secondary p-overlay-badge" data-pr-tooltip="Likes !" data-pr-position="bottom" data-pr-at="right+5 top" data-pr-my="left center-2"  style={{ fontSize: '2rem', float: 'left', cursor: 'pointer', color:'darkblue' }}><Badge value="100" severity="info"></Badge></i>
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
                <div className="col-6">
                    <Dropdown style={{float: 'left'}} options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Event" onChange={onSortChange}/>
                </div>
                <div className="col-6" style={{float: 'right'}}>
                    <DataViewLayoutOptions style={{float: 'right'}} layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </div>
        );
    }

    const header = renderHeader();
    
  return (
     <div className="grid">
      
      <div className="col-12">
        <Button style={{float: 'right'}} label="Create Event" className="p-button-raised p-button-warning" onClick={handleCreateEvent}/>
      </div>
      
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