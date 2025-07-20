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
          <p><h5>We are HerHealing Initiative, a nonprofit organization dedicated to helping underpriviliged women gain access to sanitary products and educate others on female health.</h5></p>
          <Container>
            <Row>
              <Col><Button variant="info">ENGAGE</Button></Col>
              <Col><Button variant="info" onClick={handleDonateEvent}>DONATE</Button></Col>
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
       <div className="p-5 mb-4 rounded-3">
          <h1 className="display-5">WALK IN HER LIFE</h1>
          <hr style={{ border: '1px solid green', width: '5%' }}></hr>
          <p className="lead" style={{ marginTop: '1.5em', marginBottom: '2.0em', textAlign: 'center' }}>We want women around the world to know that they have purpose and they are worthy of love just by being who they are. Often, however, in the developing world, women feel a lack of dignity, not just about feminine hygiene but because of the mistreatment they frequently face. We believe nothing should steal away a woman’s value or dignity.</p>
          <p className="lead" style={{ marginTop: '1.5em', marginBottom: '2.0em', textAlign: 'center'}}>“Clothed in Strength and Dignity” is Healing Water International’s Health and Hygiene Program that exists to educate and inspire women to care for themselves and their families, ultimately protecting them from water-related diseases. It also encourages them to build relationships in a safe space with other women in their community.</p>
          <img src='https://lirp.cdn-website.com/1976464f/dms3rep/multi/opt/customIcon_slashes2-100x100-15f7b11c-1920w.png'></img>
        </div>
      </Col>
    </Row>
    <Row>
      <Col>
        <div className="p-1 mb-1 rounded-3" style={{ backgroundColor: 'whitesmoke'}}>
            <h1 className="display-5">FACTS</h1>
            <hr style={{ border: '1px solid green', width: '5%' }}></hr>
            <div className="grid grid-nogutter">
                <div className="col-6">
                    <img src='https://lirp.cdn-website.com/1976464f/dms3rep/multi/opt/joeys-Story-1920w.jpg' style={{ width: '50%'}}></img>
                </div>
                <div className="col-6">
                    <img src='https://lirp.cdn-website.com/1976464f/dms3rep/multi/opt/Marietta-Story-2-1920w.jpg' style={{ width: '50%'}}></img>
                </div>
                <div className="col-6">
                  <p className="lead" style={{ marginTop: '1.5em', marginBottom: '2.0em', textAlign: 'center'}}>500 million women and girls globally lack access to adequate facilities for menstrual hygiene management</p>
                </div>
                <div className="col-6">
                  <p className="lead" style={{ marginTop: '1.5em', marginBottom: '2.0em', textAlign: 'center' }}> 1 in 10 girls in Sub-Saharan Africa miss school during their menstrual cycle. only 39% of schools worldwide provide menstrual health education</p>
                </div>
              </div>
          </div>
      </Col>
     </Row>
  </Container>
  );
};

export default Home;