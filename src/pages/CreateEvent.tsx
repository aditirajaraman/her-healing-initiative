/*********************************1: Imports / react *************************************/
import React, { useState, useEffect, useRef }  from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import axios from 'axios';

/*********************************2: Imports / primereact ********************************/
import { classNames } from 'primereact/utils';
import { SelectButton } from 'primereact/selectbutton';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import { FileUpload, FileUploadUploadEvent } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';

/*********************************3 Imports / syncfusion ********************************/
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

/*********************************3: Imports / custom css ********************************/
import '../assets/css/createEvent.css';
const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

/*********************************4: Start : Application Code ****************************/
const CreateEvent = () => {

  /*---------------------4.1: Navigators ---------------------*/
  const navigate = useNavigate();
  const handleCreateEvent = () => {
      navigate('/'); 
  };

  /*---------------------4.2: State Management ------------------------*/
  const hasRun = useRef(false);
  const [eventId, setEventId] = useState<string | null>(null);
  const [totalSize, setTotalSize] = useState(0);
  const [eventTitle, setEventTitle] = useState('');
  const [eventSummary, setEventSummary] = useState('');

  const [eventDate, setEventDate] = useState<Date | null | undefined>(new Date());
  const [startEventTime, setStartEventTime] = useState<Date | null | undefined>(new Date());
  const [endEventTime, setEndEventTime] = useState<Date | null | undefined>(new Date());

  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  const [HostOrArtist, setHostOrArtist] = useState('');
  const [ItenaryTitle, setItenaryTitle] = useState('');
  const [ItenaryDescription, setItenaryDescription] = useState('');

  const [eventTags, setEventTags] = useState();
  const [eventType, setEventType] = useState('Single Event');
  const [eventLocation, setEventLocation] = useState('Venue');

  const [agendaStartTime, setAgendaStartTime] = useState<Date | null | undefined>(new Date());
  const [agendaEndTime, setAgendaEndTime] = useState<Date | null | undefined>(new Date());
  const [eventImage, setEventImage] = useState<string | null>(null);

  const [events, setEvents] = useState([]);
  
  /*---------------------4.3: Control References ---------------------*/

  const fileUploadRef = useRef(null);
  const toast = useRef(null);
  const chooseOptions = {icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined'};
  const uploadOptions = {icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'};
  const cancelOptions = {icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};

  const eventOrganizerTypeOptions = [
    {name: 'Group', value: 'Group'},
    {name: 'Individuals', value: 'Individuals'}
  ];

  const eventLocationTypeOptions = [
    {name: 'Venue', value: 'Venue'},
    {name: 'Online Event', value: 'OnlineEvent'}
  ];

  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = (month === 0) ? 11 : month - 1;
  let prevYear = (prevMonth === 11) ? year - 1 : year;
  let nextMonth = (month === 11) ? 0 : month + 1;
  let nextYear = (nextMonth === 0) ? year + 1 : year;

  const onCityChange = (e: { value: any}) => {
    setSelectedCity(e.value);
  }

  const onStateChange = (e: { value: any}) => {
    setSelectedState(e.value);
  }

  const onCountryChange = (e: { value: any}) => {
    setSelectedCountry(e.value);
  }

  const groupedItemTemplate = (option) => {
    return (
        <div className="flex align-items-center">
            <div>{option.label}</div>
        </div>
    );
  }

  const [showMessage, setShowMessage] = useState(false);
  
  const [formData, setFormData] = useState({});
  const defaultValues = {
    eventTitle: '',
    eventSubTitle: '',
    eventSummary: '',
    eventImage: '',
    eventTags: '',
    eventOrganizerType:'',
    eventOrganizers:'',
    eventDate : null,
    eventStartTime : null,
    eventEndTime : null,
    eventLocationType: null,
    eventLocation : null,
    itenaries:null,
    faqs: [{ question: '', answer: '' }]
  }

   
  const { control, formState: { errors }, handleSubmit, reset, setValue } = useForm({ defaultValues });
  // for FAQs
  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs"
  });

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
  const uploadToast = useRef(null);

  /*---------------------4.4: Control Event Handlers ---------------------*/

  const onEventImageUpload = (event: FileUploadUploadEvent) => {
    console.log('-----------------Upload completed-----------------');
    console.log(event.xhr.response);
    const responseData = JSON.parse(event.xhr.response);
    if (Boolean(responseData.status))
    {
        uploadToast.current.show({severity: 'info', summary: 'Success', detail: `File Uploaded ${responseData.key}`, life: 4000});
        let computedBlogImageurl = `${config.AWS_S3_URL}${responseData.key}`;
        setEventImage(computedBlogImageurl);
    }
    else{
        uploadToast.current.show({severity: 'error', summary: 'Error Message', detail: `File Uploaded ${responseData.message}`, life: 6000});
    }
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

  const onItenaryActionComplete = (args) => {
    // Check if the action was an event creation/save
    /*if (args.requestType === 'eventCreated') {
      const newRecords = args.addedRecords;
      if (Array.isArray(newRecords) && newRecords.length > 0) {
        setEvents(prevEvents => [...prevEvents, ...newRecords]);
      }
      } else if (args.requestType === 'eventChanged') {
        const changedRecords = args.changedRecords;
        setEvents(prevEvents =>
          prevEvents.map(ev =>
            changedRecords.find(cr => cr.Id === ev.Id) || ev
          )
        );
      } else if (args.requestType === 'eventRemoved') {
        const deletedRecords = args.deletedRecords;
        setEvents(prevEvents =>
          prevEvents.filter(ev =>
            !deletedRecords.some(dr => dr.Id === ev.Id)
          )
        );
      }*/
     let updatedEvents = [];
     if (args.data) {
      updatedEvents = Array.isArray(args.data) ? args.data : [args.data];
      setEvents(updatedEvents);
      // args.data is the latest data source after the action
      setValue('itenaries', updatedEvents); // <-- This updates the form value!
  }
    };
  const eventSettings = { dataSource: events };
  
  //Start : React Hooks for Component OnLoad() 
  useEffect(() => {
    if (!hasRun.current) {
      //console.log("----------Loaded ViewEvent-----------");
      //console.log(eventData);
      hasRun.current = true;
      axios({
        // Endpoint to send files
        url: config.API_URL + "/Utils/GetUniqueId",
        method: "GET",
        headers: {
            // Add any auth token here
            //authorization: "your token comes here",
        },
      })
      .then((res) => {
        console.log("----------GET Event Id---------");
        //console.log(process.env.NODE_ENV);
        console.log(res.data);
        setEventId(res.data);
      })
      axios({
          url: config.API_URL + "/users/GetUserEventOrganizer",
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
      axios({
          url: config.API_URL + "/eventTags",
          method: "GET",
          })
          .then((res) => {
              console.log("----------Load Event Tags-----------");
              console.log(res.data);
              setEventTags(res.data);
          })
          .catch((err) => {
              console.log(err);
      });
    }
  }, []);
  //End : React Hooks for Component OnLoad() 
  const onSubmit = (formData:any) => {
    console.log("-------CreateEvent() / onSubmit  -----------");
    setFormData(formData);
    console.log(formData);
    axios({
      // Endpoint to send files
      url: config.API_URL + "/events/createEvent",
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

  /*---------------------4.5: Control Event Templates ---------------------*/
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

  /*----------------------4.6: Start : Form Setup---------------------- */
  return (
    <div className="form-event">

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

      
      <div className="flex flex-wrap align-items-center justify-content-center">
        <Card className="cardStyle" title="Create Event">
          {/* -------Start Event Form--------- */} 
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
              {/* ---------------------------Event Media --------------------- */}
              <Divider align="left" >
                <div className="inline-flex align-items-center">
                    <i className="pi pi-image mr-2"></i>
                    <b>Event Media</b>
                </div>
              </Divider>
              <FileUpload ref={fileUploadRef} name="eventImage" url={`${config.API_URL}/s3/uploadEventImageToBucket`} 
                  className="my-rounded-fileupload"
                  accept="image/*" maxFileSize={1000000}
                  onUpload={onEventImageUpload} 
                  onBeforeUpload={({ formData }) => {
                    //xhr.setRequestHeader('Authorization', `Bearer ${userToken}`);
                    formData.append('uiAction', 'eventImage');
                    formData.append('eventId', eventId);
                  }}
                  onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                  headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                  chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
            
            {/* ---------------------------Event Overview --------------------- */}
             <Divider align="left">
                <div className="inline-flex align-items-center">
                    <i className="pi pi-id-card mr-2"></i>
                    <b>Event Overview</b>
                </div>
            </Divider>
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
                        <Controller 
                          name="eventTags" 
                          control={control} 
                          rules={{ required: 'Event Tag is required.' }} 
                          render={({ field, fieldState }) => (
                            <MultiSelect 
                              id={field.name} {...field}  
                              className={classNames({ 'p-invalid': fieldState.invalid })}
                              options={eventTags} 
                              optionLabel="label" 
                              optionGroupLabel="label" 
                              optionGroupChildren="items"
                              optionGroupTemplate={groupedItemTemplate} 
                              placeholder="Select Event Tags"  
                              display="chip" />
                        )} />
                        <label htmlFor="eventTags" className={classNames({ 'p-error': errors.eventTags })}>Event Tag*</label>
                  </span>
                  {getFormErrorMessage('eventTags')}
                </div>
                <div className="field col-6 md:col-6"/>
                <div className="field col-6 md:col-6">
                  <label htmlFor="eventOrganizerType">Event Organizer*</label>
                  <span className="p-float-label">
                      <Controller 
                        name="eventOrganizerType" 
                        control={control} 
                        rules={{ required: 'Event Organizer Type is required.' }} 
                        render={({ field, fieldState }) => (
                          <SelectButton 
                            id={field.name} {...field}  
                            className={classNames({ 'p-invalid': fieldState.invalid })}
                            options={eventOrganizerTypeOptions} 
                            optionLabel="name"/>
                      )} />
                  </span>
                  {getFormErrorMessage('eventOrganizerType')}
                </div>
                <div className="field col-6 md:col-6"/>
                <div className="field col-6 md:col-6">
                  <span className="p-float-label">
                    <Controller 
                      name="eventOrganizers" 
                      control={control} 
                      rules={{ required: 'Event Organizer is required.' }} 
                      render={({ field, fieldState }) => (
                        <MultiSelect  
                          id={field.name} {...field}  
                          className={classNames({ 'p-invalid': fieldState.invalid })}
                          placeholder="Select Event Organizer" 
                          maxSelectedLabels={3}
                          options={userEventOrganizers} 
                          optionLabel="name"/>
                    )} />
                  </span>
                  {getFormErrorMessage('eventOrganizers')}
                </div>
                
                {/* ---------------------------Event Schedule --------------------- */}
                <Divider align="left">
                  <div className="inline-flex align-items-center">
                      <i className="pi pi-calendar-times mr-2"></i>
                      <b>Event Schedule</b>
                  </div>
                </Divider>
                <div className="field col-4 md:col-4">
                  <label htmlFor="eventDate">Event Date</label>
                  <Controller name="eventDate" control={control} render={({ field }) => (
                    <Calendar id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                  )} />
                  {getFormErrorMessage('eventDate')}
                </div>
                <div className="field col-4 md:col-4">
                  <label htmlFor="eventStartTime">Start Time</label>
                  <Controller name="eventStartTime" control={control} render={({ field }) => (
                    <Calendar id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} timeOnly hourFormat="12" />
                  )} />
                  {getFormErrorMessage('eventStartTime')}
                </div>
                <div className="field col-4 md:col-4">
                  <label htmlFor="eventEndTime">End Time</label>
                  <Controller name="eventEndTime" control={control} render={({ field }) => (
                    <Calendar id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} timeOnly hourFormat="12" />
                  )} />
                  {getFormErrorMessage('eventEndTime')}
                </div>
                <div className="field col-4 md:col-4">
                  <label htmlFor="eventLocationType">Location*</label>
                  <span className="p-float-label">
                      <Controller 
                        name="eventLocationType" 
                        control={control} 
                        rules={{ required: 'Event Location Type is required.' }} 
                        render={({ field, fieldState }) => (
                          <SelectButton 
                            id={field.name} {...field} 
                            className={classNames({ 'p-invalid': fieldState.invalid })}
                            options={eventLocationTypeOptions} 
                            optionLabel="name"/>
                      )} />
                  </span>
                  {getFormErrorMessage('eventLocationType')}
                </div>
                <div className="field col-4 md:col-4"></div>
                <div className="field col-4 md:col-4"></div>
                <div className="field col-4 md:col-4">
                  <span className="p-float-label">
                      <Controller name="eventLocation" control={control} rules={{ required: 'Event Title is required.' }} render={({ field, fieldState }) => (
                          <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                      )} />
                      <label htmlFor="eventTitle" className={classNames({ 'p-error': errors.eventLocation })}>Event Location*</label>
                  </span>
                  {getFormErrorMessage('eventLocation')}
                </div>


                {/* ---------------------------Event Itinerary --------------------- */}
                <Divider align="left">
                  <div className="inline-flex align-items-center">
                      <i className="pi pi-book mr-2"></i>
                      <b>Event Itinerary</b>
                  </div>
                </Divider>
                <div className="field col-12 md:col-12">
                  <Controller
                    name="itenaries"
                    control={control}
                    render={({}) => (
                      <ScheduleComponent
                          eventSettings={eventSettings}
                          actionComplete={onItenaryActionComplete}>
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                      </ScheduleComponent>
                    )}
                  />
                </div>
                {/* ---------------------------Event FAQs --------------------- */}
                <Divider align="left">
                  <div className="inline-flex align-items-center">
                      <i className="pi pi-question mr-2"></i>
                      <b>Event FAQs</b>
                  </div>
                </Divider>
                <div className="field col-12 md:col-12 flex justify-content-end gap-2 mt-4">
                  <div className="field col-2 md:col-2">
                    <Button
                      type="button"
                      label="Add Question"
                      onClick={() => {
                        append({ question: '', answer: '' });
                        // Scroll to the last FAQ input after adding
                        setTimeout(() => {
                          const faqInputs = document.querySelectorAll('[id^="faqs."][id$=".question"]');
                          if (faqInputs.length > 0) {
                            (faqInputs[faqInputs.length - 1] as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
                            (faqInputs[faqInputs.length - 1] as HTMLElement).focus();
                          }
                        }, 100);
                      }}
                    />
                  </div>
                  <div className="field col-10 md:col-10"></div>
                </div>
                {fields.map((item, index) => (
                   <div key={item.id} className="p-fluid grid formgrid">
                    <div className="field col-9 md:col-9">
                      <span className="p-float-label">
                        <Controller
                          name={`faqs.${index}.question`}
                          control={control}
                          rules={{ required: 'FAQ Query is required.' }}
                          render={({ field, fieldState }) => (
                            <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                          )}
                        />
                        <label htmlFor={`faqs.${index}.question`} className={classNames({ 'p-error': errors?.faqs?.[index]?.question })}>Question</label>
                      </span>
                      {errors?.faqs?.[index]?.question && <small className="p-error">{errors.faqs[index].question.message}</small>}
                    </div>
                    <div className="field col-3 md:col-3">
                      <Button type="button" label="Remove" className="p-button-danger" onClick={() => remove(index)} />
                    </div>
                    <div className="field col-9 md:col-9">
                      <span className="p-float-label">
                        <Controller
                          name={`faqs.${index}.answer`}
                          control={control}
                          rules={{ required: 'Answer is required.' }}
                          render={({ field, fieldState }) => (
                            <InputTextarea id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} rows={3} />
                          )}
                        />
                        <label htmlFor={`faqs.${index}.answer`} className={classNames({ 'p-error': errors?.faqs?.[index]?.answer })}>Answer*</label>
                      </span>
                      {errors?.faqs?.[index]?.answer && <small className="p-error">{errors.faqs[index].answer.message}</small>}
                    </div>
                    <div className="field col-3 md:col-3"></div>
                  </div>
                ))}
                {/* ---------------------------Event Form Submission --------------------- */}
                <div className="field col-12 md:col-12 flex justify-content-end gap-2 mt-4">
                  <div className="field col-3 md:col-3"></div>
                  <div className="field col-3 md:col-3">
                    <Button type="submit" label="Submit" className="p-button-success p-button-sm" />
                  </div>
                  <div className="field col-3 md:col-3">
                    <Button type="button" label="Reset" className="p-button-secondary p-button-sm" onClick={() => reset()} />
                  </div>
                  <div className="field col-3 md:col-3"></div>  
                </div>

              </div> 
          </form>
          {/* -------End Form--------- */} 
        </Card>
      </div>
      <Toast ref={uploadToast} /> 
      {/* -------End Container--------- */}   
    </div> 
  );
  /*----------------------4.6: End : Form Setup---------------------- */
};

export default CreateEvent;