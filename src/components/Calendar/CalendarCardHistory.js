import React from "react";
import "./CalendarCardHistory.css"; // Import CSS file for styling
import backgroundbg  from "../../Img/background-bg.jpg"

const HistoryCard = () => {
  return (
    <div className="calendarCardHistory-card">
      <div className="calendarCardHistory-image-container">
        {/* Placeholder for image */}
        <img src={backgroundbg}/>
      </div>
      <div className="calendarCardHistory-details">
        <div className="calendarCardHistory-detail">
          <span className="calendarCardHistory-label">Platform:</span>
          <span className="calendarCardHistory-value">Google Meet</span>
        </div>
        <div className="calendarCardHistory-detail">
          <span className="calendarCardHistory-label">Date:</span>
          <span className="calendarCardHistory-value">02-32-2004</span>
        </div>
        <div className="calendarCardHistory-detail">
          <span className="calendarCardHistory-label">Time:</span>
          <span className="calendarCardHistory-value">22:44</span>
        </div>
        <div className="calendarCardHistory-detail">
          <span className="calendarCardHistory-label">Theme:</span>
          <span className="calendarCardHistory-value">Django</span>
        </div>
        <div className="calendarCardHistory-detail">
          <span className="calendarCardHistory-label">Software Requirement:</span>
          <span className="calendarCardHistory-value">None</span>
        </div>
      </div>
    </div>
  );
};

const CalendarCardHistory = () => {
  return (
    <div className="calendarCardHistory-container">
      <h1 className="calendarCardHistory-heading">History</h1>
      <div className="calendarCardHistory-history-block">
        <div className="calendarCardHistory-history-mock-interval">
          {[...Array(5)].map((_, index) => (
            <HistoryCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarCardHistory;
