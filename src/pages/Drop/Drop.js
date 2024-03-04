import React from 'react';
import './Drop.css';
import Capsule from '../../components/Capsule/Capsule';

const Drop = () => {
  return (
    <div className='Drop'>
      {/* Image Section */}
      <div className="drop-background">
            <img src=""></img>
        </div>

      {/* Regular and Starred Drops Section */}
      <div className='drop-detail'>
        {/* Regular Drops Section */}
        <div className='regular-drops-section'>
          <div className='section-heading'>Regular Drops</div>
          <div className='date-container'>
            <div className='date-header'>March 1, 2024</div>
            <div className='capsule'></div>
            <div className='capsule'></div>
            <div className='capsule'></div>
            <Capsule/>
          </div>
          <div className='date-container'>
            <div className='date-header'>March 2, 2024</div>
            <div className='capsule'></div>
            <div className='capsule'></div>
            <div className='capsule'></div>
            <div className='capsule'></div>
          </div>
        </div>

        {/* Starred Drops Section */}
        <div className='starred-drops-section'>
          <div className='section-heading'>Starred Drops</div>
          <div className='date-container'>
            <div className='date-header'>March 1, 2024</div>
            <div className='capsule'></div>
          </div>
          <div className='date-container'>
            <div className='date-header'>March 2, 2024</div>
            <div className='capsule'></div>
            <div className='capsule'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drop;
