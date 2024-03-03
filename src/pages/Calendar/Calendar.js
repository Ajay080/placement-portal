import React from "react"
import './Calendar.css'
import CalendarCard from "../../components/Calendar/CalendarCard";
import CalendarCardHistory from "../../components/Calendar/CalendarCardHistory";
const Calendar = (props) => {
  return (
    <div className="calendar">
      <div className="calendar-container">
        <CalendarCard/>
        <CalendarCardHistory/>
      </div>
      <div className="calendar-form">
        <h2>Schedule Mock Interview</h2>
        <div className="form-field">
          <label htmlFor="targetRole">Target Role:</label>
          <input type="text" id="targetRole" />
        </div>
        <div className="form-field">
          <label htmlFor="potentialDate">Potential Date:</label>
          <input type="date" id="potentialDate" />
        </div>
        <div className="form-field">
          <label htmlFor="potentialTime">Potential Time:</label>
          <input type="time" id="potentialTime" />
        </div>
        <div className="form-field">
          <label htmlFor="targetCompany">Target Company:</label>
          <input type="text" id="targetCompany" />
        </div>
        <button className="send-request-btn">Send Request</button>
      </div>
    </div>
  )
};

export default Calendar;
