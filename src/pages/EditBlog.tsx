/*********************************1: Imports / react *************************************/
import React, { useState, useEffect, useRef} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/*********************************2: Imports / primereact ********************************/
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { FileUpload, FileUploadUploadEvent, FileUploadRemoveEvent} from 'primereact/fileupload';
import { Toast } from 'primereact/toast';

/*********************************3: Imports / syncFusion ********************************/
import { 
    HtmlEditor, 
    Image, 
    Inject, 
    Link, 
    QuickToolbar, 
    RichTextEditorComponent, 
    Toolbar, 
    Table,
    PasteCleanup
} 
from '@syncfusion/ej2-react-richtexteditor';

/*********************************4: Imports / custom css ********************************/
import '../assets/css/createBlog.css';
import { confirmDialog } from 'primereact/confirmdialog';

/*********************************5: Start : Application Code ********************************/
// 4.1 : Configuration
const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

// 4.2 : Class Code
const EditBlog = () => {
    const navigate = useNavigate();
    const redirectToBlogs = () => {
        navigate('/listblogs'); 
    };
    const hasRun = useRef(false);
    
    //React Hooks for Component OnLoad() 
    useEffect(() => {
        if (!hasRun.current) {
            console.log("-------Component has loaded-----------");
            hasRun.current = true;
            axios({
                // Endpoint to send files
                url: config.API_URL + "/api/Utils/GetUniqueId",
                method: "GET",
                headers: {
                    // Add any auth token here
                    //authorization: "your token comes here",
                },
            })
            .then((res) => {
                console.log("----------process.env---------");
                //console.log(process.env.NODE_ENV);
                console.log(res.data);
                setBlogId(res.data);
            })
            .catch((err) => {
                console.log("----------OnLoad Error---------");
                console.log(err);
            });

            /*------Get Tags------*/
             axios({
                // Endpoint to send files
                url: config.API_URL + "/api/tags",
                method: "GET",
                headers: {
                    // Add any auth token here
                    //authorization: "your token comes here",
                },
            })
            .then((res) => {
                console.log("----------Get Tags---------");
                console.log(res.data);
                setTags(res.data);
            })
            .catch((err) => {
                console.log("----------OnLoad Error---------");
                console.log(err);
            });
        }
    }, []);
    
    /*---------------------5.2.1: UI Controls Reference ---------------------*/ 
    const formRef = useRef(null);
    const richTextEditorRef = useRef<RichTextEditorComponent | null>(null);
    const [richTextEditorValue, setRichTextEditorValue] = useState<string>('');

    let rteValue: string = "<i>Write your blog...</i>";
    const toolbarSettings: object = {
        items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
        'Outdent', 'Indent', '|',
        'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
        'SourceCode', 'FullScreen', '|', 'Undo', 'Redo', '|', 
        'CreateTable'
        ]
    }

    const quickToolbarSettings: object = {
        image: ['Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-', 'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension'],
        link: ['Open', 'Edit', 'UnLink']
    }

    const insertImageSettings = {
        saveUrl: config.API_URL + '/api/uploadBlogContentImage',
        removeUrl: config.API_URL + '/api/deleteS3Object',
        //path: './uploads/',
        path:config.AWS_S3_URL,
        allowedTypes: ['.png', '.jpg', '.jpeg'],
        maxFileSize: 5000000, // 5MB,
        //saveFormat: 'Blob',  //By default, Syncfusion saves images as Base64. Set saveFormat to 'Blob' to upload the actual file.
       // uploading: onImageUploading, //Add event handler
    }

    const getEditorContent = () => {
        if (richTextEditorRef.current) {
            setRichTextEditorValue(richTextEditorRef.current.value);
        }
    };
 
    /*---------------------5.2.2: UI Models  ------------------------*/
   
    /*const tags = [
        {name: 'liberals', value: 'libs'},
        {name: 'healthcare', value: 'health'},
        {name: 'medicine', value: 'med'},
        {name: 'womens health', value: 'women health'}
    ]*/

    const maxCharacters = 250;

    const defaultValues = {
        title: '',
        shortDescription: '',
        author: 'aditir',
        authorIcon: 'elwinsharvill',
        content: '',
        tag: '',
        blogImage: '',
        publicationDate:null,
    }

    /*---------------------5.2.3: State Management ------------------------*/
    const [currentUser, setCurrentUser] = useState<string | null>('aditir');
    const [blogId, setBlogId] = useState<string | null>(null);
    const [blogImage, setBlogImage] = useState<string | null>(null);
    const [tags, setTags] = useState([]);
    const [formData, setFormData] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const {control, register, formState: { errors }, handleSubmit, reset } = useForm({defaultValues});
    const uploadToast = useRef(null);
    
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    /*---------------------5.2.4: UI Templates ------------------------*/
    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

    /*---------------------5.2.5: Start : Event Handlers------------------------*/
    const onBlogImageUpload = (event: FileUploadUploadEvent) => {
        console.log('-----------------Upload completed-----------------');
        console.log(event.xhr.response);
        const responseData = JSON.parse(event.xhr.response);
        if (Boolean(responseData.status))
        {
            uploadToast.current.show({severity: 'info', summary: 'Success', detail: `File Uploaded ${responseData.key}`, life: 4000});
            let computedBlogImageurl = `${config.AWS_S3_URL}${responseData.key}`;
            setBlogImage(computedBlogImageurl);
        }
        else{
            uploadToast.current.show({severity: 'error', summary: 'Error Message', detail: `File Uploaded ${responseData.message}`, life: 6000});
        }
    }

    const OnBlogImageRemove = (event: FileUploadRemoveEvent) => {
        console.log('-----------------Blog Image Remove-----------------');
        console.log('File removed:', event.file);
        //uploadToast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }

    const onImageUploading = (args) => {
        console.log("Image uploading event triggered. Adding custom form data."); 
        const originalFile = args.fileData;
        console.log(originalFile.name);
    
        // Create a new unique filename
        console.log("-----------newFileName-----------.");
        const newFileName = `blogContentImage_${blogId}_${originalFile.name}`;
        console.log(newFileName);

        //This changes the filename that the server will receive
        //args.fileData.name = newFileName;

        // The 'customFormData' property is an array of key-value pairs.
        // You can add your custom data here.
        args.customFormData = [
            { 'uiAction': 'blogContentImage' },
            { 'userId': 'rajaramans' },
            { 'targetFileName': newFileName },
            { 'blogId': blogId }
        ];
    }

    const OnImageUploadSuccess = (args) => {
        // The args object contains information about the upload
        // args.file: The file object
        // args.response: The response from the server
        console.log('---------------OnImageUploadSuccess----------------------'); 
        const xhr = args.e.currentTarget;
        if (xhr === null || xhr === undefined)
        {
            console.log('---------------OnImageUploadSuccess / Response Issue----------------------'); 
            args.file.name = "File Upload Response Issue";
        }
        else
        {
            console.log('---------------OnImageUploadSuccess / Got Response----------------------'); 
            const responseData = JSON.parse(xhr.responseText);
            console.log(responseData.key);
            const modifiedFileName: string | null = "File Upload Response Issue";
            const message: string = modifiedFileName ?? responseData.key; // "Hello World"
            args.file.name = responseData.key;
        }  
    };

    const onImageRemoving = (args) => {
        console.log("Image Removing event triggered. Adding custom form data.");
        if (args) {
            console.log('Image is being removed:');
            // You can get the image URL from args.file
            //console.log(args);
            const originalFile = args.filesData[0];
            //console.log(originalFile);
            //console.log(originalFile.name);
            args.customFormData = [
                { 'bucketName': config.AWS_S3_BUKCET },
                { 'key': originalFile.name }
            ];
        } 
        else 
            console.error('onImageRemoving event args are null.');
    };

    const apiStatus = {
        status:false,
        statusMessage:false
    };
    const onSubmit = (formData) => {

        setFormData(formData);
        
        //console.log('---------------------formdata-----------------');
        //console.log(blogId);
        //console.log(formData);

        console.log('---------------------post Rich Text Content  to S3-----------------');
        if (richTextEditorRef.current) {
            // Call the get-content method on the editor instance
            const htmlContent = richTextEditorRef.current.getHtml();
            
            //console.log('--- Editor HTML Content ---');
            //console.log(htmlContent);

            const s3APIUrl =  config.API_URL + '/api/uploadRichText';
            const richTextContent = {
                content: htmlContent,
                blogId: blogId
            };
            axios.post(s3APIUrl, richTextContent)
                .then((res) => {
                    console.log(res.data);
                    apiStatus.status = res.data.status;   
                    apiStatus.statusMessage  = res.data.message;
                    if (res.data.status == false)
                       setShowMessage(true)
                    else{
                        console.log('---------------------Save Blog-----------------');
                        const API_URL = config.API_URL;
                        const computedUrl = `${API_URL}/api/blogs/?blogId=${blogId}`;
                        //formData.set('blogImage', blogImage);
                        formData.blogImage = blogImage;
                        console.log(formData);
                        
                        axios({
                                url: computedUrl,
                                method: "POST",
                                data: formData, // Attaching the form data
                            })
                            .then((res) => {
                                //console.log("--------------logged---------------");
                                //console.log(res.data.success);
                                //console.log(res.data.message);
                                apiStatus.status = res.data.status;   
                                apiStatus.statusMessage  = res.data.message;
                                if (res.data.status == false)
                                    setShowMessage(true);
                                else
                                    redirectToBlogs();   
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    }
                });
        }
    };

     /*---------------------5.2.5: End : Event Handlers------------------------*/
    return (   
     <div className="form-demo">
        {/* --------------------------- UI Dialogs--------------------- */}
         <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Blog Status!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                         Your Blog <b>{formData["title"]}</b> Registration {apiStatus.status}
                         Message : {apiStatus.statusMessage}
                    </p>
                </div>
        </Dialog>
        <br></br>
        
        {/* --------------------------- Blog Form--------------------- */}
        <div className="flex flex-wrap align-items-center justify-content-center">
            <Card className="cardStyle" title="Edit Blog">
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                {/*---Hidden variable: This input is not visible to the user------*/}
                
                {/*---<span>{blogId}</span>------*/}
                <div className="field">
                    <span className="p-float-label">
                        <Controller name="title" control={control} rules={{ required: 'Title is required.' }} render={({ field, fieldState }) => (
                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                        )} />
                        <label htmlFor="name" className={classNames({ 'p-error': errors.title })}>Title*</label>
                    </span>
                    {getFormErrorMessage('title')}
                </div>
                <br></br>
                <div className="field">
                    <span className="p-float-label">
                        <Controller name="shortDescription" control={control} rules={{ required: 'Short Description is required.' }} render={({ field, fieldState }) => (
                            <InputTextarea id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} maxLength={maxCharacters}/>
                        )} />
                        <label htmlFor="name" className={classNames({ 'p-error': errors.shortDescription })}>ShortDescription* (Only 250 Characters)</label>
                    </span>
                    {getFormErrorMessage('shortDescription')}
                </div>
                <div className="field">
                    <span>Blog Header Image</span>
                    <FileUpload name="blogImage" url="http://localhost:5000/api/uploadBlogImageToBucket" 
                        onUpload={onBlogImageUpload} onBeforeUpload={({ formData }) => {
                            //xhr.setRequestHeader('Authorization', `Bearer ${userToken}`);
                            formData.append('uiAction', 'blogImage');
                            formData.append('blogId', blogId);
                        }}
                        onRemove={OnBlogImageRemove}
                        accept="image/*" maxFileSize={2000000}
                        emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <Controller name="publicationDate" control={control} render={({ field }) => (
                            <Calendar id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="mm/dd/yy" mask="99/99/9999" showIcon />
                        )} />
                        <label htmlFor="publicationDate">Publication Date</label>
                    </span>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <Controller name="tag" control={control} render={({ field }) => (
                            <Dropdown id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={tags} optionLabel="name" />
                        )} />
                        <label htmlFor="tag">Tag</label>
                    </span>
                </div>

                <Divider align="left">
                    <div className="inline-flex align-items-center">
                        <i className="pi pi-pencil mr-2"></i>
                        <b>Blog Content</b>
                    </div>
                </Divider>

                {/* ---------------------------Blog Content Control--------------------- */}
                 <RichTextEditorComponent ref={richTextEditorRef} 
                        height={450} value={rteValue} 
                        toolbarSettings={toolbarSettings} quickToolbarSettings={quickToolbarSettings}
                        insertImageSettings={insertImageSettings}
                        imageUploading={onImageUploading}
                        imageUploadSuccess={OnImageUploadSuccess}
                        imageRemoving={onImageRemoving}
                    >
                    <Inject services={[Toolbar, HtmlEditor, QuickToolbar, Image, Link, Table, PasteCleanup]} />
                </RichTextEditorComponent>

                {/* ---------------------------Submit Control--------------------- */}    
                <div className="grid">
                    <div className="col-5"/>
                    <div className="col-2">
                        <Button type="submit" label="Save Blog" />
                    </div>
                    <div className="col-1">
                        <Button type="button" label="Reset"  onClick={() => reset()}/>
                    </div>
                    <div className="col-4"></div>
                </div>
                </form>
            </Card>
        </div>
        <Toast ref={uploadToast} />

    </div>
  );
};

export default EditBlog;