import React from 'react';
import { FaLocationArrow, FaClock, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';
import './JobCards.css';
import Dp from '../../Img/LogoCrop.png';
import IC from '../../Img/profile-icon.jpg';
function formatDate(dateString) {
  // Split the date string into an array containing year, month, and day
  const parts = dateString.split('-');

  // Rearrange the parts to form the desired format
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

  return formattedDate;
}
const JobCards = ({ company, city, duration, ctc, startDate, status, imgPath, onClick }) => {

  return (
    <div id="jobcard" onClick={onClick}>
      <div className="jobcard-header">
        <div className="jobcard-img">
          <img src={imgPath} alt="Company Logo"/>
        </div>
        <div className="jobcard-status">
          <button type="button">{status}</button>
        </div>
      </div>
      <div className="jobcard-company">
        <p>{company}</p>
      </div>
      <div className="jobcard-timespan">
        <div className="jobcard-location">
          <FaLocationArrow />
          <p>{city}</p>
        </div>
        <div className="jobcard-time">
          <FaClock />
          <p>{duration}</p>
        </div>
      </div>
      <div className="jobcard-details">
        <div className="jobcard-ctc">
          <FaDollarSign />
          <p>{`Rs. ${ctc} LPA CTC`}</p>
        </div>
        <div className="jobcard-deadline">
          <FaCalendarAlt />
          <p>{formatDate(startDate)}</p>
        </div>
      </div>
      <div className="jobcard-category">
        {/* Assuming you want to display status as the category */}
        <p>{status}</p>
      </div>
    </div>
  );
}

export default JobCards;
