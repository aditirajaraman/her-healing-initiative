import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import { ErrorState } from '../types/ErrorState';

const errorStates: ErrorState[] = [
  { id: 1, name: 'Permission Denied - 403', description: '' },
  { id: 2, name: 'Server error - 500', description: '' },
  { id: 3, name: 'UnExpectedError', description: 'UnExpectedError.' },
  { id: 4, name: 'NetworkError', description: 'Network error. Please check your connection.' },
  { id: 5, name: 'UnhandlerdError', description: 'UnExpectedError.' },
];

const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

const axiosInstance: AxiosInstance = axios.create({
  baseURL: config.API_URL,
  withCredentials: true,
});

// Request and Response Interceptors are added here...
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const navigate = useNavigate();
    const redirectToLogin = () => {
        navigate('/login'); 
    };

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    
    // Check for the error response and status code
    if (error.response) {
        const { status } = error.response;
      
        switch (status) {
            case 401:
                //console.error('Session expired. Redirecting to login...');
                // Redirect the user to the login page or trigger a global logout function
                redirectToLogin();
                break;
            case 403:
            {
                //console.error('Permission denied. You do not have access to this resource.');
                // You might show a specific error message to the user
                let runtimeError = errorStates.find(e => e.id === 1);
                runtimeError.description = "Permission denied. You do not have access to this resource.";
                navigate('/errorDisplay', {
                    state: {error: runtimeError}
                });
                break;
            }
            case 500: 
            {
                let runtimeError = errorStates.find(e => e.id === 2);
                runtimeError.description = "Server error. Please try again later..";
                navigate('/errorDisplay', {
                    state: {error: runtimeError}
                });
                break;
            }
            default:
            {
                let runtimeError = errorStates.find(e => e.id === 3);
                runtimeError.description = `An unexpected error occurred with status: ${status}`;
                navigate('/errorDisplay', {
                    state: {error: runtimeError}
                });
                break;
            }
        }
    } else if (error.request) {
      // The request was made but no response was received (e.g., network error)
        let runtimeError = errorStates.find(e => e.id === 3);
        runtimeError.description = "Network error. Please check your connection.";
        navigate('/errorDisplay', {
            state: { error: errorStates.find(e => e.id === 4)}
        });
    } else {
        // Something happened in setting up the request that triggered an Error
         let runtimeError = errorStates.find(e => e.id === 5);
        runtimeError.description = `An unexpected error occurred with status: ${error.message}`;
        navigate('/errorDisplay', {
            state: {error: runtimeError}
        });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;