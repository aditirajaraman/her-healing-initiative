import React from 'react';
import { Link } from 'react-router-dom';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Events = () => {
  return (
    <ListGroup variant="flush">
    <ListGroup.Item><h2>Upcoming Events</h2></ListGroup.Item>
    <ListGroup.Item><h2>Current Events</h2></ListGroup.Item>
    <ListGroup.Item><h2>Past Events</h2></ListGroup.Item>
  </ListGroup>
  );
};

export default Events;