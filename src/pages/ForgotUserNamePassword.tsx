/*********************************1: Imports / react *************************************/
import React, { useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

/*********************************2: Imports / primereact ********************************/
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';

/*********************************3: Imports / primereact ********************************/
const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

/*********************************3: Imports / primereact ********************************/
const ForgotUserNamePassword : React.FC = () => {
  const navigate = useNavigate();
  const defaultValues = {
      firstName: '',
      lastName: '',
      birthDate:null,
      email: ''
  }
  const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
  useEffect(() => {
    console.log("-------------------On Form Load-------------------");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getFormErrorMessage = (name) => {
      return errors[name] && <small className="p-error">{errors[name].message}</small>
  };
  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <div className="flex border-round justify-content-center">
      <Panel header="Verify your Identity" style={{marginTop:'20px', width:'50%'}} >
         <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
           <div className="grid">
              <div className="col-6">
                  <div className="field">
                      <span className="p-float-label" style={{marginTop:'20px'}}>
                          <Controller name="firstName" control={control} rules={{ required: 'First Name is required.' }} render={({ field, fieldState }) => (
                              <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                          )} />
                          <label htmlFor="firstName" className={classNames({ 'p-error': errors.firstName })}>First Name*</label>
                      </span>
                      {getFormErrorMessage('firstName')}
                  </div>
              </div>
              <div className="col-6">
                <div className="field">
                    <span className="p-float-label" style={{marginTop:'20px'}}>
                        <Controller name="lastName" control={control} rules={{ required: 'Last Name is required.' }} render={({ field, fieldState }) => (
                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                        )} />
                        <label htmlFor="lastName" className={classNames({ 'p-error': errors.lastName })}>Last Name*</label>
                    </span>
                    {getFormErrorMessage('lastName')}
                  </div>
              </div>
              <div className="col-12">
                <div className="field">
                    <span className="p-float-label" style={{marginTop:'20px'}}>
                        <Controller name="birthDate" control={control} render={({ field }) => (
                            <Calendar id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                        )} />
                        <label htmlFor="birthDate">Birthday</label>
                    </span>
                  </div>
              </div>
              <div className="col-6">
                 <div className="field">
                  <span className="p-float-label p-input-icon-right" style={{marginTop:'20px'}}>
                    <Controller name="email" control={control}
                        rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' }}}
                        render={({ field, fieldState }) => (
                            <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                    )} />
                    <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
                  </span>
                  {getFormErrorMessage('email')}
                 </div>
              </div>
              <div className="col-6"></div>
              <div className="col-3"></div>
              <div className="col-2">
                <Button type="reset" label="Cancel" className="p-button-secondary" />
              </div>
               <div className="col-2">
                <Button type="submit" label="Submit" className="p-button-success" />
              </div>
              <div className="col-3">
              </div>
            </div>
         </form>
      </Panel>
    </div>
  );
};

export default ForgotUserNamePassword;