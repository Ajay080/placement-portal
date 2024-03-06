import React, { useState, useEffect } from 'react';
import './AdditionalInfoForm.css';
import { BsStar, BsStarFill } from 'react-icons/bs';

const AdditionalInfoForm = ({ handleCloseAdditionalInfoForm }) => {
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
      document.body.classList.add('additional-edit-form-open');
    } else {
      document.body.classList.remove('additional-edit-form-open');
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
    handleCloseAdditionalInfoForm(); // Call handleCloseAdditionalInfoForm from props
  };

  return (
    <>
    {alertOpen && <div className="additional-edit-backdrop" onClick={handleCloseAlert}></div>}

    <div className="additional-edit-form-container">
      <form className="additional-edit-form" onSubmit={handleSubmit}>
        <div className="additional-edit-form-group">
          <label htmlFor="name" className="additional-edit-label">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="additional-edit-input" />
        </div>
        <div className="additional-edit-form-group">
          <label htmlFor="regNo" className="additional-edit-label">Registration Number</label>
          <input type="text" id="regNo" name="regNo" value={formData.regNo} onChange={handleChange} className="additional-edit-input" />
        </div>
        <div className="additional-edit-form-group">
          <label htmlFor="email" className="additional-edit-label">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="additional-edit-input" />
        </div>
        <div className="additional-edit-form-group">
          <label htmlFor="phone" className="additional-edit-label">Phone Number</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="additional-edit-input" />
        </div>
        <div className="additional-edit-form-group">
          <label htmlFor="gender" className="additional-edit-label">Gender</label>
          <input type="text" id="gender" name="gender" value={formData.gender} onChange={handleChange} className="additional-edit-input" />
        </div>
        <div className="additional-edit-form-group">
          <label htmlFor="DoB" className="additional-edit-label">Date of Birth</label>
          <input type="date" id="DoB" name="DoB" value={formData.DoB} onChange={handleChange} className="additional-edit-input" />
        </div>
        <div className="additional-edit-form-group">
          <label htmlFor="tag" className="additional-edit-label">Tag</label>
          <input type="text" id="tag" name="tag" value={formData.tag} onChange={handleChange} className="additional-edit-input" />
        </div>
        <div className="additional-edit-form-buttons">
          <button type="submit" className="additional-edit-submit">Submit</button>
          <button type="button" onClick={handleCloseAdditionalInfoForm} className="additional-edit-cancel">Cancel</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default AdditionalInfoForm;
