import React, { useState } from 'react';
import './EditInterview.css';

const InterviewInfoForm = ({ handleCloseInterviewInfoForm }) => {
  const [formData, setFormData] = useState({
    platform: '',
    date: '',
    time: '',
    softwareRequirement: '',
    link: '',
    image: null, // For storing the selected image file
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      // If the target is the image input, set the file to state
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    handleCloseInterviewInfoForm();
  };

  return (
    <>
      <div className="interview-edit-backdrop" onClick={handleCloseInterviewInfoForm}></div>
      <div className="interview-edit-form-container">
        <form className="interview-edit-form" onSubmit={handleSubmit}>
          <div className="interview-edit-form-group">
            <label htmlFor="platform" className="interview-edit-label">Platform</label>
            <input type="text" id="platform" name="platform" value={formData.platform} onChange={handleChange} className="interview-edit-input" />
          </div>
          <div className="interview-edit-form-group">
            <label htmlFor="date" className="interview-edit-label">Date</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="interview-edit-input" />
          </div>
          <div className="interview-edit-form-group">
            <label htmlFor="time" className="interview-edit-label">Time</label>
            <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} className="interview-edit-input" />
          </div>
          <div className="interview-edit-form-group">
            <label htmlFor="softwareRequirement" className="interview-edit-label">Software Requirement</label>
            <input type="text" id="softwareRequirement" name="softwareRequirement" value={formData.softwareRequirement} onChange={handleChange} className="interview-edit-input" />
          </div>
          <div className="interview-edit-form-group">
            <label htmlFor="link" className="interview-edit-label">Link</label>
            <input type="text" id="link" name="link" value={formData.link} onChange={handleChange} className="interview-edit-input" />
          </div>
          <div className="interview-edit-form-group">
            <label htmlFor="image" className="interview-edit-label">Upload Image</label>
            <input type="file" id="image" name="image" onChange={handleChange} className="interview-edit-input" accept="image/*" />
          </div>
          <div className="interview-edit-form-buttons">
            <button type="submit" className="interview-edit-submit">Submit</button>
            <button type="button" onClick={handleCloseInterviewInfoForm} className="interview-edit-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InterviewInfoForm;
