import React, { useState } from 'react';
import './EditPlacementDetails.css';
import { BsAlignBottom } from 'react-icons/bs';

const PlacementInfoForm = ({ handleClosePlacementInfoForm }) => {
  const [textAreaValue, setTextAreaValue] = useState('');

  const handleChange = (e) => {
    setTextAreaValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    handleClosePlacementInfoForm();
  };

  return (
    <>
      <div className="placement-edit-backdrop"></div> {/* Backdrop */}
      <div className="placement-edit-form-container">
        <form className="placement-edit-form" onSubmit={handleSubmit}>
          <div className="placement-edit-form-group">
            {/* <label htmlFor="placementDetails" className="placement-edit-label">Placement Details</label> */}
            <textarea
              id="placementDetails"
              name="placementDetails"
              value={textAreaValue}
              onChange={handleChange}
              className="placement-edit-textarea"
            ></textarea>
          </div>
          <div className="placement-edit-form-buttons">
            <button type="submit" className="placement-edit-submit">Submit</button>
            <button type="button" onClick={handleClosePlacementInfoForm} className="placement-edit-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PlacementInfoForm;
