import React, { useState } from 'react';
import './Capsule.css';
import axios from 'axios';
import { BsStar, BsStarFill } from 'react-icons/bs';
const Capsule = ({ uniqueKey, time, subject, message, starredFlag }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [starred, setStarred] = useState(starredFlag);

  const handleClick = () => {
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const toggle = async (direction) => {
    try {
        
        const url = 'http://localhost:8001/addStarred/66085f82e981bc3341d4f415';

        const data = {
            "message_id": uniqueKey,
            "direction":direction
        };
        console.log("sending data is", data);

        const response = await axios.post(url, data);
        console.log("coming data is", response)
        window.location.reload();
  
    } catch (error) {
        console.log("got the error while fetching the data", error);
    }
  };
  

  const toggleStarred = () => {
    if(starred==true){
      toggle('up');
    }
    else{
      toggle('down');
    }
    setStarred(!starred);


  };

  return (
    <div>
      <div className='capsule' onClick={handleClick}>
        <div className='time'>{time}</div>
        <div className="partition-line"></div> 
        <div className='view'>View</div>
      </div>
      {alertOpen && (
        <div className="alert">
          <div className='alert-header'>
            <div className="subject">
              <div className='subject-heading'>Subject</div>
              <div className='subject-message'>{subject}</div>
            </div>
            <div className='subject-starred' onClick={toggleStarred}>
              {starred ? <BsStarFill /> : <BsStar />}
              <span className="tooltip">Starred the message</span>
            </div>
          </div>
          <div className="message">{message?message:"message is here"}</div>
          <div className="capsule-button-container">
            <button onClick={handleCloseAlert}>Close</button>
          </div>
        </div>
      )}
      {alertOpen && <div className="backdrop" onClick={handleCloseAlert}></div>}
    </div>
  );
};

export default Capsule;
