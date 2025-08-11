/*********************************1: Imports / react *************************************/
import React, { useState, useEffect, useRef} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/*********************************2: Imports / primereact ********************************/
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { Fieldset } from 'primereact/fieldset';

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
    PasteCleanup, 
    ImportExport, ImportWordModel , ExportWordModel, ExportPdfModel
} 
from '@syncfusion/ej2-react-richtexteditor';

/*********************************4: Imports / custom css ********************************/
import '../assets/css/createBlog.css';

/*********************************5: Start : Application Code ********************************/
// 4.1 : Configuration
const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');
const blogHeaderImage =  require("../assets/images/blogheader.jpg");

// 4.2 : Class Code
const CreateBlog = () => {
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
                console.log(process.env.NODE_ENV);
                console.log(res.data);
                setBlogId(res.data);
            })
            .catch((err) => {
                console.log("----------OnLoad Erro---------");
                console.log(err);
            });
        }
    }, []);
    
    /*---------------------5.2.1: UI Controls Reference ---------------------*/ 
    const richTextEditorRef = useRef<RichTextEditorComponent | null>(null);
    const [richTextEditorValue, setRichTextEditorValue] = useState<string>('');

    const hostUrl: string = 'https://services.syncfusion.com/react/production/';
    let rteValue: string = "<i>Write your blog...</i>";
    const toolbarSettings: object = {
        items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
        'Outdent', 'Indent', '|',
        'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
        'SourceCode', 'FullScreen', '|', 'Undo', 'Redo', '|', 
        'CreateTable', '|', 
        'ImportWord', '|', 'ExportWord', 'ExportPdf'
        ]
    }

    const quickToolbarSettings: object = {
        image: ['Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-', 'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension'],
        link: ['Open', 'Edit', 'UnLink']
    }

    const insertImageSettings = {
        saveUrl: hostUrl + 'api/RichTextEditor/SaveFile',
        removeUrl: hostUrl + 'api/RichTextEditor/DeleteFile',
        path: hostUrl + 'RichTextEditor/'
    }

    const importWord: ImportWordModel = {
        serviceUrl: hostUrl + 'api/RichTextEditor/ImportFromWord',
    };
    const exportWord: ExportWordModel = {
        serviceUrl: hostUrl + 'api/RichTextEditor/ExportToDocx',
        fileName: 'RichTextEditor.docx'
    };

    const exportPdf: ExportPdfModel = {
        serviceUrl: hostUrl + 'api/RichTextEditor/ExportToPdf',
        fileName: 'RichTextEditor.pdf'
    };

    const getEditorContent = () => {
        if (richTextEditorRef.current) {
            setRichTextEditorValue(richTextEditorRef.current.value);
        }
    };
 
    /*---------------------5.2.2: UI Models  ------------------------*/
   
    const bloggers = [
        {name: 'Aditi Rajaraman', value: 'AditiR'},
        {name: 'Shruthi Srinivisan', value: 'Shruthi'},
        {name: 'Snigdha Tadikamalla', value: 'Snigdha'},
        {name: 'Haarika Pemmeraju', value: 'Baarika'},
        {name: 'Tejaswi Garlapati', value: 'TJ'}
    ];

    const tags = [
        {name: 'liberals', value: 'libs'},
        {name: 'healthcare', value: 'health'},
        {name: 'medicine', value: 'med'},
        {name: 'womens health', value: 'women health'},
    ]

    const defaultValues = {
        title: '',
        author: '',
        authorIcon: '',
        content: '',
        tag: '',
        blogImage: '',
        publicationDate:null,
    }

    /*---------------------5.2.3: State Management ------------------------*/
    const [blogId, setBlogId] = useState<string | null>(null);
    const [formData, setFormData] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const {control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    const uploadToast = useRef(null);
    
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    /*---------------------5.2.4: UI Templates ------------------------*/
    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const blogHeaderBanner = (
        <img alt="Card" src='https://as2.ftcdn.net/v2/jpg/15/97/57/01/1000_F_1597570101_kdgfiEZ7EjmaeMDRZb1KkAlhZfXo1GPB.jpg' style={{ width:'100%', height:'200px'}}/>
    );

    /*---------------------5.2.5: event Handlers------------------------*/
    const onUpload = () => {
        uploadToast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }

    /*---------------------5.2.6: api call / start ------------------------*/
    const apiStatus = {
        status:false,
        statusMessage:false
    };
    const onSubmit = (formData) => {
        setFormData(formData);
        
        console.log('---------------------formdata-----------------');
        console.log(formData);

        getEditorContent()
                
        axios({
            // Endpoint to send files
                url: config.API_URL + "/api/blogs",
                method: "POST",
                data: formData, // Attaching the form data
            })
            .then((res) => {
                //console.log("--------------logged---------------");
                //console.log(res.data.success);
                //console.log(res.data.message);
                apiStatus.status = res.data.success;   
                apiStatus.statusMessage  = res.data.message;
        })
        .catch((err) => {
            console.log(err);
        });
        setShowMessage(true);

        reset();
    };

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
            <Card className="cardStyle" title="Create Blog">
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
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
                <div className="field">
                    <span>Blog Header Image</span>
                    <FileUpload name="blogImage" url="http://localhost:5000/api/fileUpload/uploadImage" 
                            onUpload={onUpload} onBeforeUpload={({ formData }) => {
                                //xhr.setRequestHeader('Authorization', `Bearer ${userToken}`);
                                formData.append('uiAction', 'blogImage');
                                formData.append('blogId', blogId);
                            }}
                            accept="image/*" maxFileSize={1000000}
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
                    importWord={importWord}
                    exportPdf={exportPdf} 
                    exportWord={exportWord}>
                    <Inject services={[Toolbar, HtmlEditor, QuickToolbar, Image, Link, Table, PasteCleanup, ImportExport]} />
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

export default CreateBlog;