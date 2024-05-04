import React, { useState } from 'react';
import './EditDrop.css';
import axios from 'axios';
import Select from 'react-dropdown-select';

const DropInfoForm = ({ handleCloseDropInfoForm }) => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    years: [],
    branch: [],
    type: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'years' || name === 'type' ? value.split(',').map(Number) : value
    }));
  };
  const handleTypeChange = (selectedTypes) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      type: selectedTypes.map(type => type.value)
    }));
  };
  const handleBranchChange = (selectedBranch) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      branch: selectedBranch.map(type => type.value)
    }));
  };
  const handleYearChange = (selectedBranch) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      years: selectedBranch.map(type => type.value)
    }));
  };

  
const addDrops = async () => {
  try {
      
      const url = 'http://localhost:8001/addDrop';
      console.log("form data is", formData.tag)
      const currentDate = new Date();

      // Format the current date as "dd-mm-yyyy"
      const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

      // Format the current time as "hh:mm"
      const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

      const data = {
        "subject": formData.subject,
        "message": formData.message,
        "time": formattedTime,
        "date": formattedDate
      };
      
      // Conditionally include years, type, and branch if they are not empty
      if (formData.years.length!=0) {
        data.years = formData.years;
      }
      
      if (formData.type.length!=0) {
        data.type = formData.type;
      }
      
      if (formData.branch.length!=0) {
        data.branch = formData.branch;
      }

      console.group("sending data is",data)
      const response = await axios.post(url, data);
      console.log("received data is", response);
      window.location.reload();

  } catch (error) {
      console.log("got the error while fetching the data", error);
  }
};


  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data is", formData)
    addDrops();
    // Add your form submission logic here
    handleCloseDropInfoForm();
  };

  const TypeOptions = [
    { value: 1, label: 'Full-time' },
    { value: 2, label: 'Part-time' },
    { value: 3, label: 'Internship' },
    { value: 4, label: 'Contract' }
    // Add more options as needed
  ];

  const BranchOptions = [
    { value: 'BAI', label: 'BAI' },
    { value: 'BCE', label: 'BCE' },
    { value: 'BCG', label: 'BCG' },
    { value: 'BCY', label: 'BCY' }
    // Add more options as needed
  ];

  const yearOptions = [
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' }
    // Add more options as needed
  ];
  
  

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
          <div className="drop-edit-form-group">
            <label htmlFor="years" className="drop-edit-label">Years</label>
            <Select
            name="years"
            id="years"
            multi
            options={yearOptions}
            onChange={handleYearChange}
            values={formData.years.map(type => ({ value: type, label: type }))}
          />
            {/* <input type="text" id="years" name="years" value={formData.years.join(',')} onChange={handleChange} className="drop-edit-input" /> */}
          </div>
          <div className="drop-edit-form-group">
            <label htmlFor="branch" className="drop-edit-label">Branch</label>
            <Select
            name="branch"
            id="branch"
            multi
            options={BranchOptions}
            onChange={handleBranchChange}
            values={formData.branch.map(type => ({ value: type, label: type }))}
          />
            {/* <input type="text" id="branch" name="branch" value={formData.branch} onChange={handleChange} className="drop-edit-input" /> */}
          </div>
          <div className="drop-edit-form-group">
            <label htmlFor="type" className="drop-edit-label">Type</label>
            <Select
            name="type"
            id="type"
            multi
            options={TypeOptions}
            onChange={handleTypeChange}
            values={formData.type.map(type => ({ value: type, label: type }))}
          />
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
