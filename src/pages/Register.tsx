import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Panel } from 'primereact/panel';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

export const Register = () => {
    const navigate = useNavigate();
    const handleCreateEvent = () => {
    navigate('/'); 
    };
    const [countries, setCountries] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const defaultValues = {
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        birthdate: null,
        country: null,
        accept: false
    }

  const registeredStatus = {
    status:false,
    statusMessage:false,
    userName:'',
    useremail:'', 
  };
  const [registrationStatus, setRegistrationStatus] = useState(registeredStatus);

  useEffect(() => {
      //countryservice.getCountries().then(data => setCountries(data));
      const countries = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
      ];
      setCountries(countries);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

  const onSubmit = (formData) => {
      setFormData(formData);
      
      //setShowMessage(true);
      //console.log(data);
      axios({
        // Endpoint to send files
        url: "http://localhost:5500/api/users",
        method: "POST",
        headers: {
            // Add any auth token here
            //authorization: "your token comes here",
        },

        // Attaching the form data
        data: formData,
        })
        // Handle the response from backend here
        .then((res) => {
            //console.log("--------------logged---------------");
            //console.log(res.data.success);
            //console.log(res.data.message);
            registeredStatus.status = res.data.success;   
            registeredStatus.statusMessage  = res.data.message;
            registeredStatus.userName  = formData.username;
            registeredStatus.useremail  = formData.email;
            setRegistrationStatus(registeredStatus);
            res.data.success ? setShowSuccessMessage(true) : setShowFailureMessage(true)
            //setShowSuccessMessage(true);
        })
        .catch((err) => {
            console.log(err);
            setShowFailureMessage(true);
        });


      reset();
  };



  const getFormErrorMessage = (name) => {
      return errors[name] && <small className="p-error">{errors[name].message}</small>
  };

  const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={handleCreateEvent} /></div>;
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
      <React.Fragment>
          <Divider />
          <p className="mt-2">Suggestions</p>
          <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
              <li>At least one lowercase</li>
              <li>At least one uppercase</li>
              <li>At least one numeric</li>
              <li>Minimum 8 characters</li>
          </ul>
      </React.Fragment>
  );

  return (
      <div className="form-demo">
          <Dialog visible={showSuccessMessage} onHide={() => setShowSuccessMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
              <div className="flex justify-content-center flex-column pt-6 px-3">
                  <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                  <h5>Registration Successful!</h5>
                  <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                      Your account is registered under name <b>{formData["username"]}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData["email"]}</b> for activation instructions.
                  </p>
              </div>
          </Dialog>

          <Dialog visible={showFailureMessage} onHide={() => setShowFailureMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
              <div className="flex justify-content-center flex-column pt-6 px-3">
                  <i className="pi pi-ban" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                  <h5>Registration Failed!</h5>
                  <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                      Error : {registrationStatus.statusMessage}
                  </p>
              </div>
          </Dialog>

          <div className="flex border-round justify-content-center">

              <Panel header="Register" style={{marginTop:'20px'}} >
                  <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                      <div className="field">
                          <span className="p-float-label" style={{marginTop:'20px'}}>
                              <Controller name="firstname" control={control} rules={{ required: 'First Name is required.' }} render={({ field, fieldState }) => (
                                  <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                              )} />
                              <label htmlFor="firstname" className={classNames({ 'p-error': errors.firstname })}>First Name*</label>
                          </span>
                          {getFormErrorMessage('firstname')}
                      </div>
                      <div className="field">
                          <span className="p-float-label" style={{marginTop:'20px'}}>
                              <Controller name="lastname" control={control} rules={{ required: 'Last Name is required.' }} render={({ field, fieldState }) => (
                                  <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                              )} />
                              <label htmlFor="lastname" className={classNames({ 'p-error': errors.lastname })}>Last Name*</label>
                          </span>
                          {getFormErrorMessage('lastname')}
                      </div>
                      <div className="field">
                          <span className="p-float-label" style={{marginTop:'20px'}}>
                              <Controller name="username" control={control} rules={{ required: 'User Name is required.' }} render={({ field, fieldState }) => (
                                  <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                              )} />
                              <label htmlFor="lastname" className={classNames({ 'p-error': errors.lastname })}>User Name*</label>
                          </span>
                          {getFormErrorMessage('username')}
                      </div>
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
                      <div className="field">
                          <span className="p-float-label" style={{marginTop:'20px'}}>
                              <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                                  <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} header={passwordHeader} footer={passwordFooter} />
                              )} />
                              <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                          </span>
                          {getFormErrorMessage('password')}
                      </div>
                      <div className="field">
                          <span className="p-float-label" style={{marginTop:'20px'}}>
                              <Controller name="birthdate" control={control} render={({ field }) => (
                                  <Calendar id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                              )} />
                              <label htmlFor="birthdate">Birthday</label>
                          </span>
                      </div>
                      <div className="field">
                          <span className="p-float-label" style={{marginTop:'20px'}}>
                              <Controller name="country" control={control} render={({ field }) => (
                                  <Dropdown id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={countries} optionLabel="name"/>
                              )} />
                              <label htmlFor="country">Country</label>
                          </span>
                      </div>
                      <div className="field-checkbox">
                          <Controller name="accept" control={control} rules={{ required: true }} render={({ field, fieldState }) => (
                              <Checkbox inputId={field.name} onChange={(e) => field.onChange(e.checked)} checked={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                          )} />
                          <label htmlFor="accept" className={classNames({ 'p-error': errors.accept })}>I agree to the terms and conditions*</label>
                      </div>

                      <Button type="submit" label="Submit" className="mt-2" />
                  </form>
              </Panel>
          </div>
      </div>
  );
}

export default Register;