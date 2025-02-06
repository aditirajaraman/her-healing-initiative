import React from 'react';

import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import '../assets/css/prime-styles.css';

import { Card } from 'primereact/card';

const header = (
  <img alt="Card" src="../assets/imanges/"  />
);
const footer = (
  <span>
     <Button label="More Info" className="p-button-raised p-button-help" />
  </span>
);

const ListEvents = () => {
  return (
     <div className="grid">
      
      <div className="col-12">
        <Button style={{float: 'right'}}  label="Create Event" className="p-button-raised p-button-warning" />
      </div>
      
      {/* ---------------------------Upcoming Ecents--------------------- */}
      <Divider align="left">
          <div className="inline-flex align-items-center">
              <i className="pi pi-user mr-2" style={{color: 'green', 'fontSize': '2em'}}></i>
              <b>Upcoming Events</b>
          </div>
      </Divider>

      <div className="col-3">
          <Card title="JPS Hackathon" subTitle="The March Tech Summit" style={{ width: '25em', textAlign:'left'}} footer={footer}>
              <p className="m-0" style={{lineHeight: '1.5'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                  quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
          </Card>
      </div>
      <div className="col-3">
          <Card title="DYFS- Fundraiser!" subTitle="Celebrate Christams together !" style={{ width: '25em', textAlign:'left' }} footer={footer}>
              <p className="m-0" style={{lineHeight: '1.5'}}>DYFC funds programs serving young people up to age 24 and their families. We’re committed to advancing equity and healing trauma.We bring together and work alongside community-based organizations, government agencies, and schools.</p>
          </Card>
      </div>
      <div className="col-3">
          <Card title="The Live Experience" subTitle="François Capdeville  are the talent behind" style={{ width: '25em', textAlign:'left' }} footer={footer}>
              <p className="m-0" style={{lineHeight: '1.5'}}>BlogHer, one of SHE Media’s flagship sites, is a leading content and events platform with a mission to provide economic empowerment for all women. BlogHer has evolved from in-person to virtual events, with an on-demand video and content library to feed an increasing demand for 24/7.</p>
          </Card>
      </div>
      <div className="col-3">
          <Card title="Fenergy" subTitle="Educate and Inspire" style={{ width: '25em', textAlign:'left' }} footer={footer}>
              <p className="m-0" style={{lineHeight: '1.5'}}>Founders Maylin and Christina met through a leadership development program back in 2010. Through that experience, they shared childhood stories, along with adult struggles and personal dreams. The same life experiences would lead them on a journey of self-discovery, purpose, and service.</p>
          </Card>
      </div>
      
      {/* ---------------------------Past Ecents--------------------- */}
      <Divider align="left">
          <div className="inline-flex align-items-center">
              <i className="pi pi-user mr-2" style={{color: 'brown', 'fontSize': '2em'}}></i>
              <b>Past Events</b>
          </div>
      </Divider>

      <div className="col-3">
          <Card title="Writing and Mindfulness" subTitle="Cultivating Self-Compassion" style={{ width: '25em', textAlign:'left'}} footer={footer}>
              <p className="m-0" style={{lineHeight: '1.5'}}>This workshop will be a combination of writing exercises, meditation, mindfulness practices, somatics, discussion, lecture, etc. all centered around the theme of cultivating self-compassion. This a weekly workshop and each week we'll focus on a different topic.</p>
          </Card>
      </div>
      <div className="col-3">
          <Card title="Community Day: Lunar New Year" subTitle="Lunar New Year celebration!" style={{ width: '25em', textAlign:'left' }} footer={footer}>
              <p className="m-0" style={{lineHeight: '1.5'}}>Let’s celebrate the Year of the Snake! Join us for this family-friendly celebration, where the spirit of Lunar New Year comes alive through art, tradition, and community. Travel to Asia with us to experience dance performances, acrobatics, crafts, food, and more!</p>
          </Card>
      </div>
      <div className="col-3">
          <Card title="Paws and Poses at Fearvana Yoga!" subTitle="ARe you ready to get down(ward dog) with the pups of OSCAR!" style={{ width: '25em', textAlign:'left' }} footer={footer}>
              <p className="m-0" style={{lineHeight: '1.5'}}>Join paws with us for a unique and heartwarming yoga class at Fearvana Yoga in Kenilworth, NJ. Doggy Noses & Yoga Poses combines the joy of yoga with the cuddles of adorable rescue puppies and dogs from OSCAR.</p>
          </Card>
      </div>
      <div className="col-3">
          <Card title="LATIN JAZZ @ GALERIA" subTitle="with dynamic Javier Madrazo Quartet" style={{ width: '25em', textAlign:'left' }} footer={footer}>
              <p className="m-0" style={{lineHeight: '1.5'}}>Direct from Buenos Aires, Argentina and beyond, the Javier Madrazo Quartet features a dynamic fusion of diverse Latin rhythms and jazz improvisation, transporting the audience through a vibrant range of styles. From the smooth, sophisticated melodies of Bossa Nova to the infectious energy of Mambo,</p>
          </Card>
      </div>

    </div>
  );
};

export default ListEvents;