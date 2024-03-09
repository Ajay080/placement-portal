import React, { useState } from 'react';
import "./CalendarCard.css"; // Import CSS file for styling
import backgroundbg  from "../../Img/django.jpeg"
const Card = () => {
  return (
    <div className="calendarCard-card">
      <div className="calendarCard-image-container">
        {/* Placeholder for image */}
        <img src={backgroundbg}/>
      </div>
      <div className="calendarCard-details">
        <div className="calendarCard-detail">
          <span className="calendarCard-label">Platform:</span>
          <span className="calendarCard-value">Google Meet</span>
        </div>
        <div className="calendarCard-detail">
          <span className="calendarCard-label">Date:</span>
          <span className="calendarCard-value">02-32-2004</span>
        </div>
        <div className="calendarCard-detail">
          <span className="calendarCard-label">Time:</span>
          <span className="calendarCard-value">22:44</span>
        </div>
        <div className="calendarCard-detail">
          <span className="calendarCard-label">Theme:</span>
          <span className="calendarCard-value">Django</span>
        </div>
        <div className="calendarCard-detail">
          <span className="calendarCard-label">Software Requirement:</span>
          <span className="calendarCard-value">None</span>
        </div>
      </div>
      <button className="calendarCard-join-button" onClick={() => window.open("https://www.google.com")}>
        Join
      </button>
    </div>
  );
};

const CalendarCard = () => {
  const [isArrowRotated, setIsArrowRotated] = useState(false);

  const handleScrollDown = () => {
    const scheduledBlock = document.querySelector('.calendarCard-scheduled-block');
    scheduledBlock.scrollLeft += 300; // Adjust scroll distance as needed
    setIsArrowRotated(!isArrowRotated); // Toggle arrow rotation
  };
  return (
    <div className="calendarCard-calendar-container">
      <h1 className="calendarCard-heading">Scheduled</h1>
      <div className="calendarCard-scheduled-block">
        <div className="calendarCard-scheduled-mock-interval">
          {[...Array(5)].map((_, index) => (
            <Card key={index} />
          ))}
        </div>
      </div>
      <div className="calendarCard-rightArrow" id="scrollDown" onClick={handleScrollDown}>
      <div className={`scroll-indicator ${isArrowRotated ? 'rotate' : ''}`} onClick={handleScrollDown}>
        <span className={`dot ${isArrowRotated ? 'rotate' : ''}`}></span>
        <span className={`dot ${isArrowRotated ? 'rotate' : ''}`}></span>
        <span className={`dot ${isArrowRotated ? 'rotate' : ''}`}></span>
        <div className={`arrow-container ${isArrowRotated ? 'clicked' : ''}`}>
          <span className="arrow">&#9654;</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CalendarCard;
