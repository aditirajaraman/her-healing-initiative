import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import '../assets/css/prime-styles.css';
import '../assets/css/eventView.css';

import { Card } from 'primereact/card';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';

import axios from 'axios';

const imageList = ["arts.png", "hackathon.png"]
//const arts =  require("../assets/images/events/arts.png");
//const hackathon =  require("../assets/images/events/hackathon.png");

const getImagePath = (image) => {
    return './assets/images/' + image + '.png';
}

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
                    <img src={require( `../assets/images/${data.eventImage}.png`)}/>
                    <div className="product-list-detail">
                        <div className="product-name">{data.eventTitle}</div>
                        <div className="product-description">{data.eventSummary}</div>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{"hackathons"}</span>
                    </div>
                    <div className="product-list-action">
                        <Button icon="pi pi-shopping-cart" label="More"></Button>
                    </div>
                </div>
            </div>
        );
    }

    const renderGridItem = (data) => {
        return (
            <div className="col-12 md:col-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{"hackathons"}</span>
                        </div>
                    </div>
                    <div className="product-grid-item-content">
                    <img src={require( `../assets/images/${data.eventImage}.png`)}/>
                        <div className="product-name">{data.eventTitle}</div>
                        <div className="product-description">{data.eventSummary}</div>
                    </div>
                    <div className="product-grid-item-bottom">
                        <Button icon="pi pi-shopping-cart" label="More"></Button>
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