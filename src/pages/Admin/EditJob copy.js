import React, { useState, useEffect } from 'react';
import Select from 'react-dropdown-select';
import './EditJob.css';

const JobInfoForm = ({ handleCloseJobInfoForm }) => {
  const [formData, setFormData] = useState({
    companyCode:'',
    companyName: '',
    city: '',
    duration: '',
    ctc: '',
    startDate:'',
    applyDeadlineDate:'',
    applyDeadlineTime:'',
    category:null,
    years:[],
    branch:[],
    type:[],
    status: 'Upcoming', // Initial status
    imgPath: null, // For storing the selected image file
  });

  const options = [
    {
      value: 1,
      label: '2024'
    },
    {
      value: 2,
      label: '2023'
    },
    {
      value: 3,
      label: '2022'
    },
    {
      value: 4,
      label: '2021'
    }
  ];

  // useEffect(() => {
  //   const currentYear = new Date().getFullYear();
  //   const years = [];
  //   for (let year = currentYear; year >= currentYear - 5; year--) {
  //     years.push({ value: year, label: "fsd" });
  //   }
  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     years: years
  //   }));
  // }, []);

  const handleYearChange = (selectedYears) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      years: selectedYears.map(year => year.value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    sendFormDataToAPI(formData);
    handleCloseJobInfoForm();
  };

  const sendFormDataToAPI = async (formData) => {
    try {
      const response = await fetch('http://localhost:8001/addJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }

      // Optionally, you can handle the response here
      const responseData = await response.json();
      console.log('Form data submitted successfully:', responseData);
    } catch (error) {
      console.error('Error submitting form data:', error.message);
      // Optionally, you can handle the error here (e.g., show an error message to the user)
    }
  };

  return (
    <>
      <div className="job-edit-backdrop" onClick={handleCloseJobInfoForm}></div>
      <div className="job-edit-form-container">
        <form className="job-edit-form" onSubmit={handleSubmit}>
          <div className="job-edit-form-group">
            <label htmlFor="companyCode" className="job-edit-label">Company Code</label>
            <input type="text" id="companyCode" name="companyCode" value={formData.companyCode} onChange={(value) => {this.value}} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="companyName" className="job-edit-label">Company Name</label>
            <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={() => {}} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="city" className="job-edit-label">City</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={() => {}} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="duration" className="job-edit-label">Duration</label>
            <input type="text" id="duration" name="duration" value={formData.duration} onChange={() => {}} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="ctc" className="job-edit-label">CTC/Package</label>
            <input type="text" id="ctc" name="ctc" value={formData.ctc} onChange={() => {}} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="startDate" className="job-edit-label">Starting Date</label>
            <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={() => {}} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="applyDeadlineDate" className="job-edit-label">Apply Deadline Date</label>
            <input type="date" id="applyDeadlineDate" name="applyDeadlineDate" value={formData.applyDeadlineDate} onChange={() => {}} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="applyDeadlineTime" className="job-edit-label">Apply Deadline Time</label>
            <input type="time" id="applyDeadlineTime" name="applyDeadlineTime" value={formData.applyDeadlineTime} onChange={() => {}} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="category" className="job-edit-label">Category</label>
            <input type="number" id="category" name="category" value={formData.category} onChange={() => {}} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label className="job-edit-label">Status</label>
            <div>
              <label>
                <input type="radio" name="status" value="Upcoming" checked={formData.status === 'Upcoming'} onChange={() => {}} />
                Upcoming
              </label>
              <label>
                <input type="radio" name="status" value="Passed" checked={formData.status === 'Passed'} onChange={() => {}} />
                Passed
              </label>
            </div>
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="branch" className="job-edit-label">Branch</label>
            <input type="text" id="branch" name="branch" value={formData.branch} onChange={() => {}} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="type" className="job-edit-label">Type</label>
            <input type="number" id="type" name="type" value={formData.type} onChange={() => {}} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="imgPath" className="job-edit-label">Upload Image</label>
            <input type="file" id="imgPath" name="imgPath" onChange={() => {}} className="job-edit-input" accept="image/*" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="years" className="job-edit-label">Years</label>
            <Select
              multi
              options={options}
              onChange={handleYearChange}
              values={formData.years.filter(year => formData.years.includes(year.value))}
            />
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
