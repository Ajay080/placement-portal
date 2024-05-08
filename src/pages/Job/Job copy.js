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
// import { response } from 'express';
// import { error } from 'jquery';

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
  const [allJobInteraction, setAllJobInteraction]= useState({})

  const TypeOptions = [
    { value: 1, label: 'Full-time' },
    { value: 2, label: 'Part-time' },
    { value: 3, label: 'Internship' },
    { value: 4, label: 'Contract' }
    // Add more options as needed
  ];

  const CategoryOptions = [
    { value: 1, label: 'Super Dream Offer' },
    { value: 2, label: 'Super Dream Internship' },
    { value: 3, label: 'Super Dream FTE' },
    { value: 4, label: 'Dream Offer' },
    { value: 5, label: 'Dream Internship' },
    { value: 6, label: 'Dream FTE' },
    { value: 7, label: 'Regular Offer' },
    { value: 8, label: 'Regular Intern' },
    { value: 9, label: 'Regular FTE' }
    // Add more options as needed
  ];

  useEffect(() => {
    const getAllData = async () => {
      await getAllJobInteraction();
      await fetchJobData();
      fillContainer();
      // console.log("allJobInteraction after getAllData:", allJobInteraction);
      // console.log("jobData after getAllData:", jobData);
    };
    getAllData();
  }, []);

  useEffect(() => {
    fillContainer();
    // console.log("jobData after fillContainer:", jobData);
  }, [jobData]);

  useEffect(() => {
    console.log("allJobInteraction updated:", allJobInteraction);
  }, [allJobInteraction]);


  function getJobLabel(number) {
    const type = TypeOptions.find(option => option.value === number);
    return type ? type.label : 'NA';
  }

  
  function getCategoryLabel(number) {
    const category = CategoryOptions.find(option => option.value === number);
    return category ? category.label : 'NA';
  }

  const handleJobCardClick = (id) => {
    setIsDialogOpen(true);
    const filteredJob=jobData.filter(job=>job._id==id);
    setOpenDialogData(filteredJob[0])
  };


  const getAllJobInteraction = async () => {
    try {
      const apiEndPoint = 'http://localhost:8001/getStudentJobInteraction/6608648c5c049561e85f5f1a';
      const response = await axios.get(apiEndPoint);
      // console.log("get all job interaction", response);
      const data = response.data;
  
      const updatedJobInteraction = { ...allJobInteraction };
      // console.log("initial updateJobInteraction", updatedJobInteraction)
  
      for (var i = 0; i < data.length; i++) {
        // console.log("data i", data[i])
        const { studentId, CompanyId, history } = data[i];
        // console.log("student Id, companyId, history", studentId, CompanyId, history)

        if (!updatedJobInteraction[studentId]) {
          updatedJobInteraction[studentId] = {};
        }
        if (!updatedJobInteraction[studentId][CompanyId]) {
          updatedJobInteraction[studentId][CompanyId] = history;
        }
      }
      // console.log("updated job interaction is", updatedJobInteraction)
  
      setAllJobInteraction(updatedJobInteraction)
            
    } catch (error) {
      console.log("got the error", error);
    }
  };

const fetchJobData = async () => {
  try {
    const apiEndPoint = 'http://localhost:8001/job/6608648c5c049561e85f5f1a';
    const response = await axios.get(apiEndPoint);
    const data = response.data.jobDetails;
    const studentId = '6608648c5c049561e85f5f1a';
    const currentDate = new Date();
    console.log("data", data)

    for (let i = 0; i < data.length; i++) {
      const job = data[i];
      const jobId = job._id;
      const applyDeadlineDateTime = new Date(job.applyDeadlineDate + 'T' + job.applyDeadlineTime);
      const deadline = currentDate < applyDeadlineDateTime ? 'ahead' : 'behind';
      console.log("current date and applied deadline date time is, deadline", currentDate, applyDeadlineDateTime, deadline)


      console.log("job is ", job)

      if (!allJobInteraction[studentId]) {
        allJobInteraction[studentId] = {};
      }

      if (!allJobInteraction[studentId][jobId]) {
        allJobInteraction[studentId][jobId] = { history: [] };
      }

      console.log("all job interaction is", allJobInteraction, "coming job is ", job)
      if(!allJobInteraction[studentId][jobId].history) continue;

      const historyLength = allJobInteraction[studentId][jobId].history.length;

      console.log("deadline ",deadline, "all job interaction", allJobInteraction )

      if (
        deadline === 'ahead' &&
        (historyLength === 0 || allJobInteraction[studentId][jobId].history[historyLength - 1] !== true)
      ) {
        data[i].status = 'Apply';
        console.log("iiiiiiiiiiiiiiiiii")
      }

      if (
        historyLength > 0 &&
        allJobInteraction[studentId][jobId].history[historyLength - 1] === true
      ) {
        data[i].status = 'Applied';
        console.log("jjjjjjjjjjjjjjjjjjjj")

      }

      if (
        deadline === 'behind' &&
        (historyLength === 0 || allJobInteraction[studentId][jobId].history[historyLength - 1] !== true)
      ) {
        data[i].status = 'Not Applied';
        console.log("pppppppppppppppppp")

      }

      console.log("ooooooooooooooooooooooo")

    }


    setJobData(data);
    console.log("jbl data", jobData)
  } catch (error) {
    console.log("got the error", error);
  }
};

  
  

  const SetupDialog=()=>{
    if(!isDialogOpen) return;
    if(!openDialogData) return;
    // console.log("set up dialog ", openDialogData)
    const currentDate= new Date();


    // Format current date
    const currentDateString = currentDate.toISOString().slice(0, 10); // Format: YYYY-MM-DD

    // Format current time in Indian Standard Time (IST)
    const currentTimeString = new Date(currentDate.getTime() + 5.5 * 60 * 60 * 1000) // Adding 5.5 hours (IST offset from UTC)
      .toISOString()
      .slice(11, 16); // Format: HH:mm


    const applyDeadlineDateTime = new Date(openDialogData.applyDeadlineDate + 'T' + openDialogData.applyDeadlineTime); // Combine date and time strings into a Date object
    const status = (currentDate < applyDeadlineDateTime) ? 'ahead' : 'behind'; // Compare current date with job deadline

    const handleApplyClick = () => {
      if (status === 'Apply') {
        const apiInteractionEndPoint='http://localhost:8001/addStudentJobInteraction';
        const sendingData={
            studentId:'6608648c5c049561e85f5f1a',
            CompanyId:openDialogData._id,
            status:true,
            date:currentDateString,
            time:currentTimeString
        }
        axios.post(apiInteractionEndPoint, sendingData)
        .then(response => {
          // Handle success
          // console.log('Apply click response:', response.data);
        })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
        });
      }
      else {
        const apiEndPoint = 'http://localhost:8001/addStudentJobInteraction';
        const sendingData={
          studentId:'6608648c5c049561e85f5f1a',
          CompanyId:openDialogData._id,
          status:false,
          date:currentDateString,
          time:currentTimeString
        }
        axios.post(apiEndPoint, sendingData)
        .then(response => {
          // Handle success
          // console.log('Apply click response:', response.data);
        })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
        });
      }
    };
  
    return (
      <div className="dialog">
      <div className="dialog-header">
        <div className='dialog_company'>
          {openDialogData.companyName}
        </div>
        <div className="dialog_status">
          <button className="status_button" disabled={status=='behind'}   style={{ backgroundColor: openDialogData.status === 'ahead' ? 'green' : 'grey' }} onClick={handleApplyClick}> {openDialogData.status} </button>
        </div>
      </div>
      <div className="dialog_photo">
        <img src={profileIconBase} alt="company_name"></img>
      </div>
      <div className="dialog_details">
        <div className='dialog_details_left'>
          <div>
            <FaMapMarkerAlt className="icon" style={{ marginRight: '10px' }} />
            <span className="inline"><b>{openDialogData.city ? openDialogData.city:'NA'}</b></span>
          </div>
          <div>
            <FaClock className="icon" style={{ marginRight: '10px' }} />
            <span className="inline"><b>{openDialogData.type ? getJobLabel(openDialogData.type[0]):'NA'}</b></span>
          </div>
          <div>
            <FaDollarSign className="icon" style={{ marginRight: '10px' }} />
            <span className="inline"><b>Rs. {openDialogData.ctc ? openDialogData.ctc:'NA'} LPA CTC</b></span>
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
            <button className="dialog_type_container">{openDialogData.category?getCategoryLabel(openDialogData.category):'NA'}</button>
        </div>
      </div>
      <button className="close-button" onClick={() => {setIsDialogOpen(false)}}>Close</button>
    </div>
    )
  }

  const fillContainer = () => {
    // console.log("fill container job data", jobData)
    if (Array.isArray(jobData)) {
      // const currentDate = new Date(); // Get the current date and time
      const updatedJobComponent = jobData.map((job) => {
        // const applyDeadlineDateTime = new Date(job.applyDeadlineDate + 'T' + job.applyDeadlineTime); // Combine date and time strings into a Date object
        // const status = (currentDate >= applyDeadlineDateTime) ? 'passed' : 'upcoming'; // Compare current date with job deadline
        // if(status=='passed'){
        //   const apiInteractionEndPoint='http://localhost:8001/getStudentJobInteraction/6608648c5c049561e85f5f1a/66384f6b9ed05ae4843da8a0'
        //   axios.get(apiInteractionEndPoint).then(response => {
        //     // Handle success
        //     console.log('API response:', response.data);
        //   })
        //   .catch(error => {
        //     // Handle error
        //     console.error('Error:', error);
        //   });
        // }
        return (
          <JobCards
            key={job._id}
            company={job.companyName}
            city={job.city}
            duration={job.duration}
            ctc={job.ctc}
            startDate={job.startDate}
            status={job.status} // Set the status based on comparison result
            imgPath={job.imgPath}
            category={job.category}
            onClick={()=>handleJobCardClick(job._id)} // Attach onClick to a clickable element within JobCards
          />
        );
      });
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