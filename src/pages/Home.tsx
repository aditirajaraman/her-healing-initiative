import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const water =  require("../assets/images/HHI.png");
const africakids =  require("../assets/images/hackathon.jpg");
const ruralkids =  require("../assets/images/hackathon.jpg");


const Home = () => {
  const navigate = useNavigate();
  const handleDonateEvent = () => {
      navigate('/donate'); 
  };
  return (
    <Container fluid>
    <Row>
      <Col>
        <div className="p-5 mb-4 rounded-3" style={{ color:'white',  background: 'linear-gradient(135deg, rgba(158, 0, 255, 1.0), rgba(158, 160, 173, 1.0))' }}>
          <h1 className="display-4">Welcome to HerHealing Initiative!</h1>
          <p className="lead">Female Health Education / Fundraising for Women / Non-Profit</p>
          <hr className="my-4"/>
          <p><h5>We are HerHealing Initiative, a nonprofit organization dedicated to helping underpriviliged women gain access to sanitary products and educate others on female health.</h5></p>
          <Container>
            <Row>
              <Col><Button variant="info">GET INVOLVED</Button></Col>
              <Col><Button variant="info" onClick={handleDonateEvent}>DONATE</Button></Col>
            </Row>
          </Container>
        </div>
      </Col>
    </Row>
    <Row>
      <Col>
      </Col>
      <Col>
      <div className="container-fluid">
        <Carousel data-bs-theme="dark">
        <Carousel.Item>
            <img
              className="d-block"
              src={ruralkids}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h5 style={{color:'white', fontStyle:'bold'}}>HerHealing Hacks 2025</h5>
              <p style={{color:'white', fontStyle:'bold'}}>Huge thank you to Aditi Rajaraman for organizing this hackathon! Congratulations to Bhuvan T. for placing first!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block"
              src={water}
              alt="First slide"
            />
            <Carousel.Caption>
              <h5 style={{color:'white', fontStyle:'bold'}}>HERHEALING INITIATIVE</h5>
              <p style={{color:'white', fontStyle:'bold'}}>Hello, we are HerHealing Initiative, a nonprofit organization dedicated to helping underpriviliged women gain access to sanitary products and educate others on female health.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        </div>
      </Col>
      <Col>
        <br/>
        <br/>
        <Card border="warning" style={{ textAlign:'left'}}>
          <Card.Header><b>Our Partners</b></Card.Header>
          <Card.Body>
            <Card.Text>
              <ul>
                <li>University student</li>
                <li>STEMpower Her</li>
                <li>Issues to Insights</li>
                <li>Psych Talks For All</li>
                <li>The healing horizon</li>
                <li>HerFuture Initiative</li>
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  );
};

export default Home;