import React, { useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';

const Contact: React.FC = () => {
    const formRef = useRef(null);  
    const defaultValues = {
        customerName: '',
        customerEmail: '',
        subject: '',
        message: ''
    }
    const {control, formState: { errors }, handleSubmit, reset } = useForm({defaultValues});

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const onSubmit = (formData) => {
        console.log('-----------------onSubmit------------------');     
        console.log(formData);
    }
    
  return (
    <div>
        <div className="lex justify-content-center flex-wrap">
            <div className="flex align-items-center justify-content-center pt-2">
                <h1>Contact Us</h1>
            </div>
        </div>
        <div className="grid" style={{padding: '2rem'}}>
            <div className="col-7">
                <Card title="Hello !" subTitle="Please complete the form below to reach out to us" >
                    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field col-12 md:col-12 mb-4">
                            <span className="p-float-label">
                                <Controller name="customerName" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="name" className={classNames({ 'p-error': errors.customerName })}>Your Name*</label>
                            </span>
                            {getFormErrorMessage('customerName')}
                        </div>
                        <div className="field col-12 md:col-12 mb-4">
                            <span className="p-float-label">
                                <Controller name="customerEmail" control={control} rules={{ required: 'Email is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="name" className={classNames({ 'p-error': errors.customerEmail })}>Your Email*</label>
                            </span>
                            {getFormErrorMessage('customerEmail')}
                        </div>
                        <div className="field col-12 md:col-12 mb-4">
                            <span className="p-float-label">
                                <Controller name="subject" control={control} rules={{ required: 'Subject is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="name" className={classNames({ 'p-error': errors.subject })}>Email Subject*</label>
                            </span>
                            {getFormErrorMessage('subject')}
                        </div>
                        <div className="field col-12 md:col-12 mb-4">
                            <span className="p-float-label">
                                <Controller name="message" control={control} rules={{ required: 'Event Message is required.' }} render={({ field, fieldState }) => (
                                    <InputTextarea id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} maxLength={1000} rows={6} />
                                )} />
                                <label htmlFor="name" className={classNames({ 'p-error': errors.message })}>Email Subject* (Only 1000 Characters)</label>
                            </span>
                            {getFormErrorMessage('message')}
                        </div>
                    </form>
                </Card>
            </div>
            <div className="col-5">
                <Card title="Reach out" >
                    <p>
                        <h5>Her Healing Initiative</h5>
                
                        855 Grove Ave, 
                        Edison, NJ 08820
                        <br/>        
                         <i className="pi pi-phone  mr-2"><b>&nbsp;&nbsp;+1 (303) 526 7278</b></i>
                         <br/>    
                         <i className="pi pi-envelope  mr-2"><b>&nbsp;&nbsp;Info@HerHealingInitiative.org</b></i>
                    </p>              
                </Card>
            </div>
        </div>
    </div>

  );
};

export default Contact;