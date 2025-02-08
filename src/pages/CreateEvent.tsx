import React, { useState }  from 'react';
import { Link } from 'react-router-dom';

//import { getImageURL } from "../helpers/image-utils";

import { SelectButton } from 'primereact/selectbutton';
import { Image } from 'primereact/image';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

const eventLogo =  require("../assets/images/audience.jpg");

const CreateEvent = () => {
  const eventOptions = ['Single Event', 'Recurring Event'];
  const [value1, setEventType] = useState('Single Event');
  

  const [date8, setDate8] = useState<Date | Date[] | undefined>(undefined);
  
  const locationOptions = ['Venue', 'Online Event', 'To be Announced'];
  const [eventValue, setLocatiob] = useState('Venue');

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
       {/* ---------------------------Event Media --------------------- */}
       <Panel header="Event Media" toggleable>
        <Image src={eventLogo} alt="Image"/>
       </Panel>
        {/* ---------------------------Event Details --------------------- */}
      <Panel header="Event Overview" style={{fontWeight:'bold', fontSize:'20px'}} toggleable>
      <div className="p-fluid grid formgrid">
        <div className="field col-12 md:col-12">
          <h5>Event Title</h5>
          <InputText tooltip='Be clear and descriptive with a title that tells people what your event is about.'/>
        </div>
        <div className="field col-12 md:col-12">
          <h5>Summary</h5>
          <InputTextarea value={value1} rows={5} cols={80} autoResize 
          tooltip='Attendees will see this at the top of your event page. (140 characters max)'/>
        </div>
      </div>
      </Panel>
       {/* ---------------------------Event Date Time and Location --------------------- */}
      <Panel header="Date Time and Location" style={{fontWeight:'bold', fontSize:'20px'}} toggleable>
        <h5>Event Type</h5>
        <div className="p-fluid grid formgrid">
          <div className="field col-12 md:col-12">
            <SelectButton value={value1} options={eventOptions} onChange={(e) => setEventType(e.value)} />
          </div>
          <div className="field col-12 md:col-4">
              <h5>Date</h5>
              <Calendar id="eventDate" />
          </div>
          <div className="field col-12 md:col-4">
              <h5>Start Time</h5>
              <Calendar id="startTime" timeOnly hourFormat="12" />
          </div>
          <div className="field col-12 md:col-4">
              <h5>End Time</h5>
              <Calendar id="endTime" timeOnly hourFormat="12" />
          </div>
          <div className="field col-12 md:col-8">
              <h5>Location</h5>
              <SelectButton value={eventValue} options={locationOptions} onChange={(e) => setLocatiob(e.value)} />
          </div>
          <div className="field col-12 md:col-4">
          </div>
          <div className="field col-12 md:col-8">
              <h5>Address</h5>
              <InputText/>
          </div>
          <div className="field col-12 md:col-4">
            <h5>City</h5>
            <Dropdown options={cities} optionLabel="name" placeholder="Select a City" />
          </div>
          <div className="field col-12 md:col-4">
            <h5>State</h5>
            <Dropdown options={states} optionLabel="name" placeholder="Select a State" />
          </div>
          <div className="field col-12 md:col-4">
            <h5>Country</h5>
            <Dropdown options={countries} optionLabel="name" placeholder="Select a Country" />
          </div>
          <div className="field col-12 md:col-4">
            <h5>Zip</h5>
            <InputText/>
          </div>
          
        </div>
        
      </Panel>
       {/* ---------------------------Event Itenary---------------------------------------- */}
       <Panel header="Event Itenary" style={{fontWeight:'bold', fontSize:'20px'}} toggleable>
       <div className="p-fluid grid formgrid">
          <div className="field col-12 md:col-12">
            <h5>Host/Artist</h5>
            <InputText/>
          </div>
          <div className="field col-12 md:col-6">
            <h5>Title</h5>
            <InputText/>
          </div>
          <div className="field col-12 md:col-6">
            <h5>Description</h5>
            <InputTextarea value={value1} rows={5} cols={80} autoResize tooltip='List your Agenda'/>
          </div>
          <div className="field col-12 md:col-4">
            <h5>Start Time</h5>
            <Calendar id="agendaStartTime" timeOnly hourFormat="12" />
          </div>
          <div className="field col-12 md:col-4">
            <h5>End Time</h5>
            <Calendar id="agendaEndTime" timeOnly hourFormat="12" />
          </div>
        </div>
       </Panel>
       {/* ---------------------------Event FAQS------------------------------------------- */}
       <Panel header="Event FAQS" style={{fontWeight:'bold', fontSize:'20px'}} toggleable>
        <div className="p-fluid grid formgrid">
          <div className="field col-12 md:col-6">
          </div>
          <div className="field col-12 md:col-6">
            <Button icon="pi pi-plus" rounded severity="warning" aria-label="Notification"  style={{float:'right'}}/>
          </div>
          <Divider align="left">
            <div className="inline-flex align-items-center">
                <b>FAQ 1</b>
            </div>
          </Divider>
          <div className="field col-12 md:col-12">
              <div style={{width: '100%', display:'table'}}>
                  <div style={{display: 'table-row'}}>
                      <div style={{width: '600px', display: 'table-cell'}}><h5>Question</h5></div>
                      <div style={{display: 'table-cell'}}> 
                          <Button icon="pi pi-trash" rounded severity="danger" size="small" style={{float:'right'}}/>
                      </div>
                  </div>
              </div>
              <InputText/>
          </div>
          <div className="field col-12 md:col-12">
            <h5>Answer</h5>
            <InputTextarea rows={5} cols={80} autoResize />
          </div>
          <Divider align="left">
            <div className="inline-flex align-items-center">
                <b>FAQ 2</b>
            </div>
          </Divider>
          <div className="field col-12 md:col-12">
              <div style={{width: '100%', display:'table'}}>
                  <div style={{display: 'table-row'}}>
                      <div style={{width: '600px', display: 'table-cell'}}><h5>Question</h5></div>
                      <div style={{display: 'table-cell'}}> 
                          <Button icon="pi pi-trash" rounded severity="danger" size="small" style={{float:'right'}}/>
                      </div>
                  </div>
              </div>
              <InputText/>
          </div>
          <div className="field col-12 md:col-12">
            <h5>Answer</h5>
            <InputTextarea rows={5} cols={80} autoResize />
          </div>
        </div>
       </Panel>
    </div>
  );
};

export default CreateEvent;