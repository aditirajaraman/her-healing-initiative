import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { Avatar } from 'primereact/avatar';
import { Tooltip } from 'primereact/tooltip';
import { Badge } from 'primereact/badge';
import axios from 'axios';

import '../assets/css/prime-styles.css';
import '../assets/css/eventView.css';
const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');
const ListBlogs = () => {
    /***********api call : start ********************/
    useEffect(() => {
    axios({
    // Endpoint to send files
    url: config.API_URL + "/api/blogs",
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
        setBlogs(res.data);
        setLayout("grid");
    })
    .catch((err) => {
        console.log("----------process.env---------");
        console.log(process.env.NODE_ENV);
        console.log(err);
    });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    /***********api call : end ********************/

    const [blogs, setBlogs] = useState(null);    
    const sortOptions = [
      {label: 'Blog Date', value: 'date'},
      {label: 'Blog Category', value: 'category'},
      {label: 'Blog Name', value: 'name'}
    ];
    const [sortKey, setSortKey] = useState(null);
    const [layout, setLayout] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const navigate = useNavigate();
    const handleCreateBlog = () => {
        navigate('/createBlog'); 
    };
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
    const renderHeader = () => {
        return (
            <div className="grid grid-nogutter">
                <div className="col-2">
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Event" onChange={onSortChange}/>
                </div>
                <div className="col-8" style={{float: 'right'}}>
                    <DataViewLayoutOptions style={{float: 'right'}} layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </div>
        );
    }

     const renderListItem = (data) => {
            return (
                <div className="col-12">
                    <div className="product-list-item">
                        <img src={require( `../assets/images/events/${data.imglink}.png`)}/>
                        <div className="product-list-detail">
                            <div className="product-name">{data.title}</div>
                            <div className="product-description">{data.description}</div>
                            <Avatar image={require( `../assets/images/event-organizers/${data.authoricon}.png`)} className="mr-2" size="normal" shape="circle" />
                            <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.tag}</span>
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
                        <img src={require( `../assets/images/events/${data.imglink}.png`)}/>
                        <div className="product-name" style={{cursor:'pointer'}}>{data.title}</div>
                        <i className="pi pi-tag product-category-icon"></i>
                        <span className="product-category">{data.tag}</span>
                        <div className="product-description">{data.description}</div>
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
    
    const header = renderHeader()

    const itemTemplate = (event, layout) => {
    if (layout === 'list')
        return renderListItem(event);
    else if (layout === 'grid')
        return renderGridItem(event);
    else
        return null;
    }

    return (
     <div className="grid">
        {/* --------------------------- Events--------------------- */}
        <div className="dataview-event">
          <div className="card">
              <DataView layout={layout} 
                  value={blogs}
                  header={header}
                  itemTemplate={itemTemplate}
                  paginator rows={9}
                  sortOrder={sortOrder} sortField={sortField} />
          </div>
        </div>  
    </div>
  );
};

export default ListBlogs;