/*********************************1: Imports / react *************************************/
import React, { useState, useEffect, useRef} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams  } from 'react-router-dom';
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
import { Image as BlogHeaderImage } from 'primereact/image';
import { Message } from 'primereact/message';

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

/*********************************5: Start : Application Code ********************************/
// 4.1 : Configuration
const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

interface BlogData {
    _id: string;
    blogId: string;
    title: string;
    shortDescription: string;
    tag: string;
    blogImage: string;
    authorIcon: string;
    author: string;
    publicationDate:Date;
}

// 1. Define TypeScript interfaces for your data
interface InitialFile {
    url: string;
    name: string;
}

const EditBlog : React.FC = () => {
    const navigate = useNavigate();
    const redirectToBlogs = () => {
        navigate('/listblogs'); 
    };
    const hasRun = useRef(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentBlog, setCurrentBlog] = useState<BlogData | null>(null);
    const [blogContent, setBlogContent] = useState(null);

    const [initialFile, setInitialFile] = useState<InitialFile | null>(null);
    const [showUploader, setShowUploader] = useState<boolean>(false);
    const [isNewFileSelected, setIsNewFileSelected] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    const uploadUrl = `${config.API_URL}/s3/uploadBlogImageToBucket`;

    //React Hooks for Component OnLoad() 
    useEffect(() => {
        if (!hasRun.current) {       
            // Get a single query parameter
            const blogId = searchParams.get('blogId');
            //console.log('----------blogId------');
            //console.log(blogId);
            //const { blogId } = useParams<BlogParams>();
            //console.log("-------Edit Blog Component has loaded-----------");
            hasRun.current = true;

            /*------Get Lookup Tags------*/
            axios({
                // Endpoint to send files
                url: config.API_URL + "/tags",
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
            
            /*------Get BlogData------*/
            axios({
                // Endpoint to send files
                url: `${config.API_URL}/blogs/getBlogByBlogId/${blogId}`,
                method: "GET",
                headers: {
                    // Add any auth token here
                    //authorization: "your token comes here",
                },
            })
            .then((res) => {
                console.log("----------Get Blog Data---------");
                //console.log(process.env.NODE_ENV);

                const retrievedBlogData = res.data;
                console.log(retrievedBlogData);
                //setBlogId(res.data.blogId)
                if (retrievedBlogData.publicationDate) {
                    const parsedDate = new Date(retrievedBlogData.publicationDate);
                    retrievedBlogData.publicationDate = parsedDate;

                setCurrentBlog(retrievedBlogData);
                // Reset the form with the data from the API call
                reset(retrievedBlogData); 
            }})
            .catch((err) => {
                console.log("----------OnLoad Error---------");
                console.log(err);
            });

            
             
            /*------Get Blog Content------*/
            const fileKey = `BlogContent_${blogId}.html`
            const s3APIUrl =  `${config.API_URL}/s3/getContent?key=${fileKey}`;
            axios({
                // Endpoint to send files
                url: s3APIUrl,
                method: "GET",
                headers: {
                    // Add any auth token here
                    //authorization: "your token comes here",
            },
            })
            .then((res) => {
                console.log("----------Get Blog content---------");
                console.log(res.data);
                setBlogContent(res.data);
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
        saveUrl: config.API_URL + '/s3/uploadBlogContentImage',
        removeUrl: config.API_URL + '/deleteS3Object',
        path:config.AWS_S3_URL,
        allowedTypes: ['.png', '.jpg', '.jpeg'],
        maxFileSize: 5000000, // 5MB,
    }

    /*---------------------5.2.2: UI Models  ------------------------*/
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
    const {control, formState: { errors }, handleSubmit, reset } = useForm({defaultValues});
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

    const onBlogContentChange = (args) => {
        // Update the state with the new value
        setBlogContent(args.value);
    };
    

    const onContentImageUploading = (args) => {
        console.log("Image uploading event triggered. Adding custom form data."); 
        const originalFile = args.fileData;
        console.log(originalFile.name);
    
        // Create a new unique filename
        console.log("-----------newFileName-----------.");
        const newFileName = `blogContentImage_${currentBlog.blogId}_${originalFile.name}`;
        console.log(newFileName);

        //This changes the filename that the server will receive
        //args.fileData.name = newFileName;

        // The 'customFormData' property is an array of key-value pairs.
        // You can add your custom data here.
        args.customFormData = [
            { 'uiAction': 'blogContentImage' },
            { 'userId': 'rajaramans' },
            { 'targetFileName': newFileName },
            { 'blogId': currentBlog.blogId }
        ];
    }

    const onContentImageUploadSuccess = (args) => {
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

    const onContentImageRemoving = (args) => {
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

    const onBlogImageRemove = () => {
        //setUploadedFiles([]);
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

            const s3APIUrl =  config.API_URL + '/s3/uploadRichText';
            const richTextContent = {
                content: htmlContent,
                blogId: currentBlog.blogId
            };
            console.log("----------------------formData-----------------");
            console.log(formData);
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
                    const computedUrl = `${API_URL}/blogs/saveBlog/?_id=${currentBlog._id}`;
                    //formData.set('blogImage', blogImage);
                    if (isNewFileSelected)
                        formData.blogImage = blogImage;
                    else
                        formData.blogImage = currentBlog.blogImage;
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
                        console.log("--------------Blog-Save() failed----------------");
                        console.log(err);
                    });
                }
            })
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
        <br/>
        
        {/* --------------------------- Blog Form--------------------- */}
        <div className="flex flex-wrap align-items-center justify-content-center">
            <Card className="cardStyle" title="Edit Blog">
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                {/*---Hidden variable: This input is not visible to the user------*/}

                <div className="field">
                    <span className="p-float-label">
                        <Controller name="title" control={control} rules={{ required: 'Title is required.' }} render={({ field, fieldState }) => (
                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                        )} />
                        <label htmlFor="name" className={classNames({ 'p-error': errors.title })}>Title*</label>
                    </span>
                    {getFormErrorMessage('title')}
                </div>
                <br/>
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
                    <h5>Current Banner</h5>
                    <BlogHeaderImage 
                    src={currentBlog?.blogImage}  
                    zoomSrc={currentBlog?.blogImage} 
                    alt="Image" width="100%" height="200" preview />
                </div>


                <div className="field">
                    <div className="col-12 md:col-12">
                        <Message severity="info" style={{textAlign:'left'}} text="IF you need to upload a new Banner 'Upload' a new Banner below. Only .png, .jpeg, .jpg files below 1MB are supported. Upload a Image 640 X 200 !" />
                    </div>
                    <FileUpload name="blogImage" url={uploadUrl} 
                        onUpload={onBlogImageUpload} onBeforeUpload={({ formData }) => {
                            formData.append('uiAction', 'UpdateBlogHeaderImage');
                            formData.append('blogId', currentBlog.blogId);
                        }}
                        onRemove={onBlogImageRemove}
                        accept="image/*" maxFileSize={2000000}
                        emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                </div>
                <br/>
                <div className="field">
                    <span className="p-float-label">
                        <Controller
                            name="publicationDate"
                            control={control}
                            render={({ field }) => (
                                <Calendar
                                // This is the crucial part: spreading the field object
                                {...field} 
                                
                                // You can still add your other custom props
                                id={field.name}
                                dateFormat="mm/dd/yy"
                                mask="99/99/9999"
                                showIcon
                                />
                            )}
                            />
                        <label htmlFor="publicationDate">Publication Date</label>
                    </span>
                </div>
                <br/>
                <div className="field">
                    <span className="p-float-label">
                        <Controller name="tag" control={control} 
                         render={({ field }) => (
                            <Dropdown
                            // Spreading the `field` object is the key.
                            // This automatically passes `value={field.value}`,
                            // `onChange={field.onChange}`, `onBlur={field.onBlur}`, and `ref={field.ref}`.
                                {...field}
                                options={tags}
                                optionLabel="name"
                                optionValue="value"
                                // PrimeReact requires an `id` prop for accessibility
                                id={field.name}/>
                            )}
                        />
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
                        value={blogContent}  
                        height={450} 
                        toolbarSettings={toolbarSettings} quickToolbarSettings={quickToolbarSettings}
                        change={onBlogContentChange}
                        insertImageSettings={insertImageSettings}
                        imageUploading={onContentImageUploading}
                        imageUploadSuccess={onContentImageUploadSuccess}
                        imageRemoving={onContentImageRemoving}
                    >
                    <Inject services={[Toolbar, HtmlEditor, QuickToolbar, Image, Link, Table, PasteCleanup]} />
                </RichTextEditorComponent>

                {/* ---------------------------Submit Control--------------------- */}    
                <br/>
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