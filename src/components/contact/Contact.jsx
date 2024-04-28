import React from 'react';
import {NavLink} from 'react-router-dom';
import './Contact.css';
import siva from '../../assets/siva.jpeg';
import charan from '../../assets/charan.jpg';
import Sidebar from '../navbar/Sidebar';

const Contact = () => {
  return (
    <>
    <Sidebar />
    <div className="container-fluid contact-container text-white">
      {/* Header */}
      <header className="text-center mb-5">
        <h1>Contact Us</h1>
        <p>Call us at: 7660869697</p>
        <a href="mailto:sivahere9484@gmail.com">sivahere9484@gmail.com</a>
      </header>

      {/* Image Divs */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="contact-image ms-auto justify-content-center align-items-center d-flex">
            <img src={siva} alt="Person 1" className="img-fluid w-50 ms-auto me-auto" />
            <div className="overlay">
              <div className="text display-5 mt-5">s1v4h3r3</div>
            </div>
          </div>
          <div className='text-center m-3'>
            <p className="lead">Siva is a passionate Web Hacker who loves to code secured websites.</p>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="contact-image ms-auto justify-content-center align-items-center d-flex">
            <img src={charan} alt="Person 2" className="img-fluid w-50 ms-auto me-auto" />
            <div className="overlay">
              <div className="text display-5 ">Tvnl Charan</div>
            </div>
          </div>
          <div className="m-5 text-center">
            <p className="bottom-text lead">I'm Tvnl Charan, a passionate Software Engineer and developer.</p>
          </div>
        </div>
      </div>

    </div>
    </>
  );
}

export default Contact;
