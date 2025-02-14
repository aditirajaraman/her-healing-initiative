import React, { useState }  from 'react';
import { useForm, Controller } from 'react-hook-form';

import { classNames } from 'primereact/utils';
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
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const eventLogo =  require("../assets/images/audience.jpg");

const CreateEvent = () => {
  const navigate = useNavigate();
  const handleCreateEvent = () => {
      navigate('/'); 
  };

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

  /*----------------------Start : Form Setup---------------------- */
  const [showMessage, setShowMessage] = useState(false);
  //const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const [formData, setFormData] = useState({});
  const defaultValues = {
    eventTitle: '',
    eventSubTitle: '',
    eventSummary: ''
    /*eventOption: null,
    eventDate : null,
    startEventTime : null,
    endEventTime : null,
    eventLocation : null,
    eventAddress : '',
    eventCity : '',
    eventState : '',
    eventCountry : '',
    eventZip : null,
    itineraryHostOrArtist : '',
    itineraryDescription : '',
    agendaStartTime: null,
    agendaEndTime: null,
    faqQuestion1: '',
    faqAnswer1: '',
    faqQuestion2: '',
    faqAnswer2: ''*/
  }

  const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
  };

  const createEventStatus = {
    status:false,
    statusMessage:false,
    eventTitle:'' 
  };

  const [eventStatus, setEventStatus] = useState(createEventStatus);

  const onSubmit = (formData:any) => {
      setFormData(formData);
      console.log(formData);
      axios({
        // Endpoint to send files
        url: "http://localhost:5500/api/events",
        method: "POST",
        headers: {
            // Add any auth token here
            //authorization: "your token comes here",
        },
        data: formData, // Attaching the form data
        })
        // Handle the response from backend here
        .then((res) => {
            //console.log("--------------logged---------------");
            //console.log(res.data.success);
            //console.log(res.data.message);
            eventStatus.status = res.data.success;   
            eventStatus.statusMessage  = res.data.message;
            eventStatus.eventTitle  = formData["eventTitle"];
            setShowMessage(true);
        })
        .catch((err) => {
            console.log(err);
            setShowMessage(true);
        });
  };
  const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
  const titleHeader = <h6>Title cant be left blank</h6>;
  const passwordFooter = (
      <React.Fragment>
          <Divider />
          <p className="mt-2">Suggestions</p>
          <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
              <li>At least one lowercase</li>
              <li>At least one uppercase</li>
              <li>At least one numeric</li>
              <li>Minimum 8 characters</li>
          </ul>
      </React.Fragment>
  ); 

  /*----------------------Start : Form Setup---------------------- */


  return (
    <div className="container">
       {/* -------Start Container--------- */}  

       {/* ---------------------------Dialog Message : Submission --------------------- */}
      <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
        <div className="flex justify-content-center flex-column pt-6 px-3">
            <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
            <h5>Registration Successful!</h5>
            <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                Your Event <b>{formData["eventTitle"]}</b> Registration {eventStatus.status}
                Message : {eventStatus.statusMessage}
            </p>
        </div>
      </Dialog>

      {/* -------Start Form--------- */} 
     <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
        {/* ---------------------------Event Media --------------------- */}
        <Panel header="Event Media" toggleable>
          <Image src={eventLogo} alt="Image"/>
        </Panel>

        {/* ---------------------------Event Details --------------------- */}
        <Panel header="Event Overview" style={{fontWeight:'bold', fontSize:'20px'}} toggleable>
        <div className="p-fluid grid formgrid">
          <div className="field col-12 md:col-12">
            <span className="p-float-label">
                  <Controller name="eventTitle" control={control} rules={{ required: 'Event Title is required.' }} render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                  )} />
                  <label htmlFor="eventTitle" className={classNames({ 'p-error': errors.eventTitle })}>Event Title*</label>
            </span>
            {getFormErrorMessage('eventTitle')}
          </div>
          <div className="field col-12 md:col-12">
            <span className="p-float-label">
                  <Controller name="eventSubTitle" control={control} rules={{ required: 'Event Sub Title is required.' }} render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                  )} />
                  <label htmlFor="eventSubTitle" className={classNames({ 'p-error': errors.eventTitle })}>Event Sub Title*</label>
            </span>
            {getFormErrorMessage('eventSubTitle')}
          </div>
          <div className="field col-12 md:col-12">
            <span className="p-float-label">
                  <Controller name="eventSummary" control={control} rules={{ required: 'Event Summary is required.' }} render={({ field, fieldState }) => (
                      <InputTextarea id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} rows={5} cols={80}/>
                  )} />
                  <label htmlFor="eventSummary" className={classNames({ 'p-error': errors.eventTitle })}>Event Summary*</label>
            </span>
            {getFormErrorMessage('eventSummary')}
          </div>
        </div>
        </Panel>
        <div className="p-fluid grid formgrid">
          <div className="field col-3 md:col-3"></div>
          <div className="field col-3 md:col-3">
            <Button type="submit" label="Submit" className="p-button-success" />
          </div>
          <div className="field col-3 md:col-3">
            <Button type="reset" label="Cancel" className="p-button-danger" />
          </div>
        </div>
     </form>
    {/* -------End Form--------- */} 

     {/* -------End Container--------- */}   
    </div> 
  );
};

export default CreateEvent;