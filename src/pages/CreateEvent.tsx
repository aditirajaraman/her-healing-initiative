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
import { addLocale } from 'primereact/api';

  const eventLogo =  require("../assets/images/audience.jpg");

  const CreateEvent = () => {
    const [eventTitle, setEventTitle] = useState('');
    const [eventSummary, setEventSummary] = useState('');

    const [eventDate, setEventDate] = useState<Date | null | undefined>(new Date());
    const [startEventTime, setStartEventTime] = useState<Date | null | undefined>(new Date());
    const [endEventTime, setEndEventTime] = useState<Date | null | undefined>(new Date());

    const [address, setAddress] = useState('');
    const [selectedCity, setSelectedCity] = useState<any>(null);
    const [selectedState, setSelectedState] = useState<any>(null);
    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [zip, setZip] = useState('');

    const [HostOrArtist, setHostOrArtist] = useState('');
    const [ItenaryTitle, setItenaryTitle] = useState('');
    const [ItenaryDescription, setItenaryDescription] = useState('');

    const [FAQ1, setFAQ1] = useState('');
    const [FAQ2, setFAQ2] = useState('');
    const [Answer1, setAnswer1] = useState('');
    const [Answer2, setAnswer2] = useState('');

    const eventOptions = ['Single Event', 'Recurring Event'];
    const [eventType, setEventType] = useState('Single Event');
    
    const locationOptions = ['Venue', 'Online Event', 'To be Announced'];
    const [eventLocation, setEventLocation] = useState('Venue');

    const [agendaStartTime, setAgendaStartTime] = useState<Date | null | undefined>(new Date());
    const [agendaEndTime, setAgendaEndTime] = useState<Date | null | undefined>(new Date());


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

    const onCityChange = (e: { value: any}) => {
      setSelectedCity(e.value);
    }

    const onStateChange = (e: { value: any}) => {
      setSelectedState(e.value);
    }

    const onCountryChange = (e: { value: any}) => {
      setSelectedCountry(e.value);
    }

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;

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
          <InputText value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} 
          tooltip='Be clear and descriptive with a title that tells people what your event is about.'/>
        </div>
        <div className="field col-12 md:col-12">
          <h5>Summary</h5>
          <InputTextarea value={eventSummary} onChange={(e) => setEventSummary(e.target.value)} rows={5} cols={80} autoResize 
          tooltip='Attendees will see this at the top of your event page. (140 characters max)'/>
        </div>
      </div>
      </Panel>
      
      {/* ---------------------------Event Date Time and Location --------------------- */}
      <Panel header="Date Time and Location" style={{fontWeight:'bold', fontSize:'20px'}} toggleable>
        <h5>Event Type</h5>
        <div className="p-fluid grid formgrid">
          <div className="field col-12 md:col-12">
            <SelectButton value={eventType} options={eventOptions} onChange={(e) => setEventType(e.value)} />
          </div>
          <div className="field col-12 md:col-4">
              <h5>Date</h5>
              <Calendar id="eventDate" value={eventDate} onChange={(e) => setEventDate(e.value)}  dateFormat="mm-dd-yy"/>
          </div>
          <div className="field col-12 md:col-4">
              <h5>Start Time</h5>
              <Calendar id="startEventTime" value={startEventTime} onChange={(e) => setStartEventTime(e.value)} timeOnly hourFormat="12" />
          </div>
          <div className="field col-12 md:col-4">
              <h5>End Time</h5>
              <Calendar id="endEventTime" value={endEventTime} onChange={(e) => setEndEventTime(e.value)} timeOnly hourFormat="12" />
          </div>
          <div className="field col-12 md:col-8">
              <h5>Location</h5>
              <SelectButton value={eventLocation} options={locationOptions} onChange={(e) => setEventLocation(e.value)} />
          </div>
          <div className="field col-12 md:col-4">
          </div>
          <div className="field col-12 md:col-8">
              <h5>Address</h5>
              <InputText  id="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="field col-12 md:col-4">
            <h5>City</h5>
            <Dropdown options={cities} optionLabel="name" placeholder="Select a City" 
              value={selectedCity} onChange={onCityChange}/>
          </div>
          <div className="field col-12 md:col-4">
            <h5>State</h5>
            <Dropdown options={states} optionLabel="name" placeholder="Select a State" 
              value={selectedState} onChange={onStateChange}/>
          </div>
          <div className="field col-12 md:col-4">
            <h5>Country</h5>
            <Dropdown options={countries} optionLabel="name" placeholder="Select a Country" 
              value={selectedCountry} onChange={onCountryChange}/>
          </div>
          <div className="field col-12 md:col-4">
            <h5>Zip</h5>
            <InputText  id="Zip"  value={zip}  onChange={(e) => setZip(e.target.value)} />
          </div>
          
        </div>
        
      </Panel>
       {/* ---------------------------Event Itenary---------------------------------------- */}
       <Panel header="Event Itenary" style={{fontWeight:'bold', fontSize:'20px'}} toggleable>
       <div className="p-fluid grid formgrid">
          <div className="field col-12 md:col-12">
            <h5>Host/Artist</h5>
            <InputText id="HostOrArtist"  value={HostOrArtist}  onChange={(e) => setHostOrArtist(e.target.value)} />
          </div>
          <div className="field col-12 md:col-6">
            <h5>Title</h5>
            <InputText id="ItenaryTitle"  value={ItenaryTitle}  onChange={(e) => setItenaryTitle(e.target.value)} />
          </div>
          <div className="field col-12 md:col-6">
            <h5>Description</h5>
            <InputTextarea value={ItenaryDescription} onChange={(e) => setItenaryDescription(e.target.value)}  rows={5} cols={80} autoResize tooltip='List your Agenda'/>
          </div>
          <div className="field col-12 md:col-4">
            <h5>Start Time</h5>
            <Calendar id="agendaStartTime" value={agendaStartTime} onChange={(e) => setAgendaStartTime(e.value)} timeOnly hourFormat="12" />
          </div>
          <div className="field col-12 md:col-4">
            <h5>End Time</h5>
            <Calendar id="agendaEndTime" value={agendaEndTime} onChange={(e) => setAgendaEndTime(e.value)}  timeOnly hourFormat="12" />
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
              <InputText id="FAQ1"  value={FAQ1}  onChange={(e) => setFAQ1(e.target.value)}/>
          </div>
          <div className="field col-12 md:col-12">
            <h5>Answer</h5>
            <InputTextarea value={Answer1} onChange={(e) => setAnswer1(e.target.value)}  rows={5} cols={80} autoResize />
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
              <InputText id="FAQ2"  value={FAQ2}  onChange={(e) => setFAQ2(e.target.value)}/>
          </div>
          <div className="field col-12 md:col-12">
            <h5>Answer</h5>
            <InputTextarea value={Answer2} onChange={(e) => setAnswer2(e.target.value)}  rows={5} cols={80} autoResize />
          </div>
        </div>
       </Panel>
       <div className="p-fluid grid formgrid">
        <div className="field col-3 md:col-3"></div>
        <div className="field col-3 md:col-3">
          <Button label="Submit" aria-label="Save"  />
        </div>
        <div className="field col-3 md:col-3">
          <Button label="Cancel" aria-label="Cancel"  className="p-button-danger" />
        </div>
        <div className="field col-3 md:col-3"></div>
       </div>
    </div>
  );
};

export default CreateEvent;