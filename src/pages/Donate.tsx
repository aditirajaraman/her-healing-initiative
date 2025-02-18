import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

const Donate = () => {
  return (
    <div>
      <h1>About Donation</h1>
      <div className="p-fluid grid formgrid">
          <div className="field col-12 md:col-12">We’re on a mission to end the global water crisis and committed to demonstrating God's love by restoring hope and health to under-served populations through trusted, sustainable safe water solutions and health & hygiene education.</div>
          <div className="field col-3 md:col-3"></div> 
          <div className="field col-3 md:col-3"> <Button label="One-Time" className="p-button-raised" /></div> 
          <div className="field col-3 md:col-3"><Button label="Recurring"  className="p-button-rounded p-button-secondary" /></div> 
          <div className="field col-3 md:col-3"></div> 
      </div>
    </div>

  );
};

export default Donate;