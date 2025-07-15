import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import dotenv from 'dotenv';
import path from 'path';

const environmentPath = __dirname + './config/' + '.env';

const About = () => {
  return (
    <div>
      <h1>About Page</h1>
      <h1>{environmentPath}</h1>
      <Button variant="primary">Primary</Button>
    </div>
  );
};

export default About;