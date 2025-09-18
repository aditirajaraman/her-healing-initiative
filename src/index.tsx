/* --------------react imports------------- */
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

/* --------------stylesheet imports------------- */
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* --------------license imports------------- */
import { registerLicense } from '@syncfusion/ej2-base';

/* --------------syncfusion theme imports------------- */
// Example of CSS imports
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-icons/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-react-buttons/styles/material.css";
import "@syncfusion/ej2-react-calendars/styles/material.css";
import "@syncfusion/ej2-react-dropdowns/styles/material.css";
import "@syncfusion/ej2-react-inputs/styles/material.css";
import "@syncfusion/ej2-react-navigations/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";
import "@syncfusion/ej2-react-richtexteditor/styles/material.css";

import App from './App';

// Registering Syncfusion license key
registerLicense('Ngo9BigBOggjHTQxAR8/V1JFaF5cXGRCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWXZfd3ZUQ2lfVk13WENWYEg=');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals