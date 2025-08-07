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

/*********************************3: Imports / mdxEditor ********************************/
import '@mdxeditor/editor/style.css'
import { MDXEditor, 
  Separator,
  UndoRedo, 
  BoldItalicUnderlineToggles, 
  toolbarPlugin,
  headingsPlugin,
  BlockTypeSelect,

  InsertTable,
  tablePlugin,
  
  ListsToggle,
  listsPlugin,

  InsertImage,
  imagePlugin,

  InsertThematicBreak,
  thematicBreakPlugin,

  CodeToggle,
  InsertCodeBlock,
  codeBlockPlugin,
  codeMirrorPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,

  CreateLink,
  linkDialogPlugin,

  type MDXEditorMethods 
} 
from '@mdxeditor/editor'

/*********************************4: Imports / custom css ********************************/
import '../assets/css/createBlog.css';

/*********************************5: Start : Application Code ********************************/
// 4.1 : Configuration
const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

// 4.2 : Class Code
const CreateBlog = () => {
    /*---------------------5.2.1: UI Controls Reference ---------------------*/ 
    const editorRef = useRef<MDXEditorMethods>(null);
 
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
    const [formData, setFormData] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    /*---------------------5.2.4: UI Templates ------------------------*/
    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

    /*---------------------5.2.5: event Handlers------------------------*/

    /*---------------------5.2.6: api call / start ------------------------*/
    const apiStatus = {
        status:false,
        statusMessage:false
    };
    const onSubmit = (formData) => {
        setFormData(formData);
        
        console.log('---------------------formdata-----------------');
        console.log(formData);
                
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
        
        {/* --------------------------- Events--------------------- */}
        <div className="flex flex-wrap align-items-center justify-content-center">
            <Card className="cardStyle" title="Create Blog">
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
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
                    <span className="p-float-label">
                        <Controller name="author" control={control} render={({ field }) => (
                            <Dropdown id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={bloggers} optionLabel="name" />
                        )} />
                        <label htmlFor="author">Blogger</label>
                    </span>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <Controller name="blogImage" control={control} render={({ field }) => (
                            <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                        )} />
                        <label htmlFor="blogImage">Image Link</label>
                    </span>
                </div>
                    <div className="field">
                    <span className="p-float-label">
                        <Controller name="authorIcon" control={control} render={({ field }) => (
                            <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                        )} />
                        <label htmlFor="authorIcon">Author Icon</label>
                    </span>
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

                <Divider />
                
                {/* ---------------------------Blog Content Control--------------------- */}
                <MDXEditor 
                    ref={editorRef}
                    markdown={'# Your Blog Content...'}
                    contentEditableClassName="prose" 
                    plugins={[
                    toolbarPlugin({
                        toolbarClassName: 'my-classname',
                        toolbarContents: () => (
                            <>
                            <UndoRedo/>
                            <BoldItalicUnderlineToggles/>
                            <BlockTypeSelect/>
                            <Separator/>
                            <InsertTable/>
                            <Separator/>
                            <ListsToggle/>
                            <Separator/>
                            <InsertImage/>
                            <CreateLink/>
                            <Separator/>
                            <InsertThematicBreak/>
                            <Separator/>
                            <ConditionalContents
                                options={[
                                { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                                {
                                    fallback: () => (
                                    <>
                                        <InsertCodeBlock />
                                    </>
                                    )
                                }
                                ]}
                            />
                            </>
                        )
                    }),
                    headingsPlugin(),
                    tablePlugin(),
                    listsPlugin(),
                    imagePlugin(),
                    thematicBreakPlugin(),
                    codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
                    codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } })
                    ]} 
                />

                {/* ---------------------------Submit Control--------------------- */}    
                <Button type="submit" label="Create" className="mt-2" />
                </form>
            </Card>
        </div>

    </div>
  );
};

export default CreateBlog;