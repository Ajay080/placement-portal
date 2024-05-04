import React, { useState } from 'react';
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
    category: null,
    years: [],
    branch: '',
    type: [],
    status: 'Upcoming', // Initial status
    imgPath: null, // For storing the selected image file
  });

  const YearOptions = [
    { value: 2024, label: '2024' },
    { value: 2023, label: '2023' },
    { value: 2022, label: '2022' },
    { value: 2021, label: '2021' },
    { value: 2020, label: '2020' }
  ];

  const TypeOptions = [
    { value: 1, label: 'Full-time' },
    { value: 2, label: 'Part-time' },
    { value: 3, label: 'Internship' },
    { value: 4, label: 'Contract' }
    // Add more options as needed
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleYearChange = (selectedYears) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      years: selectedYears.map(year => year.value)
    }));
  };

  const handleTypeChange = (selectedTypes) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      type: selectedTypes.map(type => type.value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      const responseData = await response.json();
      console.log('Form data submitted successfully:', responseData);
    } catch (error) {
      console.error('Error submitting form data:', error.message);
    }
    handleCloseJobInfoForm();
  };

  return (
    <>
      <div className="job-edit-backdrop" onClick={handleCloseJobInfoForm}></div>
      <div className="job-edit-form-container">
        <form className="job-edit-form" onSubmit={handleSubmit}>
          <div className="job-edit-form-group">
            <label htmlFor="companyCode" className="job-edit-label">Company Code</label>
            <input type="text" id="companyCode" name="companyCode" value={formData.companyCode} onChange={handleChange} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="companyName" className="job-edit-label">Company Name</label>
            <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="city" className="job-edit-label">City</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="job-edit-input" />
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
            <label htmlFor="startDate" className="job-edit-label">Starting Date</label>
            <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="applyDeadlineDate" className="job-edit-label">Apply Deadline Date</label>
            <input type="date" id="applyDeadlineDate" name="applyDeadlineDate" value={formData.applyDeadlineDate} onChange={handleChange} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="applyDeadlineTime" className="job-edit-label">Apply Deadline Time</label>
            <input type="time" id="applyDeadlineTime" name="applyDeadlineTime" value={formData.applyDeadlineTime} onChange={handleChange} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="category" className="job-edit-label">Category</label>
            <input type="number" id="category" name="category" value={formData.category} onChange={handleChange} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label className="job-edit-label">Status</label>
            <div>
              <label>
                <input type="radio" name="status" value="Upcoming" checked={formData.status === 'Upcoming'} onChange={handleChange} />
                Upcoming
              </label>
              <label>
                <input type="radio" name="status" value="Passed" checked={formData.status === 'Passed'} onChange={handleChange} />
                Passed
              </label>
            </div>
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="years" className="job-edit-label">Years</label>
            <Select
              multi
              name="years"
              id="years"
              options={YearOptions}
              onChange={handleYearChange}
              values={YearOptions.filter(year => formData.years.includes(year.value))}
            />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="branch" className="job-edit-label">Branch</label>
            <input type="text" id="branch" name="branch" value={formData.branch} onChange={handleChange} className="job-edit-input" />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="type" className="job-edit-label">Type</label>
            <Select
              
              name="type"
              id="type"
              options={TypeOptions}
              onChange={handleTypeChange}
              values={formData.type.map(type => ({ value: type, label: type }))}
            />
          </div>
          <div className="job-edit-form-group">
            <label htmlFor="imgPath" className="job-edit-label">Upload Image</label>
            <input type="file" id="imgPath" name="imgPath" onChange={handleChange} className="job-edit-input" accept="image/*" />
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
