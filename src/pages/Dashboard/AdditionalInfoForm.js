import React, { useState, useEffect } from 'react';
import './AdditionalInfoForm.css';
import { BsStar, BsStarFill } from 'react-icons/bs';
import axios from 'axios';
import Select from 'react-dropdown-select';


const AdditionalInfoForm = ({ handleCloseAdditionalInfoForm }) => {
  const [alertOpen, setAlertOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    email: '',
    phone: '',
    gender:'',
    DoB:'',
    tag:'',
    age: '',
    status: '',
    cgpa: '',
    tenthMarks: '',
    twelfthMarks: '',
    year: '',
    type: [],
    branch: '',
    placed:''
  });
  const [studentDetail, setStudentDetail] = useState(null);

  const getStudentDetails = async () => {
    try {
        const url = 'http://localhost:8001/students/6608648c5c049561e85f5f1a';
        const response = await axios.get(url);
        setStudentDetail(response.data);
        populateFormFields(response.data)
        // setLoading(false);
        console.log("received data is", response.data);
    } catch (error) {
        console.log("got the error while fetching the data", error);
    }
};

const updateStudentDetails = async () => {
  try {
      
      const url = 'http://localhost:8001/updateStudent/6608648c5c049561e85f5f1a';
      console.log("form data is", formData.tag)
      const data={  
        "name":`${formData.name}`,
        "registrationNumber":`${formData.regNo}`,
        "email":formData.email,
        "phoneNumber":`${formData.phone}`,
        "gender":`${formData.gender}`,
        "dob":`${formData.DoB}`,
        "tag":formData.tag,
        "year":formData.year,
        "type":formData.type,
        "tenthMarks":formData.tenthMarks,
        "twelfthMarks":formData.twelfthMarks,
        "year":formData.year,
        "branch":formData.branch,
        "cgpa":formData.cgpa,
        "age":formData.age,
      }
      const response = await axios.post(url, data);
      console.log("received data is", response);
      window.location.reload();

  } catch (error) {
      console.log("got the error while fetching the data", error);
  }
};

const handleTypeChange = (selectedTypes) => {
  setFormData(prevFormData => ({
    ...prevFormData,
    type: selectedTypes.map(type => type.value)
  }));
};

const populateFormFields = (data) => {
  setFormData(prevFormData => ({
    ...prevFormData,
    name: data.name,
    regNo: data.registrationNumber,
    age: data.age.toString(),
    email: data.email,
    phone: data.phoneNumber,
    DoB: new Date(data.dob).toISOString().split('T')[0],
    cgpa:data.cgpa,
    tenthMarks:data.tenthMarks,
    twelfthMarks:data.twelfthMarks,
    // "type": data.type.map(type => {
    //   // Map string values to their corresponding numeric values
    //   switch (type) {
    //     case 'Full-time':
    //       return 1;
    //     case 'Part-time':
    //       return 2;
    //     case 'Internship':
    //       return 3;
    //     case 'Contract':
    //       return 4;
    //     default:
    //       return null;
    //   }
    // }),    
    branch: data.branch,
    gender: data.gender,
    tag:data.tag,
    year:data.year,
    status: data.status,
    placed: data.placed,
  }));
};

const TypeOptions = [
  { value: 1, label: 'Full-time' },
  { value: 2, label: 'Part-time' },
  { value: 3, label: 'Internship' },
  { value: 4, label: 'Contract' }
  // Add more options as needed
];



  useEffect(() => {
    if (alertOpen) {
      getStudentDetails();
      document.body.classList.add('additional-edit-form-open');
    } else {
      document.body.classList.remove('additional-edit-form-open');
    }
  }, [alertOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStudentDetails();
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
        {/* Additional fields */}
        <div className="additional-edit-form-group">
          <label htmlFor="age" className="additional-edit-label">Age</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className="additional-edit-input" />
        </div>
        <div className="additional-edit-form-group">
          <label htmlFor="cgpa" className="additional-edit-label">CGPA</label>
          <input type="number" id="cgpa" name="cgpa" value={formData.cgpa} onChange={handleChange} className="additional-edit-input" />
        </div>
        <div className="additional-edit-form-group">
          <label htmlFor="tenthMarks" className="additional-edit-label">10th Marks</label>
          <input type="text" id="tenthMarks" name="tenthMarks" value={formData.tenthMarks} onChange={handleChange} className="additional-edit-input" />
        </div>
        <div className="additional-edit-form-group">
          <label htmlFor="twelfthMarks" className="additional-edit-label">12th Marks</label>
          <input type="text" id="twelfthMarks" name="twelfthMarks" value={formData.twelfthMarks} onChange={handleChange} className="additional-edit-input" />
        </div>
        <div className="additional-edit-form-group">
          <label htmlFor="branch" className="additional-edit-label">Branch</label>
          <input disabled type="text" id="branch" name="branch" value={formData.branch} onChange={handleChange} className="additional-edit-input" />
        </div>
        <div className="additional-edit-form-group">
          <label htmlFor="year" className="additional-edit-label">Year</label>
          <input type="text" id="year" name="year" value={formData.year} onChange={handleChange} className="additional-edit-input" />
        </div>
        <div className="additional-edit-form-group">
          <label htmlFor="type" className="additional-edit-label">Type</label>
          <Select
            name="type"
            id="type"
            multi
            options={TypeOptions}
            onChange={handleTypeChange}
            values={formData.type.map(type => ({ value: type, label: type }))}
          />
        </div>
        <div  className="additional-edit-form-group">
          <label htmlFor="placed" className="additional-edit-label">Placed</label>
          <input  type="checkbox" id="placed" name="placed" checked={formData.placed} onChange={handleChange} className="additional-edit-input" />
        </div>
        
        {/* Add more fields here */}
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
