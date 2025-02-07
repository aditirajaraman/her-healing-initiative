import React, { useState }  from 'react';
import { Link } from 'react-router-dom';

//import { getImageURL } from "../helpers/image-utils";

import { SelectButton } from 'primereact/selectbutton';
import { Image } from 'primereact/image';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import Button from 'react-bootstrap/Button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

const eventLogo =  require("../assets/images/audience.jpg");

const CreateEvent = () => {
  const [value1, setValue1] = useState('');
  const [date8, setDate8] = useState<Date | Date[] | undefined>(undefined);
  const options = ['Single Event', 'Recurring Event'];
  const locationOptions = ['Venue', 'Online Event', 'To be Announced'];
  const cities = [
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];
  const states = [
    { name: 'New York', code: 'NY' },
    { name: 'New Jersey', code: 'RM' },
    { name: 'Utah', code: 'LDN' },
    { name: 'California', code: 'PRS' }
  ];
  const countries = [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
  ];
  return (
    <div className="container">
       <Panel header="Event Media" toggleable>
        <Image src={eventLogo} alt="Image"/>
       </Panel>
      <Panel header="Event Overview" toggleable>
        <h3>Event Title</h3>
        <InputText/>
        <h3>Summary</h3>
        <InputTextarea value={value1} onChange={(e) => setValue1(e.target.value)} rows={5} cols={30} />
      </Panel>
      <Panel header="Date Time and Location" toggleable>
        <h3>Event Type</h3>
        <div className="p-fluid grid formgrid">
          <div className="field col-12 md:col-12">
            <SelectButton value={value1} options={options} onChange={(e) => setValue1(e.value)} />
          </div>
          <div className="field col-12 md:col-4">
              <label htmlFor="eventDate">Date</label>
              <Calendar id="eventDate" />
          </div>
          <div className="field col-12 md:col-4">
              <label htmlFor="startTime">Start Time</label>
              <Calendar id="startTime" timeOnly hourFormat="12" />
          </div>
          <div className="field col-12 md:col-4">
              <label htmlFor="endTime">End Time</label>
              <Calendar id="endTime" timeOnly hourFormat="12" />
          </div>
          <div className="field col-12 md:col-8">
              <h3>Location</h3>
              <SelectButton value={value1} options={locationOptions} onChange={(e) => setValue1(e.value)} />
          </div>
          <div className="field col-12 md:col-4">
          </div>
          <div className="field col-12 md:col-8">
              <label htmlFor="Address">Address</label>
              <InputText/>
          </div>
          <div className="field col-12 md:col-4">
            <label htmlFor="cities">City</label>
            <Dropdown options={cities} optionLabel="name" placeholder="Select a City" />
          </div>
          <div className="field col-12 md:col-4">
            <label htmlFor="states">State</label>
            <Dropdown options={states} optionLabel="name" placeholder="Select a City" />
          </div>
          <div className="field col-12 md:col-4">
            <label htmlFor="countries">Country</label>
            <Dropdown options={countries} optionLabel="name" placeholder="Select a Country" />
          </div>
          <div className="field col-12 md:col-4">
            <label htmlFor="Address">ZipCode</label>
            <InputText/>
          </div>
          
        </div>
        
      </Panel>
     
    </div>
  );
};

export default CreateEvent;