import {React, useState} from 'react'
import JobCards from '../../components/JobCards/JobCards'
import { FaUser } from 'react-icons/fa';

import './Job.css'


const Job = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleJobCardClick = () => {
    setIsDialogOpen(true);
  };


  var job_component=[];
  for(var i=0;i<100;i++){
    job_component.push(<div className="job-card-container"><JobCards key={i}/></div>)
  }


  var history=[];
  for(var i=0;i<94;i++){
    history.push(
      <div className="history_detail">
        <div className="history_head">
          {/* <FaUser className="icon" style={{ marginRight: '10px' }} /> */}
          <span className="inline"><b>Company Name 1</b></span>
        </div>
        <div className='history_info'>
          <div className='history_date'>
            02-09-2024 | 10:00
          </div>
          <div className='history_status'>
            Applied
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className='job'>
      <div className="job-left">
        <div className="job-filter">
        </div>
        <div className="job-cards">
          {job_component.map((job, index) => (
            <div className="job-card-container" key={index} onClick={handleJobCardClick}>
              {job}
            </div>
          ))}
        </div>
      </div>
      <div className="job-right">
        <div className="summary">
          <div className="summary_detail">
            <div className="summary_head">
              <FaUser className="icon" style={{ marginRight: '10px' }} />
              <span className="inline"><b>No. of job</b></span>
            </div>
            <div className='summary_count'>
              342
            </div>
          </div>
          <div className="summary_detail">
            <div className="summary_head">
              <FaUser className="icon" style={{ marginRight: '10px' }} />
              <span className="inline"><b>Placed</b></span>
            </div>
            <div className='summary_count  placed_detail'>
              0
            </div>
          </div>
          <div className="summary_detail">
            <div className="summary_head">
              <FaUser className="icon" style={{ marginRight: '10px' }} />
              <span className="inline"><b>Waiting</b></span>
            </div>
            <div className='summary_count  waiting_detail'>
              0
            </div>
          </div>
          <div className="summary_detail">
            <div className="summary_head">
                <FaUser className="icon" style={{ marginRight: '10px' }} />
                <span className="inline"><b>Rejected</b></span>
              </div>
              <div className='summary_count  waiting_detail'>
                0
              </div>
          </div>
        </div>
        <h3>History</h3>


        <div className="history">

          
          {history}

        </div>
      </div>

      {isDialogOpen && (
        <div className="dialog">
          <div className="dialog-content">
            <h2>Mail Subject</h2>
            <p>This is the content of the mail.</p>
          </div>
          <button className="close-button" onClick={() => setIsDialogOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Job;