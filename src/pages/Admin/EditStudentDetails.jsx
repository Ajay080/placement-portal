import React, { useState } from 'react';
import './EditStudentDetails.css';

const StudentInfoForm = ({ handleCloseStudentInfoForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    email: '',
    phone: '',
    gender: '',
    DoB: '',
    status: 'Approved', // Initial status
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    handleCloseStudentInfoForm();
  };

  return (
    <>
      <div className="student-edit-backdrop" onClick={handleCloseStudentInfoForm}></div>
      <div className="student-edit-form-container">
        <form className="student-edit-form" onSubmit={handleSubmit}>
          <div className="student-edit-form-group">
            <label htmlFor="name" className="student-edit-label">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="student-edit-input" />
          </div>
          <div className="student-edit-form-group">
            <label htmlFor="regNo" className="student-edit-label">Registration Number</label>
            <input type="text" id="regNo" name="regNo" value={formData.regNo} onChange={handleChange} className="student-edit-input" />
          </div>
          <div className="student-edit-form-group">
            <label htmlFor="email" className="student-edit-label">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="student-edit-input" />
          </div>
          <div className="student-edit-form-group">
            <label htmlFor="phone" className="student-edit-label">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="student-edit-input" />
          </div>
          <div className="student-edit-form-group">
            <label htmlFor="gender" className="student-edit-label">Gender</label>
            <input type="text" id="gender" name="gender" value={formData.gender} onChange={handleChange} className="student-edit-input" />
          </div>
          <div className="student-edit-form-group">
            <label htmlFor="DoB" className="student-edit-label">Date of Birth</label>
            <input type="date" id="DoB" name="DoB" value={formData.DoB} onChange={handleChange} className="student-edit-input" />
          </div>
          <div className="student-edit-form-group">
            <label className="student-edit-label" style={{ marginBottom: "1.1rem" }}>Status</label>
            <div>
              <label>
                <input type="radio" name="status" value="Approved" checked={formData.status === 'Approved'} onChange={handleChange} />
                Approved
              </label>
              <label>
                <input type="radio" name="status" value="Rejected" checked={formData.status === 'Rejected'} onChange={handleChange} />
                Rejected
              </label>
            </div>
          </div>
          <div className="student-edit-form-buttons">
            <button type="submit" className="student-edit-submit">Submit</button>
            <button type="button" onClick={handleCloseStudentInfoForm} className="student-edit-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default StudentInfoForm;
