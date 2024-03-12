import React, { useState } from 'react';
import './EditDrop.css';

const DropInfoForm = ({ handleCloseDropInfoForm }) => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    handleCloseDropInfoForm();
  };

  return (
    <>
      <div className="drop-edit-backdrop" onClick={handleCloseDropInfoForm}></div>
      <div className="drop-edit-form-container">
        <form className="drop-edit-form" onSubmit={handleSubmit}>
          <div className="drop-edit-form-group">
            <label htmlFor="subject" className="drop-edit-label">Subject</label>
            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="drop-edit-input" />
          </div>
          <div className="drop-edit-form-group">
            <label htmlFor="message" className="drop-edit-label">Message</label>
            <textarea id="message" style={{width:"100%"}} name="message" value={formData.message} onChange={handleChange} className="drop-edit-textarea"></textarea>
          </div>
          <div className="drop-edit-form-buttons">
            <button type="submit" className="drop-edit-submit">Submit</button>
            <button type="button" onClick={handleCloseDropInfoForm} className="drop-edit-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DropInfoForm;
