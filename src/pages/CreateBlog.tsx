import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import '../assets/css/createBlog.css';

const CreateBlog = () => { 
  const defaultValues = {
    title: '',
    blogger: '',
    publicationDate: null,
    desc: ' ',
  }
  const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
  const getFormErrorMessage = (name) => {
          return errors[name] && <small className="p-error">{errors[name].message}</small>
  };
  const [formData, setFormData] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const onSubmit = (data) => {
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

return (   
     <div className="form-demo">
         <div className="flex justify-content-center">
                <div className="card">
                  <h5 className="text-center">Create Blog</h5>
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
                              <label htmlFor="country">Blogger</label>
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
                     <Button type="submit" label="Create" className="mt-2" />
                  </form>
                </div>
          </div>
    </div>
  );
};

export default CreateBlog;