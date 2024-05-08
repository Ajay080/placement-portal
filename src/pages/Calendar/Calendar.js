import React, { useState } from "react";
import axios from "axios";
import './Calendar.css';
import CalendarCard from "../../components/Calendar/CalendarCard";
import CalendarCardHistory from "../../components/Calendar/CalendarCardHistory";

const Calendar = (props) => {
  const [formData, setFormData] = useState({
    targetRole: "",
    potentialDate: "",
    potentialTime: "",
    potentialDuration:"",
    targetCompany: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data=formData;
      const url = 'http://localhost:8001/addInterviewAsk';
      data.student_id='6608648c5c049561e85f5f1a';
      const currentDate= new Date();
      data.currentTime = currentDate.toTimeString().split(' ')[0]; // Extracting time from the date
      data.currentDate = currentDate.toDateString(); // Formatting current date
  

      const response = await axios.post(url, data);
      console.log("Form data sent successfully!", response.data);
      // Optionally, you can reset the form fields after successful submission
      setFormData({
        targetRole: "",
        potentialDate: "",
        potentialTime: "",
        potentialDuration:"",
        targetCompany: ""
      });
    } catch (error) {
      console.error("Error sending form data:", error);
    }
  };

  return (
    <div className="calendar">
      <div className="calendar-container">
        <CalendarCard />
        <CalendarCardHistory />
      </div>
      <div className="calendar-form">
        <h2>Schedule Mock Interview</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="targetRole">Target Role:</label>
            <input type="text" id="targetRole" value={formData.targetRole} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="potentialDate">Potential Date:</label>
            <input type="date" id="potentialDate" value={formData.potentialDate} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="potentialTime">Potential Time:</label>
            <input type="time" id="potentialTime" value={formData.potentialTime} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="potentialDuration">Potential Duration:</label>
            <input type="number" id="potentialDuration" value={formData.potentialDuration} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="targetCompany">Target Company:</label>
            <input type="text" id="targetCompany" value={formData.targetCompany} onChange={handleChange} />
          </div>
          <button type="submit" className="send-request-btn">Send Request</button>
        </form>
      </div>
    </div>
  );
};

export default Calendar;
