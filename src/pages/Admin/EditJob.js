import React, { useState } from 'react';
import './EditJob.css';

const JobInfoForm = ({ handleCloseJobInfoForm }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    location: '',
    duration: '',
    ctc: '',
    status: 'upcoming', // Initial status
    startDate: '',
    category: '',
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
    handleCloseJobInfoForm();
  };

  return (
    <>
      <div className="job-edit-backdrop" onClick={handleCloseJobInfoForm}></div>
      <div className="job-edit-form-container">
        <form className="job-edit-form" onSubmit={handleSubmit}>
          <div className="job-edit-form-group">
            <label htmlFor="companyName" className="job-edit-label">Company Name</label>
            <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="location" className="job-edit-label">Location</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="duration" className="job-edit-label">Duration</label>
            <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleChange} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="ctc" className="job-edit-label">CTC/Package</label>
            <input type="text" id="ctc" name="ctc" value={formData.ctc} onChange={handleChange} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label className="job-edit-label">Status</label>
            <div>
              <label>
                <input type="radio" name="status" value="upcoming" checked={formData.status === 'upcoming'} onChange={handleChange} />
                Upcoming
              </label>
              <label>
                <input type="radio" name="status" value="missed" checked={formData.status === 'missed'} onChange={handleChange} />
                Missed
              </label>
            </div>
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="startDate" className="job-edit-label">Starting Date</label>
            <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="category" className="job-edit-label">Category</label>
            <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="image" className="job-edit-label">Upload Image</label>
            <input type="file" id="image" name="image" onChange={handleChange} className="job-edit-input" accept="image/*" />
          </div>
          <div className="job-edit-form-buttons">
            <button type="submit" className="job-edit-submit">Submit</button>
            <button type="button" onClick={handleCloseJobInfoForm} className="job-edit-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default JobInfoForm;
