import React, { useState } from 'react';
import './EditInterview.css';
import axios from 'axios';

const InterviewInfoForm = ({ handleCloseInterviewInfoForm }) => {
  const [formData, setFormData] = useState({
    platform: '',
    date: '',
    time: '',
    theme:'',
    softwareRequirement: '',
    joiningLink: '',
    duration:0,
    image: null, // For storing the selected image file
    students:''
  });

  // const handleChange = (e) => {
  //   if (e.target.name === 'image') {
  //     // If the target is the image input, set the file to state
  //     setFormData({ ...formData, image: e.target.files[0] });
  //   } else {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const addInterview = async () => {
    try {
        
        const url = 'http://localhost:8001/addInterview';
  
        // const data = {
        //   "subject": formData.subject,
        //   "message": formData.message,
        //   "time": formattedTime,
        //   "date": formattedDate
        // };
        

  
        console.group("sending data is",formData)
        const response = await axios.post(url, formData);
        console.log("received data is", response);
        window.location.reload();
  
    } catch (error) {
        console.log("got the error while fetching the data", error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    addInterview();
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
            <label htmlFor="students" className="interview-edit-label">Registration Number</label>
            <input type="text" id="students" name="students" value={formData.students} onChange={handleChange} className="interview-edit-input" />
          </div>
          <div className="interview-edit-form-group">
            <label htmlFor="theme" className="interview-edit-label">Theme</label>
            <input type="text" id="theme" name="theme" value={formData.theme} onChange={handleChange} className="interview-edit-input" />
          </div>
          <div className="interview-edit-form-group">
            <label htmlFor="duration" className="interview-edit-label">Duration</label>
            <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} className="interview-edit-input" />
          </div>
          <div className="interview-edit-form-group">
            <label htmlFor="joiningLink" className="interview-edit-label">Link</label>
            <input type="text" id="joiningLink" name="joiningLink" value={formData.joiningLink} onChange={handleChange} className="interview-edit-input" />
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
