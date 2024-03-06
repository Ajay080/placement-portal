import React from 'react';
import './About.css'; // Import the CSS file for styling
import background from '../../Img/profile-icon.jpg'
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';

const About = () => {
  return (
    <div>
      <div className="about-container top">
        <div className="about-text">
          <h2>About Our Website</h2>
          <p>The career development and placement portal is a robust online platform designed to effectively guide individuals through their career journeys. Its primary aim is to empower users by providing essential tools, knowledge, and growth opportunities. This portal serves as a bridge between job seekers and employers, offering centralized career information and connections.</p>
          <h3>Aim</h3>
          <p>The aim is to develop a centralized portal that streamlines communication, clarifies company eligibility, and simplifies mock interview scheduling to improve the overall placement experience for students and administrators.</p>
        </div>
        <div className="about-image">
          <img src={background} alt="Our Team" />
        </div>
      </div>

      <h1 className='scope-header'>Novelty and Scope</h1>

      <div className="about-container">

        <div className="about-left-grid">

          <h2>Mock Interview Scheduling</h2>
          <p>A streamlined process for the placement cell to schedule and manage mock interviews directly through the portal.</p>
        </div>
        <div className="about-right-grid">
          <h2>Spotlight Notifications </h2>
          <p>Customized alerts to students based on specified filters such as branches or preferences.</p>
        </div>
      </div>
      <div className="about-container">
        <div className="about-left-grid">
          <h2>Company Profiles Display</h2>
          <p>Company Profiles Display Clear visibility of eligible companies for students to reduce confusion and facilitate targeted applications</p>
        </div>
        <div className="about-right-grid">
          <h2>Role Based Filter/Sorting</h2>
          <p>Helping students to filter and sort companies based on their interest for better-targeted applications</p>
        </div>
      </div>
      <div className='image-corousel'>
        <h1>Team</h1>

        <ImageCarousel/>
      </div>
    </div>
  );
}

export default About;
