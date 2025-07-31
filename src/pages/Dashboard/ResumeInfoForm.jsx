import React, { useState, useEffect } from 'react';
import './ResumeInfoForm.css';
import { BsStar, BsStarFill } from 'react-icons/bs';

const ResumeInfoForm = ({ handleCloseResumeInfoForm }) => {
  const [alertOpen, setAlertOpen] = useState(true);
  const [formData, setFormData] = useState({
    resume:''
  });

  useEffect(() => {
    if (alertOpen) {
      document.body.classList.add('resume-edit-form-open');
    } else {
      document.body.classList.remove('resume-edit-form-open');
    }
  }, [alertOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    handleCloseResumeInfoForm(); // Close the form after submission
  };
  
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file type is PDF
      if (file.type === 'application/pdf') {
        // Proceed with handling the file
        // For example, you can read the file content using FileReader API
        const reader = new FileReader();
        reader.onload = (event) => {
          // event.target.result contains the file content as a data URL
          const fileContent = event.target.result;
          // You can do further processing with the file content here
          console.log('File content:', fileContent);
        };
        reader.readAsDataURL(file);
      } else {
        // Display an error message or handle the case where the selected file is not a PDF
        console.log('Please select a PDF file.');
      }
    }
  };
  

  return (
    <>
    {alertOpen && <div className="resume-edit-backdrop" onClick={handleCloseAlert}></div>}

    <div className="resume-edit-form-container">
      <form className="resume-edit-form" onSubmit={handleSubmit}>
      <div className="resume-edit-form-group">
        <label htmlFor="resume" className="resume-edit-label">Resume (PDF only)</label>
        <input 
            type="file" 
            id="resume" 
            name="resume" 
            accept=".pdf" 
            onChange={handleFileChange} 
            className="resume-edit-input" 
        />
        </div>
        <div className="resume-edit-form-buttons">
          <button type="submit" className="resume-edit-submit">Submit</button>
          <button type="button" onClick={handleCloseResumeInfoForm} className="resume-edit-cancel">Cancel</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default ResumeInfoForm;
