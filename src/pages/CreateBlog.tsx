import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';

import '../assets/css/createBlog.css';

const CreateBlog = () => { 
    const [formData, setFormData] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const defaultValues = {
        title: '',
        blogger: '',
        publicationDate: null,
        desc: ' ',
        tags: ' ',
        imglink: ' ',
        authoricon: ' '
    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    const getFormErrorMessage = (name) => {
            return errors[name] && <small className="p-error">{errors[name].message}</small>
    };
  
    const onSubmit = (data) => {
        console.log('---------------------formdata-----------------');
        console.log(data);
        name = data.blogger;
        email = data.blogger + '@gmail.com';
        setFormData(data);
        setShowMessage(true);

        reset();
    };

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
    ];

    let name = '';
    let email = '';

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

    return (   
     <div className="form-demo">
         <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your blog is registered under name <b></b> ; it'll be valid next 30 days without activation. Please check <b></b> for activation instructions.
                    </p>
                </div>
        </Dialog>
        <br></br>
         <div className="flex flex-wrap align-items-center justify-content-center">
                <div className="card">
                  <h2 className="text-center">Create Blog</h2>
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
                            <Controller name="blogger" control={control} render={({ field }) => (
                                <Dropdown id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={bloggers} optionLabel="name" />
                            )} />
                            <label htmlFor="blogger">Blogger</label>
                        </span>
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <Controller name="imglink" control={control} render={({ field }) => (
                               <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                            )} />
                            <label htmlFor="imglink">Image Link</label>
                        </span>
                    </div>
                     <div className="field">
                        <span className="p-float-label">
                            <Controller name="authoricon" control={control} render={({ field }) => (
                               <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                            )} />
                            <label htmlFor="authoricon">Author Icon</label>
                        </span>
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <Controller name="publicationDate" control={control} render={({ field }) => (
                                <Calendar id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="mm/dd/yy" mask="99/99/9999" showIcon />
                            )} />
                            <label htmlFor="date">Publication Date</label>
                        </span>
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <Controller name="desc" control={control} rules={{ required: 'Description is required.' }} render={({ field }) => (
                                <InputTextarea id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} rows={5} cols={30} />
                            )} />
                            <label htmlFor="name" className={classNames({ 'p-error': errors.desc })}>Description*</label>
                        </span>
                    {getFormErrorMessage('desc')}
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <Controller name="tags" control={control} render={({ field }) => (
                                <Dropdown id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={tags} optionLabel="name" />
                            )} />
                            <label htmlFor="country">Tag</label>
                        </span>
                    </div>
                     <Button type="submit" label="Create" className="mt-2" />
                  </form>
                </div>
          </div>
    </div>
  );
};

export default CreateBlog;