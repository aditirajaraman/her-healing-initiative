import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

import dotenv from 'dotenv';
import path from 'path';

import '../assets/css/cardstyles.css';

const config = require('../config/config_' + process.env.NODE_ENV?.trim() + '.json');

const Team = () => {
  const footer1 = (
    <div>
      <p><b>Suvarnita Gajarao</b></p>
      <p style={{ fontFamily:'Brush Script MT, cursive', fontSize:'25px'}}>Co-Founder</p>
    </div>
  );
  const footer2 = (
    <div>
      <p>Aditi Rajaraman</p>
      <p style={{ fontFamily:'Brush Script MT, cursive', fontSize:'25px'}}>Director</p>
    </div>
  );
  const footer3 = (
    <div>
      <p>Hasini Yedlapalli</p>
      <p style={{ fontFamily:'Brush Script MT, cursive', fontSize:'25px'}}>Brand Manager</p>
    </div>
  );
  const footer4 = (
    <div>
      <p>Eva Raval</p>
      <p style={{ fontFamily:'Brush Script MT, cursive', fontSize:'25px'}}>Web Developer</p>
    </div>
  );
  return (
    <div className="grid">
      <div className="col-12">
        <img src="https://blog.her-healing-initiative.org/ourteambannerpurple.png" style={{width: '100%'}}></img>
      </div>
      <div className="col-12">
        <h6 style={{ fontFamily:'Brush Script MT, cursive', fontSize:'35px', color: 'grey' }}>Meet our staff, businesses for Her, and our lead influencers — the amazing women !</h6>
      </div>
      <div className="col-12">
        <h1 className="display-5">OUR TEAM</h1>
        <hr style={{ border: '1px solid purple', width: '7%' }}></hr>
      </div>
      <div className="col-2">
        <Card className="w-20rem no-border-card" style={{ width: '20em', padding:'0px', border:'0px' }} footer={footer1}>
          <img src="https://healingwaters.org/wp-content/uploads/2023/10/Kathya-Reyes.jpg.webp" style={{width: '100%', height:'300px'}}></img>
        </Card>
      </div>
      <div className="col-2">
        <Card className="w-25rem no-border-card" style={{ width: '20em', padding:'0px', border:'0px' }} footer={footer2}>
          <img src="https://healingwaters.org/wp-content/uploads/2023/04/Heidi-Headshot.jpg" style={{width: '100%', height:'300px'}}></img>
        </Card>
      </div>
      <div className="col-2">
          <Card className="w-20rem no-border-card" style={{ width: '20em', padding:'0px', border:'0px' }} footer={footer3}>
          <img src="https://i0.wp.com/momsoftweensandteens.com/wp-content/uploads/2022/10/Dear-Teen-Girl-You-are-Beautiful-Brave-and-Strong.png?w=1200&ssl=1" style={{width: '100%', height:'300px'}}></img>
        </Card>
      </div>
      <div className="col-2">
          <Card className="w-20rem no-border-card" style={{ width: '20em', padding:'0px', border:'0px' }} footer={footer4}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL7G0f7azjJHKJzLk-bMlgt3FW7y4nrDp-hQ&s" style={{width: '100%', height:'300px'}}></img>
        </Card>
      </div>
      <div className="col-2">
          <Card className="w-20rem no-border-card" style={{ width: '20em', padding:'0px', border:'0px' }} footer={footer4}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL7G0f7azjJHKJzLk-bMlgt3FW7y4nrDp-hQ&s" style={{width: '100%', height:'300px'}}></img>
        </Card>
      </div>
      <div className="col-2">
          <Card className="w-20rem no-border-card" style={{ width: '20em', padding:'0px', border:'0px' }} footer={footer4}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL7G0f7azjJHKJzLk-bMlgt3FW7y4nrDp-hQ&s" style={{width: '100%', height:'300px'}}></img>
        </Card>
      </div>
      <div className="col-12" style={{ backgroundColor: 'whitesmoke', paddingTop:'20px', marginTop:'40px'}}>
        <div className="card" style={{ backgroundColor: 'whitesmoke', border:'0px'}}>
            <h2>WHAT YOU CAN DO FOR HER !</h2><h2/>
            <br></br>
            <div className="flex">
              <p className="partyforher-image-after">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <Divider layout="vertical" />
              <p className="giftforher-image-after">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                    voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>
              <Divider layout="vertical" />
              <p className="socialforher-image-after">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
              cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                    Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
            </div>
        </div>
      </div>
      <div className="col-12">&nbsp;</div>
      <div className="col-12">
        <h1 className="display-5">TESTIMONIALS</h1>
        <hr style={{ border: '1px solid green', width: '9%' }}></hr>
      </div>
      <div className="col-12">
        <p>
          “...It truly is such a joy to share the business’ profits each month with an organization on such a life-changing mission. Bringing clean, safe water to people in need around the world, how significant and essential! How often, every single day, all day, we take for granted the gift that clean water is. For these woman and children to have easy access to water that does not cause disease or further the cycle of poverty is truly life-saving. By the grace of God we have been gifted our business, and by grace we give back to others. We feel so proud and excited to have Wayfaren’s profits be even a small part of The Her Initiative’s transformative work.”
        </p>
        <p>- ALBERTO DUAN</p>
       <i className="pi pi-star" style={{ fontSize: '2rem', padding:'5px' }}></i>
       <i className="pi pi-star" style={{ fontSize: '2rem', padding:'5px' }}></i>
       <i className="pi pi-star" style={{ fontSize: '2rem', padding:'5px' }}></i>
      </div>
      <div className="col-12">
        <p>
          “...It truly is such a joy to share the business’ profits each month with an organization on such a life-changing mission. Bringing clean, safe water to people in need around the world, how significant and essential! How often, every single day, all day, we take for granted the gift that clean water is. For these woman and children to have easy access to water that does not cause disease or further the cycle of poverty is truly life-saving. By the grace of God we have been gifted our business, and by grace we give back to others. We feel so proud and excited to have Wayfaren’s profits be even a small part of The Her Initiative’s transformative work.”
        </p>
        <p>- ALBERTO DUAN</p>
      </div>
    </div>
  );
};

export default Team;