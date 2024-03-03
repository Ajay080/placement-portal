import React from "react";
import "./CalendarCard.css"; // Import CSS file for styling
import backgroundbg  from "../../Img/background-bg.jpg"
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
      <div class="calendarCard-rightArrow">
      <div class="scroll-indicator">
        <span class="dot"></span><span class="dot"></span><span class="dot"></span>
        <div class="arrow-container">
          <span class="arrow">&#9654;</span>
      </div>
  </div>
</div>

    </div>
  );
};

export default CalendarCard;
