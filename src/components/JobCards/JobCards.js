import React from 'react';
import { FaLocationArrow, FaClock, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';
import './JobCards.css';
import Dp from '../../Img/LogoCrop.png';
import IC from '../../Img/profile-icon.jpg';

const JobCards = () => {
  return (
    <div id="jobcard">
      <div className="jobcard-header">
        <div className="jobcard-img">
          <img src={Dp} alt="Company Logo"/>
        </div>
        <div className="jobcard-status">
          <button type="button">Upcoming</button>
        </div>
      </div>
      <div className="jobcard-company">
        <p>Company Name 1</p>
      </div>
      <div className="jobcard-timespan">
        <div className="jobcard-location">
          <FaLocationArrow />
          <p>Not Provided</p>
        </div>
        <div className="jobcard-time">
          <FaClock />
          <p>Full Time</p>
        </div>
      </div>
      <div className="jobcard-details">
        <div className="jobcard-ctc">
          <FaDollarSign />
          <p>Rs. 9.5 LPA CTC</p>
        </div>
        <div className="jobcard-deadline">
          <FaCalendarAlt />
          <p>5 Jan 24</p>
        </div>
      </div>
      <div className="jobcard-category">
        <p>Super Dream Offer</p>
      </div>
    </div>
  );
}

export default JobCards;
