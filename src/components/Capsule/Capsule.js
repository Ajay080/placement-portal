import React, { useState } from 'react';
import './Capsule.css';
import { BsStar, BsStarFill } from 'react-icons/bs';
const Capsule = ({ time, subject, message }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [starred, setStarred] = useState(false);

  const handleClick = () => {
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const toggleStarred = () => {
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
              <div className='subject-heading'>{subject}</div>
              <div className='subject-message'>{message}</div>
            </div>
            <div className='subject-starred' onClick={toggleStarred}>
              {starred ? <BsStarFill /> : <BsStar />}
              <span className="tooltip">Starred the message</span>
            </div>
          </div>
          <div className="message">"message is here"</div>
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
