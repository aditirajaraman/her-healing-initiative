import React, { useState, useEffect, useRef }  from 'react';
import { useForm, Controller } from 'react-hook-form';

import { classNames } from 'primereact/utils';
import { SelectButton } from 'primereact/selectbutton';
import { Image } from 'primereact/image';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { addLocale } from 'primereact/api';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';

import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';

import axios from 'axios';

const eventLogo =  require("../assets/images/audience.jpg");

const CreateEvent = () => {
  const navigate = useNavigate();
  const handleCreateEvent = () => {
      navigate('/'); 
  };

  const fileUploadRef = useRef(null);
  const [totalSize, setTotalSize] = useState(0);
  const toast = useRef(null);
  const chooseOptions = {icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined'};
  const uploadOptions = {icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'};
  const cancelOptions = {icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};
  const onUpload = () => {
    toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
  }
  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    e.files.forEach(file => {
        _totalSize += file.size;
    });

    setTotalSize(_totalSize);
  }

  const onTemplateUpload = (e) => {
      let _totalSize = 0;
      e.files.forEach(file => {
          _totalSize += (file.size || 0);
      });

      setTotalSize(_totalSize);
      toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
  }

  const onTemplateRemove = (file, callback) => {
      setTotalSize(totalSize - file.size);
      callback();
  }

  const onTemplateClear = () => {
      setTotalSize(0);
  }

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize/10000;
    const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

    return (
        <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
            {chooseButton}
            {uploadButton}
            {cancelButton}
            <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} / 1 MB`} style={{width: '300px', height: '20px', marginLeft: 'auto'}}></ProgressBar>
        </div>
    );
  }

  const itemTemplate = (file, props) => {
      return (
          <div className="flex align-items-center flex-wrap">
              <div className="flex align-items-center" style={{width: '60%'}}>
                  <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                  <span className="flex flex-column text-left ml-3">
                      {file.name}
                      <small>{new Date().toLocaleDateString()}</small>
                  </span>
              </div>
              <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
              <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
          </div>
      )
  }

  const emptyTemplate = () => {
      return (
          <div className="flex align-items-center flex-column">
              <i className="pi pi-image mt-3 p-5" style={{'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)'}}></i>
              <span style={{'fontSize': '1.2em', color: 'var(--text-color-secondary)'}} className="my-5">Drag and Drop Image Here</span>
          </div>
      )
  }

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

  const [selectedCities2, setSelectedCities2] = useState(null);
  const cities = [
    { name: 'New York', code: 'NY' },
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

  const groupedEventTags = [
    {
        label: 'Life Sciences', code: 'LS',
        items: [
            { label: 'Microbiology', value: 'Microbiology' },
            { label: 'BioChemistry', value: 'BioChemistry' },
            { label: 'Ecology', value: 'Ecology' },
            { label: 'Genomics', value: 'Genomics' },
            { label: 'Neuroscience', value: 'Neuroscience' }
        ]
    },
    {
        label: 'AI', code: 'AI',
        items: [
            { label: 'NLP', value: 'NLP' },
            { label: 'Computer Vision', value: 'ComputerVision' },
            { label: 'Generative AI', value: 'GenAI' },
            { label: 'Deep Learning', value: 'DeepLearning' }
        ]
    },
    {
      label: 'Arts & Writing', code: 'ArtsWriting',
      items: [
          { label: 'Self-Help', value: 'Self-Help' },
          { label: 'Poetry', value: 'Poetry' },
          { label: 'Short Story', value: 'ShortSory' }
      ]
    },
    {
        label: 'Competitions', code: 'Comp',
        items: [
            { label: 'Hackathons', value: 'Hackathons' },
            { label: 'App Development', value: 'AppDevelopment' },
            { label: 'Robotics', value: 'Robotics' }
        ]
    }];

    const eventOrganizerTypeOptions = [
      {name: 'Group', value: 'Group'},
      {name: 'Individuals', value: 'Individuals'}
    ];
    const [eventOrganizerTypeOption, setEventOrganizerTypeOptions] = useState('Individuals');

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
    eventSummary: '',
    eventCategory: '',
    eventTags: '',
    eventOrganizerType:'',
    eventOrganizer:'',
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

  const [userEventOrganizers, setUserEventOrganizers] = useState(null);
  const [eventOrganizer, setEventOrganizer] = useState(null);
  useEffect(() => {
    //console.log("----------Loaded ViewEvent-----------");
    //console.log(eventData);
    axios({
        url: "http://localhost:5500/api/users/GetUserEventOrganizer",
        method: "GET",
        })
        .then((res) => {
            console.log("----------Load Event Organizers-----------");
            console.log(res.data);
            setUserEventOrganizers(res.data);
        })
        .catch((err) => {
            console.log(err);
    });
  }, []);  

  const onSubmit = (formData:any) => {
      setFormData(formData);
      console.log(formData);
      axios({
        // Endpoint to send files
        url: "http://localhost:5500/api/events",
        method: "POST",
        data: formData, // Attaching the form data
        })
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
  const [selectedGroupedEventTags, setSelectedGroupedEventTags] = useState(null);
  const groupedItemTemplate = (option) => {
    return (
        <div className="flex align-items-center">
            <div>{option.label}</div>
        </div>
    );
  }

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
          <FileUpload ref={fileUploadRef} name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" multiple accept="image/*" maxFileSize={1000000}
                    onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                    headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                    chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
        </Panel>

        {/* ---------------------------Event Overview --------------------- */}
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
          <div className="field col-6 md:col-6">
            <span className="p-float-label">
                  <Controller name="eventTags" control={control} rules={{ required: 'Event Tag is required.' }} render={({ field, fieldState }) => (
                       <MultiSelect id={field.name} {...field}  className={classNames({ 'p-invalid': fieldState.invalid })}
                       value={selectedGroupedEventTags} options={groupedEventTags} onChange={(e) => setSelectedGroupedEventTags(e.value)} optionLabel="label" optionGroupLabel="label" optionGroupChildren="items"
                       optionGroupTemplate={groupedItemTemplate} placeholder="Select Event Tags"  display="chip" />
                  )} />
                  <label htmlFor="eventTags" className={classNames({ 'p-error': errors.eventTags })}>Event Tag*</label>
            </span>
            {getFormErrorMessage('eventTags')}
          </div>
          <div className="field col-6 md:col-6"/>
          <div className="field col-6 md:col-6">
            <label htmlFor="eventOrganizerType">Event Organizer*</label>
            <span className="p-float-label">
                  <Controller name="eventOrganizerType" control={control} rules={{ required: 'Event Organizer Type is required.' }} render={({ field, fieldState }) => (
                      <SelectButton id={field.name} {...field}  className={classNames({ 'p-invalid': fieldState.invalid })}
                        value={eventOrganizerTypeOption} options={eventOrganizerTypeOptions} onChange={(e) => setEventOrganizerTypeOptions(e.value)} optionLabel="name"/>
                  )} />
            </span>
            {getFormErrorMessage('eventOrganizerType')}
          </div>
          <div className="field col-6 md:col-6"/>
          <div className="field col-6 md:col-6">
            <span className="p-float-label">
                  <Controller name="eventOrganizer" control={control} rules={{ required: 'Event Organizer is required.' }} render={({ field, fieldState }) => (
                      <MultiSelect  id={field.name} {...field}  className={classNames({ 'p-invalid': fieldState.invalid })}
                        placeholder="Select EVent Organizer" maxSelectedLabels={3}
                        value={eventOrganizer} options={userEventOrganizers} onChange={(e) => setEventOrganizer(e.value)} optionLabel="name"/>
                  )} />
            </span>
            {getFormErrorMessage('eventOrganizer')}
          </div>
        
        {/* ---------------------------Event Schedule --------------------- */}

        {/* ---------------------------Event Itinerary --------------------- */}

        {/* ---------------------------Event FAQs --------------------- */}

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