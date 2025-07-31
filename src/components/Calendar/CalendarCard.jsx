import React, { useState, useEffect } from 'react';
import "./CalendarCard.css"; // Import CSS file for styling
import backgroundbg from "../../Img/upcoming.jpg";
import axios from 'axios';
import { buildApiUrl } from '../../utils/config';


const addHttp = (url) => {
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`;
  }
  return url;
};


const Card = ({ platform, date, time, theme,duration, joiningLink, softwareRequirement  }) => {
  return (
    <div className="calendarCard-card">
      <div className="calendarCard-image-container">
        {/* Placeholder for image */}
        <img src={backgroundbg} alt="Background"/>
      </div>
      <div className="calendarCard-details">
        <div className="calendarCard-detail">
          <span className="calendarCard-label">Platform:</span>
          <span className="calendarCard-value">{platform}</span>
        </div>
        <div className="calendarCard-detail">
          <span className="calendarCard-label">Date:</span>
          <span className="calendarCard-value">{date}</span>
        </div>
        <div className="calendarCard-detail">
          <span className="calendarCard-label">Time:</span>
          <span className="calendarCard-value">{time}</span>
        </div>
        <div className="calendarCard-detail">
          <span className="calendarCard-label">Theme:</span>
          <span className="calendarCard-value">{theme}</span>
        </div>
        <div className="calendarCard-detail">
          <span className="calendarCard-label">Duration:</span>
          <span className="calendarCard-value">{duration} min</span>
        </div>
        <div className="calendarCard-detail">
          <span className="calendarCard-label">Software Requirement:</span>
          <span className="calendarCard-value">{softwareRequirement}</span>
        </div>
      </div>
      <button className="calendarCard-join-button" onClick={() => window.open(addHttp(joiningLink))}>
  Join
</button>

    </div>
  );
};

const CalendarCard = () => {
  const [calendarData, setcalendarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isArrowRotated, setIsArrowRotated] = useState(false);

  const getCalendarData = async () => {
    try {
      const storedData = localStorage.getItem('userData');
      if (!storedData) return;
      var parsedData = JSON.parse(storedData);
      console.log("stored json data is",parsedData); // Output: { name: 'John', age: 30 }
      var student_id=parsedData.newStudent._id;
        
      const response = await axios.get(buildApiUrl(`interviews/${student_id}`));
      const filteredData = response.data.filter(interview => {
        const interviewDateTime = new Date(`${interview.date}T${interview.time}`);
        return interviewDateTime.getTime() > getCurrentDateTime();
      });
      setcalendarData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching drop details:", error.message);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getCalendarData();
    }, 3000); // 3 seconds timeout
    return () => clearTimeout(timeout);
  }, []);

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    return currentDate.getTime(); // Returns the current date and time in milliseconds
  };

  const handleScrollDown = () => {
    const scheduledBlock = document.querySelector('.calendarCard-scheduled-block');
    scheduledBlock.scrollLeft += 300; // Adjust scroll distance as needed
    setIsArrowRotated(!isArrowRotated); // Toggle arrow rotation
  };
  return (
    <div className="calendarCard-calendar-container">
      <h1 className="calendarCard-heading">Scheduled</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="calendarCard-scheduled-block">
          <div className="calendarCard-scheduled-mock-interval">

            {calendarData.map((interview) => (
              <Card
                key={interview._id}
                platform={interview.platform}
                date={interview.date}
                time={interview.time}
                theme={interview.theme}
                duration={interview.duration}
                joiningLink={interview.joiningLink}
                softwareRequirement={interview.softwareRequirement}
              />
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
        </>
      )}
    </div>
  );
};

export default CalendarCard;