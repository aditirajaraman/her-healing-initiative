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
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';

/*********************************3: Imports / primereact ********************************/
const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

/*********************************3: Imports / primereact ********************************/
const Login : React.FC = () => {
  const navigate = useNavigate();
  const defaultValues = {
      username: '',
      password: ''
  }
  const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
  useEffect(() => {
    console.log("-------------------On Form Load-------------------");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getFormErrorMessage = (name) => {
      return errors[name] && <small className="p-error">{errors[name].message}</small>
  };
  const [error, setError] = useState('');
  const onSubmit = (formData) => {
    axios({
        // Endpoint to send files
        url: config.API_URL + "/api/users/validateUser",
        method: "POST",
        data: formData
    })
    .then((res) => {
        console.log("----------OnSubmit Response---------");
        //console.log(process.env.NODE_ENV);
        if (Boolean(res.data.success))
          navigate('/'); 
        else
        {
          console.log("-----not authenticated------");
          setError('Invalid username or password.');
        }  
    })
    .catch((err) => {
        console.log("----------OnSubmit Error---------");
        console.log(err);
        setError('Invalid username or password.');
    });
  };
  return (
    <div className="flex border-round justify-content-center">
      <Panel header="Login In" style={{marginTop:'20px', width:'30%'}} >
         <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
           <div className="field">
                <span className="p-float-label" style={{marginTop:'20px'}}>
                    <Controller name="username" control={control} rules={{ required: 'User Name is required.' }} render={({ field, fieldState }) => (
                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                    )} />
                    <label htmlFor="lastname" className={classNames({ 'p-error': errors.username })}>User Name*</label>
                </span>
                {getFormErrorMessage('username')}
            </div>
            <div className="field">
              <span className="p-float-label" style={{marginTop:'20px'}}>
                  <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                      <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })}/>
                  )} />
                  <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
              </span>
              {getFormErrorMessage('password')}
            </div>
            <br/>
            <div className="grid">
              <div className="col-3"></div>
              <div className="col-3">
                <Button type="reset" label="Cancel" className="p-button-secondary" />
              </div>
              <div className="col-3">
                <Button type="submit" label="Submit" className="p-button-success" />
              </div>
              <div className="col-3"></div>
            </div>
            <div className="field">
              <Button
                  label="Forgot username or password?"
                  link
                  onClick={() => navigate('/forgotusernameorpassword')}
              />
            </div>
            <div className="field">
               <Button
                  label="If you dont have an account. Please register !"
                  link
                  onClick={() => navigate('/register')}/>
            </div>
            {error && (
              <div style={{ color: 'red', border: '1px solid red', padding: '10px', borderRadius: '4px' }}>
                {error}
              </div>
            )}
         </form>
      </Panel>
    </div>
  );
};

export default Login;