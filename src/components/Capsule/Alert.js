import React, { useState } from 'react';
import './Alert.css'; // Import your CSS file for styling

const Alert = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const openAlert = () => {
    setIsOpen(true);
  };

  const closeAlert = () => {
    setIsOpen(false);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <>
      {isOpen && (
        <div className="alert-overlay" style={{ zIndex: 999 }}>
          <div className="alert-box">
            <div className="subject-input">
              <input
                type="text"
                value={subject}
                onChange={handleSubjectChange}
                placeholder="Subject"
              />
            </div>
            <div className="message-input">
              <textarea
                value={message}
                onChange={handleMessageChange}
                placeholder="Message"
              />
            </div>
            <div className="button-container">
              <button onClick={closeAlert}>Cancel</button>
              <button>Send</button>
            </div>
          </div>
        </div>
      )}
      <button onClick={openAlert}>Open Alert</button>
    </>
  );
};

export default Alert;
