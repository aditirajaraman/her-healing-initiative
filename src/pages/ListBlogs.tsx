
/*********************************1: Imports / react *************************************/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/*********************************2: Imports / primereact ********************************/
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { Avatar } from 'primereact/avatar';
import { Tooltip } from 'primereact/tooltip';
import { Badge } from 'primereact/badge';
import { Dialog } from 'primereact/dialog';

/*********************************3: Imports / custom css ********************************/
import '../assets/css/prime-styles.css';
import '../assets/css/eventView.css';

/*********************************3: Imports / Views ********************************/
import ViewBlog from './ViewBlog';

/*********************************4: Start : Application Code ********************************/

// 4.1 : Configuration
const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

// 4.2 : Class Code
const ListBlogs = () => { 
    /*---------------------4.2.1: api call / start ------------------------*/
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

    /*---------------------4.2.1: UI Model  ------------------------*/
    const currentBlogData = {
        id:'',
        blogTitle:''
    };
    const sortOptions = [
      {label: 'Blog Date', value: 'date'},
      {label: 'Blog Category', value: 'category'},
      {label: 'Blog Name', value: 'name'}
    ];

    /*--------------------- 4.2.2: State Management ------------------------*/
    const [blogs, setBlogs] = useState(null); 
    const [sortKey, setSortKey] = useState(null);
    const [layout, setLayout] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);   
    const [displayBlog, setDisplayBlog] = useState(false);
    const [currentBlog, setCurrentBlog] = useState(currentBlogData);
    const [position, setPosition] = useState('center');

    /*--------------------- 4.2.3: Start : Event Handlers ------------------------*/

    //4.2.3.1 : Navigation Functionality
    const navigate = useNavigate();
    const handleCreateBlog = () => {
        navigate('/createBlog'); 
    };

    // Data View - Grid / List
    const itemTemplate = (event, layout) => {
    if (layout === 'list')
        return renderListItem(event);
    else if (layout === 'grid')
        return renderGridItem(event);
    else
        return null;
    }

     //4.2.3.2 : Sort Functionality 
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

    //4.2.3.3 :  Data View - Header 
    const renderHeader = () => {
        return (
            <div className="grid grid-nogutter">
                <div className="col-2">
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Event" onChange={onSortChange}/>
                </div>
                <div className="col-2">
                    <Button style={{float: 'left'}} label="Create Blog" className="p-button-raised p-button-warning" onClick={handleCreateBlog}/>
                </div>
                <div className="col-8" style={{float: 'right'}}>
                    <DataViewLayoutOptions style={{float: 'right'}} layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </div>
        );
    }
    const headerTemplate = renderHeader()

    //4.2.3.4 :  Data View / ListItem Definition
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

    //4.2.3.5 :  Data View / GridItem Definition
    const renderGridItem = (data) => {
        return (
            <div className="col-12 md:col-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-content"> 
                        <img src={require( `../assets/images/events/${data.imglink}.png`)}/>
                        <div className="product-name" style={{cursor:'pointer'}} onClick={() => handleBlogClick('displayBlog', 'center', data._id,  data.blogTitle)}>{data.title}</div>
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

    //4.2.3.6 : Click Functionaility 
    const dialogFuncMap = {
        'displayBlog': setDisplayBlog
    }
    const handleBlogClick = (name, position, id, blogTitle) => {
        //console.log(id)
        currentBlogData.id = id;
        currentBlogData.blogTitle = blogTitle;
        setCurrentBlog(currentBlogData);

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
                <Button label="Edit Blog" icon="pi pi-pencil" onClick={() => onHide(name)} autoFocus />
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>    
                <Button label="Delete Blog" icon="pi pi-trash" severity='danger' onClick={() => onHide(name)}/>
            </div>
        );
    }

    /*--------------------- 4.2.3: End : Event Handlers ------------------------*/
    
    /*--------------------- 4.2.4: UI Container Code ------------------------*/
    return (

        
     <div className="grid">

        {/* ---------------------------View Event --------------------- */}
        <Dialog header={currentBlog.blogTitle} visible={displayBlog} style={{ width: '60vw' }} footer={renderFooter('displayBlog')} onHide={() => onHide('displayBlog')}>
            <br></br>
            <ViewBlog eventData={currentBlog}/>
        </Dialog>  

        {/* --------------------------- Events--------------------- */}
        <div className="dataview-event">
          <div className="card">
              <DataView layout={layout} 
                  value={blogs}
                  header={headerTemplate}
                  itemTemplate={itemTemplate}
                  paginator rows={9}
                  sortOrder={sortOrder} 
                  sortField={sortField} />
          </div>
        </div>  
    </div>
  );
};

export default ListBlogs;

/*********************************End : Application Code ********************************/