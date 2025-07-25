import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { Card } from 'primereact/card';

const water =  require("../assets/images/HHI.png");
const africakids =  require("../assets/images/hackathon.jpg");
const ruralkids =  require("../assets/images/hackathon.jpg");

const Home = () => {
  const navigate = useNavigate();
  const handleDonateEvent = () => {
      navigate('/donate'); 
  };
  const leftStoryheader = (
      <img alt="Card" src="https://lirp.cdn-website.com/1976464f/dms3rep/multi/opt/joeys-Story-1920w.jpg"/>
  );
  const rightStoryheader = (
      <img alt="Card" src="https://lirp.cdn-website.com/1976464f/dms3rep/multi/opt/Marietta-Story-2-1920w.jpg"/>
  );
  return (
    <Container fluid>
    <Row>
      <Col>
        <div className="p-5 mb-4 rounded-3" style={{ color:'white',  background: 'linear-gradient(135deg, rgba(177, 156, 215, 1.0), rgba(206, 194, 235, 1.0))' }}>
          <h1 className="display-4" style={{ fontFamily:'Brush Script MT, cursive'}}>Welcome to HerHealing Initiative!</h1>
          <p className="lead">Female Health Education / Fundraising for Women / Non-Profit</p>
          <p><h5>We are HerHealing Initiative, a nonprofit organization dedicated to helping underpriviliged women gain access to sanitary products and educate others on female health.</h5></p>
          <Container>
            <Row className="justify-content-md-center">
              <Col lg={3}><Button variant="primary">ENGAGE</Button></Col>
              <Col lg={3}><Button variant="success" onClick={handleDonateEvent}>DONATE</Button></Col>
              <Col lg={3}><Button variant="info" onClick={handleDonateEvent}>SHARE</Button></Col>
            </Row>
          </Container>
        </div>
      </Col>
    </Row>
    <Row>
      <Col>
       <div className="p-5 mb-4 rounded-3">
          <h1 className="display-5">CLOTHED IN STRENGTH & DIGNITY</h1>
          <hr style={{ border: '1px solid green', width: '5%' }}></hr>
          <p className="lead" style={{ marginTop: '1.5em', marginBottom: '2.0em', textAlign: 'center' }}>We want women around the world to know that they have purpose and they are worthy of love just by being who they are. Often, however, in the developing world, women feel a lack of dignity, not just about feminine hygiene but because of the mistreatment they frequently face. We believe nothing should steal away a woman’s value or dignity.</p>
          <p className="lead" style={{ marginTop: '1.5em', marginBottom: '2.0em', textAlign: 'center'}}>“Clothed in Strength and Dignity” is Healing Water International’s Health and Hygiene Program that exists to educate and inspire women to care for themselves and their families, ultimately protecting them from water-related diseases. It also encourages them to build relationships in a safe space with other women in their community.</p>
          <img src='https://lirp.cdn-website.com/1976464f/dms3rep/multi/opt/customIcon_slashes2-100x100-15f7b11c-1920w.png'></img>
        </div>
      </Col>
     </Row>
     <Row>
      <Col>
       <div className="p-5 mb-4 rounded-3" style={{ backgroundColor: 'whitesmoke'}}>
          <h1 className="display-5">FACTS</h1>
          <hr style={{ border: '1px solid green', width: '5%' }}></hr>
           <div className="grid grid-nogutter">
              <div className="col-4">
                  <img src='https://lirp.cdn-website.com/1976464f/dms3rep/multi/opt/house-2-1920w.png'></img>
                  <h5 className="display-5">PERIOD POVERTY</h5>
                  <p className="lead" style={{ marginTop: '1.5em', marginBottom: '2.0em', textAlign: 'center' }}>500 million women and girls globally lack access to adequate facilities for menstrual hygiene management</p>
              </div>
              <div className="col-4">
                  <img src='https://lirp.cdn-website.com/1976464f/dms3rep/multi/opt/kids-3-1-1920w.png'></img>
                  <h5 className="display-5">GENDER EQUALITY</h5>
                  <p className="lead" style={{ marginTop: '1.5em', marginBottom: '2.0em', textAlign: 'center' }}> 1 in 10 girls in Sub-Saharan Africa miss school during their menstrual cycle. only 39% of schools worldwide provide menstrual health education</p>
              </div>
              <div className="col-4">
                  <img src='https://lirp.cdn-website.com/1976464f/dms3rep/multi/opt/house-2-1920w.png'></img>
                  <h5 className="display-5">INADEQUATE HYGEINE</h5>
                  <p className="lead" style={{ marginTop: '1.5em', marginBottom: '2.0em', textAlign: 'center' }}>he use of unhygienic materials for managing menstruation can lead to a range of infections, including urinary tract infections (UTIs) and bacterial vaginosis</p>
              </div>
               <div className="col-12">
                  <img src='https://lirp.cdn-website.com/1976464f/dms3rep/multi/opt/house-2-1920w.png'></img>
                  <h5 className="display-5">ACCESS TO SANITATION</h5>
                  <p className="lead" style={{ marginTop: '1.5em', marginBottom: '2.0em', textAlign: 'center' }}>Globally, 1.5 billion people lack access to a toilet with a handwashing facility with soap and water.</p>
              </div>
            </div>
        </div>
      </Col>
     </Row>
    <Row>
      <Col>
        <h1 className="display-5">WALK IN HER LIFE</h1>
        <hr style={{ border: '1px solid green', width: '5%' }}></hr>
      </Col>
    </Row>
    <Row className="justify-content-md-center">
        <Col xs lg="4">
            <Card title="Joeys Story" style={{ width: '30em' }} header={leftStoryheader}>
              <p className="lead" style={{ marginTop: '1.5em', marginBottom: '2.0em', textAlign: 'left'}}>
                “I struggled at first with balancing my water in one hand, so I stared at the ground intently, trying not to slip with every step. I quickly became frustrated again as the bucket I carried made the already strenuous trek even more difficult. 
                <br/>
                <br/>
                <b>I realized that her walking barefoot was something much bigger than just a lack of shoes</b>
                <br/>
                <br/>
                <a href="">Read the full story</a>
              </p>
            </Card>
        </Col>
        <Col xs lg="4">
            <Card title="Pastor Marritta's Story" style={{ width: '30em' }} header={rightStoryheader}>
               <p className="lead" style={{ marginTop: '1.5em', marginBottom: '2.0em', textAlign: 'left' }}>
                  “…She balances the now forty-pound bucket on her head and begins the steep descent back to her community, feet now covered in mud and brow drenched in sweat. When Pastor Marietta reaches the bottom of the mountain, she has no time to rest.
                <br/>
                <br/>
                <b>She must make this walk again five more times to provide enough water to last through the day for her three children and nine grandchildren.</b>
                <br/>
                <br/>
                <a href="">Read the full story</a>
              </p>
            </Card>
        </Col>
     </Row>
  </Container>
  );
};

export default Home;