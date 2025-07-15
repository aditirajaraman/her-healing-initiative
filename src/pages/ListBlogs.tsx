import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';

import '../assets/css/prime-styles.css';
import '../assets/css/eventView.css';
const ListBlogs = () => {
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
    const header = renderHeader()
  return (
     <div className="grid">
        {/* --------------------------- Events--------------------- */}
        <div className="dataview-event">
          <div className="card">
              <DataView layout={layout} 
                  header={header}
                  paginator rows={9}
                  sortOrder={sortOrder} sortField={sortField} />
          </div>
        </div>  
    </div>
  );
};

export default ListBlogs;