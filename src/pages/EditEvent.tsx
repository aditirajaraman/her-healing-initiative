/*********************************1: Imports / react *************************************/
import React, { useState, useEffect, useRef} from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams  } from 'react-router-dom';
import axios from 'axios';

/*********************************2: Prime React Imports ********************************/
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { SelectButton } from 'primereact/selectbutton';
import { FileUpload, FileUploadUploadEvent } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { Message } from 'primereact/message';
import { Image as EventHeaderImage } from 'primereact/image';
import { classNames } from 'primereact/utils';

/*********************************3 Imports / syncfusion ********************************/
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

/*********************************3: Imports / custom css *******************************/
import '../assets/css/editEvent.css';

/*********************************4: Start : Application Code ***************************/
// 4.1 : Configuration
const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

interface EventData {
  id: string;
  eventId: string;
  eventImage: string;
  eventTitle: string;
  eventSubTitle: string;
  eventSummary: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventLocationType: string;
  eventLocation: string;
  eventOrganizers:string[];
  eventOrganizersFullNames:string[];
  itenaries:any[];
  faqs:any[];
}

const EditEvent : React.FC = () => {
    // 4.2 : Navigation
    const navigate = useNavigate();
    const redirectToEvents = () => {
        navigate('/listblogs'); 
    };
    
    // 4.3 : Variables    
    const defaultValues = {
        eventId: '',
        eventTitle: '',
        eventSubTitle: '',
        eventSummary: '',
        eventTags: '',
        eventDate : null,
        eventStartTime : null,
        eventEndTime : null,
        eventLocationType: null,
        eventLocation : null,
        eventOrganizerType:'',
        eventOrganizers:'',
        itenaries:null,
        faqs: [{ question: '', answer: '' }]
    }
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };
    const maxCharacters = 250;
    const eventOrganizerTypeOptions = [
        {name: 'Group', value: 'Group'},
        {name: 'Individuals', value: 'Individuals'}
    ];

    const formatTime = (isoString: string) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    

    // 4.4 : State Management
    const fileUploadRef = useRef(null);
    const hasRun = useRef(false);
    const formRef = useRef(null);
    
    const toast = useRef(null);
    const uploadToast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const [eventImage, setEventImage] = useState<string | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const {control, formState: { errors }, handleSubmit, reset } = useForm({defaultValues});
    const [currentEvent, setCurrentEvent] = useState<EventData | null>(null);
    const [userEventOrganizers, setUserEventOrganizers] = useState(null);
    // for FAQs
      const { fields, append, remove } = useFieldArray({
        control,
        name: "faqs"
      });
    const [eventId, setEventId] = useState<string | null>(null);
    const [events, setEvents] = useState([]);
    const [eventTags, setEventTags] = useState();
    const [eventDate, setEventDate] = useState<Date | null | undefined>(new Date());
    const [startEventTime, setStartEventTime] = useState<Date | null | undefined>(new Date());
    const selectedItenaryDate = events && events.length > 0 && events[0].StartTime ? events[0].StartTime : new Date();
    
    // 4.5 : UI Templates  
    const chooseOptions = {icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined'};
    const uploadOptions = {icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'};
    const cancelOptions = {icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};
    const groupedTagsItemTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.label}</div>
            </div>
        );
    }
    const eventLocationTypeOptions = [
        {name: 'Venue', value: 'Venue'},
        {name: 'Online Event', value: 'OnlineEvent'}
    ];

    // 4.6 : Event Handlers 
    const onEventImageUpload = (event: FileUploadUploadEvent) => {
        //console.log('-----------------Upload completed-----------------');
        //console.log(event.xhr.response);
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

    const fileUploadItemTemplate = (file, props) => {
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

    const fileUploadEmptyTemplate = () => {
      return (
          <div className="flex align-items-center flex-column">
              <i className="pi pi-image mt-3 p-5" style={{'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)'}}></i>
              <span style={{'fontSize': '1.2em', color: 'var(--text-color-secondary)'}} className="my-5">Drag and Drop Image Here</span>
          </div>
      )
    }

    const fileUploadHeaderTemplate = (options) => {
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
    
    const onSubmit = (formData) => {
        console.log('Form Data: ', formData);    
    };

    // 4.7 : React Hooks for Component OnLoad() 
    useEffect(() => {
        if (!hasRun.current) {       
            // Get a single query parameter
            const eventId = searchParams.get('eventId');
            setEventId(eventId);
            console.log('----------eventId------');
            console.log(eventId);

            //console.log("-------Edit Event Component has loaded-----------");
            hasRun.current = true;

            // call APIs to fetch data
            /*------Get Event Data------*/
            axios({
                // Endpoint to send files
                url: `${config.API_URL}/events/${eventId}`,
                method: "GET",
                headers: {
                    // Add any auth token here
                    //authorization: "your token comes here",
                },
            })
            .then((res) => {
                console.log("----------Event Data Response---------");
                //console.log(process.env.NODE_ENV);

                const eventDataResponse = res.data;
                console.log(eventDataResponse);

                // --- Convert all itenary StartTime/EndTime to Date objects ---
                console.log('----------eventDataResponse.itenaries  ---------');
                console.log(eventDataResponse.itenaries);
                const patchedItenaries = (eventDataResponse.itenaries || []).map((item, idx) => ({
                    Id: item._id || item.Id || item.id || idx, // Use _id from backend
                    Subject: item.title || item.Subject || `Event ${idx + 1}`,
                    StartTime: item.startTime ? new Date(item.startTime) : null,
                    EndTime: item.endTime ? new Date(item.endTime) : null,
                    IsAllDay: item.allday ?? false,
                    Description: item.description,
                    Location: item.location
                }));

                console.log("Scheduler events:", patchedItenaries);

                setEvents(patchedItenaries);
                // Convert date/time strings to Date objects for Calendar components
                const patchedEventData = {
                    ...eventDataResponse,
                    eventDate: eventDataResponse.eventDate ? new Date(eventDataResponse.eventDate) : null,
                    eventStartTime: eventDataResponse.eventStartTime ? new Date(eventDataResponse.eventStartTime) : null,
                    eventEndTime: eventDataResponse.eventEndTime ? new Date(eventDataResponse.eventEndTime) : null,
                    itenaries: patchedItenaries 
                };
                
                setCurrentEvent(patchedEventData);
                reset(patchedEventData); // <-- This will populate the form fields

            })
            .catch((err) => {
                console.log("----------OnLoad Error---------");
                console.log(err);
            });

            /*------Get Event Tags------*/
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
        }
    }, []);

    return(
    <div className="form-demo">
         <div className="flex flex-wrap align-items-center justify-content-center">
            <Card className="cardStyle" title="Edit Event">
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="p-fluid grid formgrid">
                    {/* ---------------------------Event Content Control--------------------- */}
                    <Divider align="left">
                        <div className="inline-flex align-items-center">
                            <i className="pi pi-image mr-2"></i>
                            <b>Event Media</b>
                        </div>
                    </Divider>
                    <div className="field col-12 md:col-12 mb-4">
                        <h5>Current Event Banner</h5>
                        <EventHeaderImage 
                            src={currentEvent?.eventImage}  
                            zoomSrc={currentEvent?.eventImage} 
                            alt="Image" width="100%" height="200" preview />
                    </div>
                    <div className="field col-12 md:col-12 mb-4">
                        <Message severity="info" style={{textAlign:'left'}} text="IF you need to upload a new Event Banner 'Upload' a new Banner below. Only .png, .jpeg, .jpg files below 1MB are supported. Upload a Image 640 X 200 !" />
                    </div>
                    <div className="field col-12 md:col-12 mb-4">
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
                        headerTemplate={fileUploadHeaderTemplate} itemTemplate={fileUploadItemTemplate} emptyTemplate={fileUploadEmptyTemplate}
                        chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                    </div>
                    
                    {/* ---------------------------Event Overview--------------------- */}
                    <Divider align="left">
                        <div className="inline-flex align-items-center">
                            <i className="pi pi-id-card mr-2"></i>
                            <b>Event Overview</b>
                        </div>
                    </Divider>
                    <div className="field col-12 md:col-12 mb-4">
                        <span className="p-float-label">
                            <Controller name="eventTitle" control={control} rules={{ required: 'Title is required.' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            <label htmlFor="name" className={classNames({ 'p-error': errors.eventTitle })}>Title*</label>
                        </span>
                        {getFormErrorMessage('eventTitle')}
                    </div>
                    <div className="field col-12 md:col-12 mb-4">
                        <span className="p-float-label">
                            <Controller name="eventSubTitle" control={control} rules={{ required: 'Subtitle is required.' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            <label htmlFor="name" className={classNames({ 'p-error': errors.eventSubTitle })}>Subtitle*</label>
                        </span>
                        {getFormErrorMessage('eventSubTitle')}
                    </div>
                    <div className="field col-12 md:col-12 mb-4">
                        <span className="p-float-label">
                            <Controller name="eventSummary" control={control} rules={{ required: 'Event Summary is required.' }} render={({ field, fieldState }) => (
                                <InputTextarea id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} maxLength={maxCharacters} rows={6} />
                            )} />
                            <label htmlFor="name" className={classNames({ 'p-error': errors.eventSummary })}>Event Summary* (Only 250 Characters)</label>
                        </span>
                        {getFormErrorMessage('eventSummary')}
                    </div>
                    <div className="field col-6 md:col-6 mb-4">
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
                                optionGroupTemplate={groupedTagsItemTemplate} 
                                placeholder="Select Event Tags"  
                                display="chip" />
                        )} />
                            <label htmlFor="name" className={classNames({ 'p-error': errors.eventTags })}>Event Tags*</label>
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
                    <div className="field col-6 md:col-6 mb-4">
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

                    {/* ---------------------------Event Schedule--------------------- */}
                    <Divider align="left">
                        <div className="inline-flex align-items-center">
                            <i className="pi pi-calendar-times mr-2"></i>
                            <b>Event Schedule</b>
                        </div>
                    </Divider>
                     <div className="field col-4 md:col-4 mb-4">
                        <label htmlFor="eventDate">Event Date</label>
                        <Controller name="eventDate" control={control} render={({ field }) => (
                        <Calendar id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                        )} />
                        {getFormErrorMessage('eventDate')}
                    </div>
                    <div className="field col-4 md:col-4 mb-4">
                        <label htmlFor="eventStartTime">Start Time</label>
                        <Controller name="eventStartTime" control={control} render={({ field }) => (
                        <Calendar id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} timeOnly hourFormat="12" />
                        )} />
                        {getFormErrorMessage('eventStartTime')}
                    </div>
                    <div className="field col-4 md:col-4 mb-4">
                        <label htmlFor="eventEndTime">End Time</label>
                        <Controller name="eventEndTime" control={control} render={({ field }) => (
                        <Calendar id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} timeOnly hourFormat="12" />
                        )} />
                        {getFormErrorMessage('eventEndTime')}
                    </div>
                    <div className="field col-4 md:col-4 mb-4">
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
                    <div className="field col-4 md:col-4 mb-4"></div>
                    <div className="field col-4 md:col-4 mb-4"></div>
                    <div className="field col-4 md:col-4 mb-4">
                        <span className="p-float-label">
                            <Controller name="eventLocation" control={control} rules={{ required: 'Event Title is required.' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            <label htmlFor="eventTitle" className={classNames({ 'p-error': errors.eventLocation })}>Event Location*</label>
                        </span>
                        {getFormErrorMessage('eventLocation')}
                    </div>

                    {/* ---------------------------Event Itenary--------------------- */}
                    <Divider align="left">
                        <div className="inline-flex align-items-center">
                            <i className="pi pi-book mr-2"></i>
                            <b>Event Itenary</b>
                        </div>
                    </Divider>
                    <div className="field col-12 md:col-12 mb-4">
                        <Controller
                            name="itenaries"
                            control={control}
                            render={({}) => (
                                <ScheduleComponent height="500px" selectedDate={currentEvent?.itenaries && currentEvent.itenaries.length > 0 && currentEvent.itenaries[0].StartTime ? currentEvent.itenaries[0].StartTime : new Date()} eventSettings={{ dataSource: events }}>
                                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                                </ScheduleComponent>
                            )}
                        />
                    </div>

                    {/* ---------------------------Event FAQS--------------------- */}
                    <Divider align="left">
                        <div className="inline-flex align-items-center">
                            <i className="pi pi-question mr-2"></i>
                            <b>Event FAQS</b>
                        </div>
                    </Divider>
                    <div className="field col-12 md:col-12 flex justify-content-end gap-2 mt-4 mb-">
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
                                <InputTextarea id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} rows={6} />
                                )}
                            />
                            <label htmlFor={`faqs.${index}.answer`} className={classNames({ 'p-error': errors?.faqs?.[index]?.answer })}>Answer*</label>
                            </span>
                            {errors?.faqs?.[index]?.answer && <small className="p-error">{errors.faqs[index].answer.message}</small>}
                        </div>
                        <div className="field col-3 md:col-3"></div>
                        </div>
                    ))}
                </div>

                {/* ---------------------------Submit Control--------------------- */}    
                <br/>
                <div className="grid">
                    <div className="col-5"/>
                    <div className="col-2">
                        <Button type="submit" label="Save Event" />
                    </div>
                    <div className="col-1">
                        <Button type="button" label="Reset" className="p-button-danger" onClick={() => reset()}/>
                    </div>
                    <div className="col-4"></div>
                </div>
                </form>
            </Card>
         </div>
    </div>)
};

export default EditEvent;
/*********************************5: End : Application Code ***************************/