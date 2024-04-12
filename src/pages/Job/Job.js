import {React, useEffect, useState} from 'react'
import JobCards from '../../components/JobCards/JobCards'
import { FaUser } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';
import { FaDollarSign } from 'react-icons/fa';
import { FaHourglassHalf } from 'react-icons/fa';
import profileIconBase from '../../Img/profile-icon.jpg';
import axios from 'axios'

import './Job.css'

const JobType=['FullTime, Internship', 'Intern + FullTime']
const CategoryType=['Dream Internship', 'Restricted Dream Internship', 'Regular Offer']


function formatDate(dateString) {
  // Split the date string into an array containing year, month, and day
  const parts = dateString.split('-');

  // Rearrange the parts to form the desired format
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

  return formattedDate;
}

const Job = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [jobData, setJobData]=useState([]);
  const [jobComponent, setJobComponent] = useState([]); // Use state to store job components
  const [openDialogData, setOpenDialogData]=useState([]);

  const fetchJobData=async()=>{
    try {
      const apiEndPoint = 'http://localhost:8001/jobs';
      const params = {
        at: '234, 35',
        q: 'restaurant'
      };
      const response = await axios.get(apiEndPoint, { params });
      setJobData(response.data);
    } catch (error) {
      console.log("got the error", error);
    }
  }

  useEffect(()=>{
    // Fetch job data from API
    fetchJobData();
    
  },[]);

  useEffect(()=>{
    // Fetch job data from API
    fillContainer();
    
  },[ jobData]);
  

  const handleJobCardClick = (id) => {
    setIsDialogOpen(true);
    const filteredJob=jobData.filter(job=>job._id==id);
    setOpenDialogData(filteredJob[0])
  };

  const SetupDialog=()=>{
    if(!isDialogOpen) return;
    if(!openDialogData) return;
    console.log("//", openDialogData)
    return (
      <div className="dialog">
      <div className="dialog-header">
        <div className='dialog_company'>
          {openDialogData.companyName}
        </div>
        <div className="dialog_status">
          <button className="status_button"> Apply </button>
        </div>
      </div>
      <div className="dialog_photo">
        <img src={profileIconBase} alt="company_name"></img>
      </div>
      <div className="dialog_details">
        <div className='dialog_details_left'>
          <div>
            <FaMapMarkerAlt className="icon" style={{ marginRight: '10px' }} />
            <span className="inline"><b>{openDialogData.location ? openDialogData.location:'NA'}</b></span>
          </div>
          <div>
            <FaClock className="icon" style={{ marginRight: '10px' }} />
            <span className="inline"><b>{openDialogData.TypeName ? JobType[openDialogData.TypeName]:'NA'}</b></span>
          </div>
          <div>
            <FaDollarSign className="icon" style={{ marginRight: '10px' }} />
            <span className="inline"><b>Rs. {openDialogData.ctc ? openDialogData.ctc:'NA'}</b></span>
          </div>
          <div>
            <FaHourglassHalf className="icon" style={{ marginRight: '10px' }} />
            <span className="inline"><b>{openDialogData.duration ? openDialogData.duration:'NA'} months</b></span>
          </div>
        </div>
        <div className='dialog_details_right'>
            <div>
              <span className="inline-head"><b>Apply Before</b></span>
              
              <span className="inline">{openDialogData.applyDeadlineDate ? formatDate(openDialogData.applyDeadlineDate):'NA'} | {openDialogData.applyDeadlineTime ? openDialogData.applyDeadlineTime:'NA'}</span>
            </div>
            <div>
              <span className="inline-head"><b>Starts On</b></span>
              <span className="inline">{openDialogData.startDate? formatDate(openDialogData.startDate):'NA'}</span>
            </div>
            <button className="dialog_type_container">{openDialogData.category?CategoryType[openDialogData.category]:'NA'}</button>
        </div>
      </div>
      <button className="close-button" onClick={() => {setIsDialogOpen(false)}}>Close</button>
    </div>
    )
  }


  const fillContainer = () => {
    if (Array.isArray(jobData)) {
      const updatedJobComponent = jobData.map((job) => (
          <JobCards
            key={job._id}
            company={job.companyName}
            city={job.city}
            duration={job.duration}
            ctc={job.ctc}
            startDate={job.startDate}
            status={job.status}
            imgPath={job.imgPath}
            onClick={()=>handleJobCardClick(job._id)} // Attach onClick to a clickable element within JobCards
          />

      ));
      setJobComponent(updatedJobComponent); // Assuming you have a state variable to store job components
    }
  };
  


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
    <div>
      <h3 className="job-card-head">
        Job Instances
      </h3>
      <div className='jobcard-filter'>
        <div className="filter-left">
        
          <div className='filter-myjob'>
            {/* <button type='button' className='myjob'>
              My Jobs
            </button>
            <button type="button" className='alljob'>
              All Jobs
            </button> */}

          </div>

          <div className='filter-sort'>
          <select id="myjobfilter" className='sort'>
                <option value="default">Job filter</option>
                <option value="priceLowToHigh">My Job</option>
                <option value="priceHighToLow">All Jobs</option>
              </select>
              {/* <label for="sortDropdown">Sort:</label> */}
              <select id="sortDropdown" className='sort'>
                <option value="4">Sort</option>
                <option value="1">A to Z</option>
                <option value="2">Z to A</option>
                <option value="3">Date Ascending</option>
                <option value="4">Date Descending</option>
              </select>

              {/* <label for="filterDropdown">Filter:</label> */}
              <select id="filterDropdown" className='filter'>
                <option value="all">Filter</option>
                <option value="1">Eligible</option>
                <option value="2">Super Dream Offer</option>
                <option value="3">Super Dream Intern</option>
                <option value="4">Super Dream FTE</option>
                <option value="5">Dream Offer</option>
                <option value="6">Dream Intern</option>
                <option value="7">Dream FTE</option>
                <option value="8">Regular Offer</option>
                <option value="9">Regular Intern</option>
                <option value="10">Regular FTE</option>
              </select>
            </div>
        </div>
        <div className='filter-right'>
        </div>

      </div>
      <div className={`job ${isDialogOpen ? 'blur' : ''}`}> {/* Apply blur className conditionally */}
          <div className="job-left">
            <div className="job-filter">
            </div>
            <div className="job-cards">
              {/* {jobComponent.map((job, index) => (
                <div className="job-card-container" key={index} onClick={handleJobCardClick}>
                  {job}
                </div>
              ))} */}
              {jobComponent}
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
      </div>
      {isDialogOpen && (
        <div className="backdrop" onClick={() => { setIsDialogOpen(false); setOpenDialogData([]); }}></div>
      )}
      
      {isDialogOpen && (
          <SetupDialog/>
        )}
    </div>
  );
};

export default Job;