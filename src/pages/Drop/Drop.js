import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Drop.css';
import Capsule from '../../components/Capsule/Capsule';
import Background from '../../Img/Drop.jpg';

const Drop = () => {
  const [dropData, setDropData] = useState({});

  function reverseDateFormat(dateString) {
    // Split the date string by '-'
    const parts = dateString.split('-');
  
    // Rearrange the parts in reverse order
    const reversedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  
    return reversedDate;
  }
  

  useEffect(() => {
    const getDropDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8001/getDropByDate/66085f82e981bc3341d4f415');
        setDropData(response.data);
        console.log("response data is", response.data)
      } catch (error) {
        console.error("Error fetching drop details:", error.message);
      }
    };

    getDropDetails();
  }, []);

  return (
    <div className='Drop'>
      {/* Image Section */}
      <div className="drop-background">
        <img src={Background} alt="Drop Background" />
      </div>

      {/* Regular and Starred Drops Section */}
      <div className='drop-detail'>
        {/* Regular Drops Section */}
        <div className='regular-drops-section'>
          <div className='section-heading'>
            <div className="drop-section-head">Today Drops</div>
          </div>
          {Object.entries(dropData)
          .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA)) // Sort entries by date in descending order
          .map(([date, drops]) => (
            <div key={date} className='capsule-container'>
              <div className='date-header'>{reverseDateFormat(date)}</div>
              <div className='date-container'>
                {drops.map(drop => (
                  <Capsule
                    key={drop.id}
                    uniqueKey={drop.id}
                    time={drop.time}
                    subject={drop.subject}
                    message={drop.message}
                    starredFlag={drop.starred}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Starred Drops Section */}
        <div className='starred-drops-section'>
          <div className='section-heading'>Starred Drops</div>
          {Object.entries(dropData)
            .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA)) // Sort entries by date in descending order
            .map(([date, drops]) => (
              drops && drops.filter(drop => drop.starred).length !== 0 && (
                <div key={date} className='capsule-container'>
                  <div className='date-header'>{reverseDateFormat(date)}</div>
                  <div className='date-container'>
                    {drops.filter(drop => drop.starred).map(starredDrop => (
                      <Capsule
                        key={starredDrop.id}
                        uniqueKey={starredDrop.id}
                        time={starredDrop.time}
                        subject={starredDrop.subject}
                        message={starredDrop.message}
                        starredFlag={starredDrop.starred}
                      />
                    ))}
                  </div>
                </div>
              )
            ))}
        </div>
     </div>
    </div>
  );
};

export default Drop;
