import React, { useState, useEffect } from 'react';
import './PersonalInfoForm.css';
import { BsStar, BsStarFill } from 'react-icons/bs';

const PersonalInfoForm = ({ handleClosePersonalInfoForm }) => {
  const [alertOpen, setAlertOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    email: '',
    phone: '',
    gender:'',
    DoB:'',
    tag:''
  });

  useEffect(() => {
    if (alertOpen) {
      document.body.classList.add('personal-edit-form-open');
    } else {
      document.body.classList.remove('personal-edit-form-open');
    }
  }, [alertOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    handleCloseAlert();
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
    handleClosePersonalInfoForm(); // Call handleClosePersonalInfoForm from props
  };

  return (
    <>
    {alertOpen && <div className="personal-edit-backdrop" onClick={handleCloseAlert}></div>}

    <div className="personal-edit-form-container">
      <form className="personal-edit-form" onSubmit={handleSubmit}>
        <div className="personal-edit-form-group">
          <label htmlFor="name" className="personal-edit-label">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="personal-edit-input" />
        </div>
        <div className="personal-edit-form-group">
          <label htmlFor="regNo" className="personal-edit-label">Registration Number</label>
          <input type="text" id="regNo" name="regNo" value={formData.regNo} onChange={handleChange} className="personal-edit-input" />
        </div>
        <div className="personal-edit-form-group">
          <label htmlFor="email" className="personal-edit-label">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="personal-edit-input" />
        </div>
        <div className="personal-edit-form-group">
          <label htmlFor="phone" className="personal-edit-label">Phone Number</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="personal-edit-input" />
        </div>
        <div className="personal-edit-form-group">
          <label htmlFor="gender" className="personal-edit-label">Gender</label>
          <input type="text" id="gender" name="gender" value={formData.gender} onChange={handleChange} className="personal-edit-input" />
        </div>
        <div className="personal-edit-form-group">
          <label htmlFor="DoB" className="personal-edit-label">Date of Birth</label>
          <input type="text" id="DoB" name="DoB" value={formData.DoB} onChange={handleChange} className="personal-edit-input" />
        </div>
        <div className="personal-edit-form-group">
          <label htmlFor="tag" className="personal-edit-label">Tag</label>
          <input type="text" id="tag" name="tag" value={formData.tag} onChange={handleChange} className="personal-edit-input" />
        </div>
        <div className="personal-edit-form-buttons">
          <button type="submit" className="personal-edit-submit">Submit</button>
          <button type="button" onClick={handleClosePersonalInfoForm} className="personal-edit-cancel">Cancel</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default PersonalInfoForm;
