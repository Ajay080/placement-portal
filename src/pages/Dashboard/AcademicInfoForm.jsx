import React, { useState, useEffect } from 'react';
import './AcademicInfoForm.css';
import { BsStar, BsStarFill } from 'react-icons/bs';

const AcademicInfoForm = ({ handleCloseAcademicInfoForm }) => {
  const [alertOpen, setAlertOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    email: '',
    phone: '',
    gender:'',
    DoB:'',
    tag:'',
  });

  useEffect(() => {
    if (alertOpen) {
      document.body.classList.add('academic-edit-form-open');
    } else {
      document.body.classList.remove('academic-edit-form-open');
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
    handleCloseAcademicInfoForm(); // Call handleCloseAcademicInfoForm from props
  };

  return (
    <>
    {alertOpen && <div className="academic-edit-backdrop" onClick={handleCloseAlert}></div>}

    <div className="academic-edit-form-container">
      <form className="academic-edit-form" onSubmit={handleSubmit}>
        <div className="academic-edit-form-group">
          <label htmlFor="name" className="academic-edit-label">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="academic-edit-input" />
        </div>
        <div className="academic-edit-form-group">
          <label htmlFor="regNo" className="academic-edit-label">Registration Number</label>
          <input type="text" id="regNo" name="regNo" value={formData.regNo} onChange={handleChange} className="academic-edit-input" />
        </div>
        <div className="academic-edit-form-group">
          <label htmlFor="email" className="academic-edit-label">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="academic-edit-input" />
        </div>
        <div className="academic-edit-form-group">
          <label htmlFor="phone" className="academic-edit-label">Phone Number</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="academic-edit-input" />
        </div>
        <div className="academic-edit-form-group">
          <label htmlFor="gender" className="academic-edit-label">Gender</label>
          <input type="text" id="gender" name="gender" value={formData.gender} onChange={handleChange} className="academic-edit-input" />
        </div>
        <div className="academic-edit-form-group">
          <label htmlFor="DoB" className="academic-edit-label">Date of Birth</label>
          <input type="date" id="DoB" name="DoB" value={formData.DoB} onChange={handleChange} className="academic-edit-input" />
        </div>
        <div className="academic-edit-form-group">
          <label htmlFor="tag" className="academic-edit-label">Tag</label>
          <input type="text" id="tag" name="tag" value={formData.tag} onChange={handleChange} className="academic-edit-input" />
        </div>
        <div className="academic-edit-form-buttons">
          <button type="submit" className="academic-edit-submit">Submit</button>
          <button type="button" onClick={handleCloseAcademicInfoForm} className="academic-edit-cancel">Cancel</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default AcademicInfoForm;
