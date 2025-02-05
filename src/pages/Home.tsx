import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const water =  require("../assets/images/water.jpg");
const africakids =  require("../assets/images/africakids.jpg");
const ruralkids =  require("../assets/images/ruralkids.jpg");

const Home = () => {
  return (
    <Container fluid>
    <Row>
      <Col>
        <div className="p-5 mb-4 rounded-3" style={{ color:'white',  background: 'linear-gradient(135deg, rgba(158, 0, 255, 1.0), rgba(158, 160, 173, 1.0))' }}>
          <h1 className="display-4">Welcome to HerHealing Initiative</h1>
          <p className="lead">Female Health Education / Fundraising for Women / Non-Profit</p>
          <hr className="my-4"/>
          <p><h5>We are a young women led non-profit organization committed to reshaping the narrative surrounding the value of girls through redefining societal norms that perpetuate the cycle of poverty, and fostering financial resilience among adolescent girls and young women in Tanzania through the fusion of economic empowerment and technology integration.</h5></p>
          <Container>
            <Row>
              <Col><Button variant="primary">VOLUNTEER</Button></Col>
              <Col><Button variant="info">DONATE</Button></Col>
              <Col><Button variant="success">PARTNER</Button></Col>
              <Col><Button variant="warning">HIRE US</Button></Col>
            </Row>
          </Container>
        </div>
      </Col>
    </Row>
    <Row>
      <Col>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://t4.ftcdn.net/jpg/02/19/97/89/360_F_219978944_Q0f2jy0m9RwbIMNqIgEVRGJXdS2DwfbD.jpg" />
        <Card.Body>
          <Card.Text>
            <ul>
              <li>To promote financial resilience and digital inclusion amongst girls and young women</li>
              <li>Disrupt barriers to allow women and girls of color to thrive</li>
              <li>Foster intergenerational healing through workshops and digital storytelling</li>
              <li>We envision an inclusive society where adolescent girls and young women have the power to choose and create opportunities for themselves and others</li>
              <li>Item</li>
              <li>Item</li>
              <li>Item</li>
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
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
              <h5 style={{color:'white', fontStyle:'bold'}}>Clean Water, Health & Hygiene Curriculum</h5>
              <p style={{color:'white', fontStyle:'bold'}}>In developing countries, the water they drink is often unsafe, containing bacteria and parasites that cause constant illness. The lack of safe water has locked many women into a cycle of poverty. It’s a serious issue of injustice - one that Healing Waters is working to solve through The Her Initiative</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block"
              src={water}
              alt="First slide"
            />
            <Carousel.Caption>
              <h5 style={{color:'white', fontStyle:'bold'}}>HER TUTOR</h5>
              <p style={{color:'white', fontStyle:'bold'}}><b>HER TUTOR</b> is the first hybrid e-learning platform to enable access to skills, opportunities in AI & Machine Learning for young women to democratize Coding.  It addresses the challenge of young women’s unemployment by providing an alternative learning curriculum that encourages self-employment using digital technologies to generate jobs and achieve financial freedom. To date, we have reached more than 5000 young women.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        </div>
      </Col>
      <Col>
        <Card border="info">
          <Card.Header><b>Our Impact</b></Card.Header>
          <Card.Body>
            <Card.Text>
              <ul>
                <li>We envision an inclusive society where adolescent girls and young women have the power to choose and create opportunities for themselves and others</li>
                <li>A second item</li>
                <li>A third item</li>
                <li>A fourth item</li>
                <li>And a fifth one</li>
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
        <br/>
        <br/>
        <Card border="warning">
          <Card.Header><b>Our Partners</b></Card.Header>
          <Card.Body>
            <Card.Text>
              <ul>
                <li>African Girls Can Code Initiative (AGCCI)</li>
                <li>Girls Who Code, JPS</li>
                <li>A third item</li>
                <li>A fourth item</li>
                <li>And a fifth one</li>
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