/*********************************1: Imports / react *************************************/
import React from 'react';
import { useLocation, useParams  } from 'react-router-dom';

import { ErrorState } from '../types/ErrorState';
interface LocationState {
  errorState: ErrorState;
}

/*********************************2: Imports / primereact ********************************/

const ErrorDisplay : React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const error = state?.errorState;
  return (
    <div>
      <h1>{error.name}</h1>
      <p><strong>ID:</strong> {error.id}</p>
      <p><strong>Description:</strong> {error.description}</p>
    </div>
  );
};

export default ErrorDisplay;