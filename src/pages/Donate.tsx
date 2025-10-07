/*********************************1: Imports / react *************************************/
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

/*********************************2: Imports / primereact ********************************/
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputMask } from 'primereact/inputmask';
import { useForm, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';

/*********************************3: Imports / custom css ********************************/
import '../assets/css/donate.css';

/*********************************3: Imports / configs ********************************/
const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

/*********************************4: Component View ********************************/

const Donate = () => {
    /*---------------------4.1: Navigators ---------------------*/

    /*---------------------4.2: Variablea ---------------------*/

     const donationFrequencies = [
        { name: 'Weekly', code: 'Weekly' },
        { name: 'Bi-Weekly', code: 'Bi-Weekly' },
        { name: 'Monthly', code: 'Monthly' },
        { name: 'Quarterly', code: 'Quarterly' },
        { name: 'Semi-Annually', code: 'Semi-Annually' },
        { name: 'Year', code: 'Yearly' }
    ];
    const donationReasons = [
        { name: 'Rapid Response Fund', code: 'RRF' },
        { name: 'Her Healing Initiative', code: 'HHI' },
        { name: 'United Nations Womens Fund', code: 'UNfund' }
    ];

    const defaultValues = {
        donationType: '',
        donationFrequency: donationFrequencies[0],
        donationReason: '',
        otherAmountCurrency: '',
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zip:null,
        state: '',
        country: '',
        phonenumber:'',
        comments:'',
        otherAmount:null
    }

    /*---------------------4.3: State Management ------------------------*/
    const options = ['One-Time', 'Recurring'];
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState<any>(null);
    const [donationType, setDonationType] = useState<"One-Time" | "Recurring">("Recurring");
    const [selectedPaymentFrequency, setSelectedPaymentFrequency] = useState<any>(donationFrequencies[0]);
    const {control, register, formState: { errors }, handleSubmit, reset } = useForm({defaultValues});
    const [formData, setFormData] = useState({});

    /*---------------------4.4: Control References ---------------------*/
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    /*---------------------4.5: Control Event Handlers -------------------*/
    const currencyOptionTemplate = (option: any) => {
        return (
            <div className="currency-item">
                <div>{option.code} | {option.country}</div>
            </div>
        );
    }

    const onSubmit = (formData) => {
        setFormData(formData);

    //console.log('---------------------formdata-----------------');
    }

    /*---------------------4.: UI Controls Reference ---------------------*/ 
    
    
    const formRef = useRef(null);

    /*---------------------4.7: React Hooks for Component OnLoad()  ---------------------*/
    useEffect(() => {
      const apiKey = process.env.API_URL;
      console.log(apiKey);
      axios({
        // Endpoint to send files
        url: config.API_URL + "/currencies",
        method: "GET"
        })
        .then((res) => {
            //console.log("--------------logged---------------");
            setCurrencies(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div style={{padding: '5rem'}}>
            <Card title = "Donation" style={{borderRadius: '5px', border: '1px solid #dcdcdc', boxShadow: '0 2px 8px rgba(2, 2, 2, 0.3)'}}>
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <div className="lex justify-content-center flex-wrap">
                    <div className="flex align-items-center justify-content-center pt-2">
                        <h6> We’re on a mission to end the global water crisis and committed to demonstrating God's love by restoring hope and health to under-served populations through trusted, sustainable safe water solutions and health & hygiene education.</h6>
                    </div>
                </div>
                <div className="p-fluid grid formgrid pt-5">
                    <div className="field col-3 md:col-3"></div>
                    <div className="field col-6 md:col-6">
                        <span className="p-float-label">  
                            <Controller name="donationType" control={control} rules={{ required: 'Donation type is required.' }} render={({ field, fieldState }) => (
                                <SelectButton id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} value={donationType} onChange={(e) => setDonationType(e.value)} options={options}/>
                            )} />
                        </span>
                        {getFormErrorMessage('donationType')}
                    </div> 
                    <div className="field col-3 md:col-3"></div>
                </div>

                {/* ---------------------------Start : Donation Frequency--------------------- */}
                {donationType === "Recurring" && (
                <div>
                    <div className="field col-12 md:col-12">
                        <span className="p-float-label">
                            <Controller name="donationFrequency" control={control} rules={{ required: 'Donation frequency is required.' }} render={({ field}) => (  
                                <Dropdown id={field.name} value={field.value} options={donationFrequencies} optionLabel="name" 
                                onChange={(e) => {
                                    field.onChange(e.value);              // update form value
                                    setSelectedPaymentFrequency(e.value); // update local state for display
                                }}/>
                            )} />
                            <label htmlFor="donationFrequency" className={classNames({ 'p-error': errors.donationFrequency })} style={{fontSize: '15px'}}>Donation Frequency*</label>
                        </span>
                        {getFormErrorMessage('donationFrequency')}
                    </div>
                    <div className="field col-12 md:col-12" style={{ textAlign: 'center' }}>
                        Choose a&nbsp;<b>{selectedPaymentFrequency.name}</b>&nbsp;amount.
                    </div>
                </div>
                )}
                {donationType === "One-Time" && (
                    <div className="field col-12 md:col-12">
                        Choose a &nbsp;<b>one-time</b>&nbsp;amount.
                    </div>
                )}

                {/* -------------------------End: Donation Frequency--------------------- */}

                <div className="p-fluid grid formgrid pt-5">
                    <div className="field col-2 md:col-2">
                        <Button label="$250" className="p-button-raised p-button-info" style={{backgroundColor: 'slateblue', color: '#fff', border: 'none'}}/>
                    </div>
                    <div className="field col-2 md:col-2">
                        <Button label="$200" className="p-button-raised p-button-info" style={{backgroundColor: 'slateblue', color: '#fff', border: 'none'}}/>
                    </div>
                    <div className="field col-2 md:col-2">
                        <Button label="$150" className="p-button-raised p-button-info" style={{backgroundColor: 'slateblue', color: '#fff', border: 'none'}}/>
                    </div>
                    <div className="field col-2 md:col-2">
                        <Button label="$100" className="p-button-raised p-button-info" style={{backgroundColor: 'slateblue', color: '#fff', border: 'none'}}/>
                    </div>
                    <div className="field col-2 md:col-2" >
                         <span className="p-float-label">
                             <Controller name="otherAmountCurrency" control={control} rules={{ required: 'Currency is required.' }} render={({ field}) => (  
                                <Dropdown id={field.name} value={field.value} options={currencies} optionLabel="name" filter showClear filterBy="name" placeholder="Select a Currency"
                                    itemTemplate={currencyOptionTemplate} 
                                    style={{backgroundColor: 'lightsteelblue'}}
                                    onChange={(e) => {
                                        field.onChange(e.value);      // update form value
                                        setSelectedCurrency(e.value); // update local state for display
                                    }
                                }/>
                            )} />
                            </span>
                            {getFormErrorMessage('otherAmountCurrency')}
                    </div>

                    <div className="field col-2 md:col-2">
                        <span className="p-float-label">
                            <Controller name="otherAmount" control={control} rules={{ required: 'Other Amount is required.' }} render={({ field}) => (  
                                <InputMask id={field.name} mask="99999" placeholder="9999" {...field} value={field.value} ></InputMask>
                            )} />
                            <label htmlFor="otherAmount" className={classNames({ 'p-error': errors.otherAmount })} style={{fontSize: '15px'}}>Other Amount (Numbers Only)</label>
                        </span>
                    </div>

                    <div className="field col-6 md:col-6 pt-5">
                    <span className="p-float-label">
                        <Controller name="donationReason" control={control} rules={{ required: 'Donation Reason is required.' }} render={({ field}) => (  
                            <Dropdown {...field} id={field.name} value={field.value} options={donationReasons} optionLabel="name" onChange={(e) => field.onChange(e.value)}/>
                        )} />
                        <label htmlFor="donationReason" className={classNames({ 'p-error': errors.donationReason })} style={{fontSize: '15px'}}>What would you like your donation to support?*</label>
                    </span>
                    {getFormErrorMessage('donationReason')}
                    </div>
                    <div className="field col-6 md:col-6"></div>

                    {/* -------------------------Your Information--------------------- */}
                    <div className="field col-12 md:col-12 pt-5">
                        <h4>Your Information</h4>
                    </div>

                    <div className="p-fluid grid formgrid pt-5">
                        <div className="field col-6 md:col-6">
                            <span className="p-float-label">
                                <Controller name="firstName" control={control} rules={{ required: 'First Name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="firstName" className={classNames({ 'p-error': errors.firstName })}>First Name*</label>
                            </span>
                            {getFormErrorMessage('firstName')}
                        </div>
                        <div className="field col-6 md:col-6">
                            <span className="p-float-label">
                                <Controller name="lastName" control={control} rules={{ required: 'Last Name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="lastName" className={classNames({ 'p-error': errors.lastName })}>Last Name*</label>
                            </span>
                            {getFormErrorMessage('lastName')}
                        </div>
                        <div className="field col-12 md:col-12">
                            <span className="p-float-label">
                                <Controller name="email" control={control} rules={{ required: 'Email is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="email" className={classNames({ 'p-error': errors.email })}>Email*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="field col-12 md:col-12">
                            <span className="p-float-label">
                                <Controller name="address" control={control} rules={{ required: 'Address is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="email" className={classNames({ 'p-error': errors.address })}>Address*</label>
                            </span>
                            {getFormErrorMessage('address')}
                        </div>
                        <div className="field col-6 md:col-6">
                            <span className="p-float-label">
                                <Controller name="zip" control={control} rules={{ required: 'Zip is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="zip" className={classNames({ 'p-error': errors.zip })}>Zip*</label>
                            </span>
                            {getFormErrorMessage('zip')}
                        </div>
                        <div className="field col-6 md:col-6">
                            <span className="p-float-label">
                                <Controller name="city" control={control} rules={{ required: 'City is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="city" className={classNames({ 'p-error': errors.city })}>City*</label>
                            </span>
                            {getFormErrorMessage('city')}
                        </div>
                        <div className="field col-6 md:col-6">
                            <span className="p-float-label">
                                <Controller name="state" control={control} rules={{ required: 'state is required.' }} render={({ field}) => (  
                                    <Dropdown {...field} id={field.name} value={field.value} options={donationReasons} optionLabel="name" onChange={(e) => field.onChange(e.value)}/>
                                )} />
                                <label htmlFor="state" className={classNames({ 'p-error': errors.state })} style={{fontSize: '15px'}}>State*</label>
                            </span>
                            {getFormErrorMessage('state')}
                        </div>
                         <div className="field col-6 md:col-6">
                            <span className="p-float-label">
                                <Controller name="country" control={control} rules={{ required: 'country is required.' }} render={({ field}) => (  
                                    <Dropdown {...field} id={field.name} value={field.value} options={donationReasons} optionLabel="name" onChange={(e) => field.onChange(e.value)}/>
                                )} />
                                <label htmlFor="country" className={classNames({ 'p-error': errors.country })} style={{fontSize: '15px'}}>Country*</label>
                            </span>
                        {getFormErrorMessage('country')}
                        </div>
                        <div className="field col-12 md:col-12">
                            <span className="p-float-label">
                                <Controller name="comments" control={control} rules={{ required: 'Comments is required.' }} render={({ field, fieldState }) => (
                                    <InputTextarea id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} maxLength={500} rows={6} />
                                )} />
                                <label htmlFor="comments" className={classNames({ 'p-error': errors.comments })}>Comments*</label>
                            </span>
                            {getFormErrorMessage('comments')}
                        </div>

                    </div>
                </div>
                
                </form>
            </Card>
        </div>
    );
};

export default Donate;