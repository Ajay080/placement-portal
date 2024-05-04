import React from "react";
import "./CalendarCardHistory.css"; // Import CSS file for styling
import backgroundbg  from "../../Img/java.jpeg"
import axios from 'axios'
import { useState, useEffect } from "react";


const addHttp = (url) => {
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`;
  }
  return url;
};

const HistoryCard = ({ platform, date, time, theme,duration, joiningLink, softwareRequirement  }) => {
  return (
    <div className="calendarCardHistory-card">
      <div className="calendarCardHistory-image-container">
        {/* Placeholder for image */}
        <img src={backgroundbg}/>
      </div>
      <div className="calendarCardHistory-details">
        <div className="calendarCardHistory-detail">
          <span className="calendarCardHistory-label">Platform:</span>
          <span className="calendarCardHistory-value">{platform}</span>
        </div>
        <div className="calendarCardHistory-detail">
          <span className="calendarCardHistory-label">Date:</span>
          <span className="calendarCardHistory-value">{date}</span>
        </div>
        <div className="calendarCardHistory-detail">
          <span className="calendarCardHistory-label">Time:</span>
          <span className="calendarCardHistory-value">{time}</span>
        </div>
        <div className="calendarCardHistory-detail">
          <span className="calendarCardHistory-label">Theme:</span>
          <span className="calendarCardHistory-value">{theme}</span>
        </div>
        <div className="calendarCardHistory-detail">
          <span className="calendarCardHistory-label">Duration:</span>
          <span className="calendarCardHistory-value">{duration}</span>
        </div>
        <div className="calendarCardHistory-detail">
          <span className="calendarCardHistory-label">Software Requirement:</span>
          <span className="calendarCardHistory-value">{softwareRequirement}</span>
        </div>
      </div>
      <button className="calendarCard-join-button">
        Passed
      </button>
    </div>
  );
};

const CalendarCardHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchHistoryData = async () => {
    try {
      const response = await axios.get('http://localhost:8001/interviews/6608648c5c049561e85f5f1a');
      const filteredData = response.data.filter(interview => {
        const interviewDateTime = new Date(`${interview.date}T${interview.time}`);
        return interviewDateTime.getTime() > getCurrentDateTime();
      });
      setHistoryData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching drop details:", error.message);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchHistoryData();
    }, 3000); // 3 seconds timeout
    return () => clearTimeout(timeout);
  }, []);

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    return currentDate.getTime(); // Returns the current date and time in milliseconds
  };

  // Filter past interviews
  // const filteredData = historyData.filter((interview) => {
  //   const interviewDateTime = new Date(`${interview.date}T${interview.time}`);
  //   return interviewDateTime.getTime() < Date.now();
  // });

  return (
    <div className="calendarCardHistory-container">
      <h1 className="calendarCardHistory-heading">History</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
      <div className="calendarCardHistory-history-block">
        <div className="calendarCardHistory-history-mock-interval">
          {historyData.map((interview) => (
            <HistoryCard
              key={interview._id}
              platform={interview.platform}
              date={interview.date}
              time={interview.time}
              theme={interview.theme}
              duration={interview.duration}
              softwareRequirement={interview.softwareRequirement}
            />
          ))}
        </div>
      </div>
      )}
    </div>
  );
};

export default CalendarCardHistory;

// const CalendarCardHistory = () => {
//   return (
//     <div className="calendarCardHistory-container">
//       <h1 className="calendarCardHistory-heading">History</h1>
//       <div className="calendarCardHistory-history-block">
//         <div className="calendarCardHistory-history-mock-interval">
//           {[...Array(5)].map((_, index) => (
//             <HistoryCard key={index} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarCardHistory;
