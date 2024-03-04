import React from 'react';
import './Drop.css';
import Capsule from '../../components/Capsule/Capsule';
import Background from '../../Img/background-bg.jpg'
import Alert from '../../components/Capsule/Alert';

const Drop = () => {
  return (
    <div className='Drop'>
      {/* Image Section */}
      <div className="drop-background">
            <img src={Background}></img>
      </div>


      {/* Regular and Starred Drops Section */}
      <div className='drop-detail'>

        {/* Regular Drops Section */}
        <div className='regular-drops-section'>
        <div className='section-heading'>
          <div className="drop-section-head">Today Drops</div>
        </div>
          <div className='capsule-container'>
              <div className='date-header'>March 2, 2024</div>
              <div className='date-container'>
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
              </div>
           </div>
           <div className='capsule-container'>
              <div className='date-header'>March 2, 2024</div>
              <div className='date-container'>
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
              </div>   
            </div>   
            <div className='capsule-container'>
              <div className='date-header'>March 2, 2024</div>
              <div className='date-container'>
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                       
              </div>   
            </div>    
        </div>

        <div className='starred-drops-section'>
          <div className='section-heading'>Starred Drops</div>
          <div className='capsule-container'>
            <div className='date-header'>March 1, 2024</div>
            <div className='date-container'>
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
            </div>
          </div>
          <div className='capsule-container'>
            <div className='date-header'>March 1, 2024</div>
            <div className='date-container'>
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
                <Capsule time="9:00 AM" subject="Meeting" message="Discuss project updates" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drop;
