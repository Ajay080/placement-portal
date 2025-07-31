import {React, useEffect, useState} from 'react'
import JobCards from '../../components/JobCards/JobCards'
import { FaUser } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';
import { FaDollarSign } from 'react-icons/fa';
import { FaHourglassHalf } from 'react-icons/fa';
// import profileIconBase from '../../Img/profile-icon.jpg';
import profileIconBase from '../../Img/job.png'

import axios from 'axios'

import './Job.css'

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
  const [filterOption, setFilterOption] = useState("all"); // Initial filter option
  const [sortOption, setSortOption] = useState("default"); // Initial sort option
  const [Interaction, setInteraction] = useState([]);
  const [history, setHistory] = useState([]); // State variable for history
  const [appliedJobCount, setAppliedJobCount]= useState(0);
  
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
  const appliedJobCounting=()=>{
    var count=0;
    console.log("interaction---", Interaction)
    for(var i=0;i<Interaction.length;i++){
      console.log("All job interaction", Interaction[i])
      if(Interaction[i].history[Interaction[i].history.length-1].status==true) count++;
    }
    console.log("count is ", count)
    setAppliedJobCount(count)
  }
  useEffect(() => {
    const getAllData = async () => {
      await getAllJobInteraction();
      fillContainer();
    };
    getAllData();
  }, []);

  useEffect(() => {
    fillContainer();
  }, [jobData, filterOption, sortOption]);

  useEffect(() => {
    fetchJobData();
    appliedJobCounting();
  }, [allJobInteraction]);

  useEffect(() => {
    // Generate history based on the Interaction data
    const newHistory = Interaction
    // Sort the interaction data based on the latest updatedAt timestamp
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    // Iterate over each interaction item
    .map((interactionItem) => {
      // Get the last item from the history array
      const lastHistoryItem = interactionItem.history[interactionItem.history.length - 1];
      // Check if the history array is not empty
      if (lastHistoryItem) {
        return (
        <div className="history_detail" style={{backgroundColor: lastHistoryItem.status ? 'green' : 'red' }} key={lastHistoryItem._id}>
            <div className="history_head">
              <span className="inline"><b>{interactionItem.companyName ? interactionItem.companyName : "Temp"}</b></span>
            </div>
            <div className='history_info'>
              <div className='history_date'>
                {lastHistoryItem.date} | {lastHistoryItem.time}
              </div>
              <div className='history_status'>
                {lastHistoryItem.status ? 'Applied' : 'Rejected'}
              </div>
            </div>
          </div>
        );
      } else {
        return null; // Return null if history array is empty
      }
    });
  
  
    setHistory(newHistory.flat()); // Update the history state with the new data
  }, [Interaction]); // Watch for changes in the Interaction state
  

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
      const storedData = localStorage.getItem('userData');
      if (!storedData) return;
      var parsedData = JSON.parse(storedData);
      console.log("stored json data is",parsedData); // Output: { name: 'John', age: 30 }
      var student_id=parsedData.newStudent._id;
      const apiEndPoint = 'http://localhost:8001/getStudentJobInteraction/'+student_id;
      const response = await axios.get(apiEndPoint);
      const data = response.data;
      setInteraction(data)
  
      const updatedJobInteraction = { ...allJobInteraction };
  
      for (var i = 0; i < data.length; i++) {
        const { studentId, CompanyId, history } = data[i];

        if (!updatedJobInteraction[studentId]) {
          updatedJobInteraction[studentId] = {};
        }
        if (!updatedJobInteraction[studentId][CompanyId]) {
          updatedJobInteraction[studentId][CompanyId] = history;
        }
      }  
      setAllJobInteraction(updatedJobInteraction)
            
    } catch (error) {
      console.log("got the error", error);
    }
  };

  const fetchJobData = async () => {
    try {
      const storedData = localStorage.getItem('userData');
      if (!storedData) return;
      var parsedData = JSON.parse(storedData);
      console.log("stored json data is",parsedData); // Output: { name: 'John', age: 30 }
      var student_id=parsedData.newStudent._id;
      const apiEndPoint = 'http://localhost:8001/job/'+student_id;
      const response = await axios.get(apiEndPoint);
      const data = response.data.jobDetails;
      const studentId = student_id;
      const currentDate = new Date();
   
      console.log("current job Interaction is", allJobInteraction)
      console.log("---------data is", data)
  
      for (let i = 0; i < data.length; i++) {
        const job = data[i];
        const jobId = job._id;
  
        // Check if there is interaction data for the student and job
        if (allJobInteraction[studentId] && allJobInteraction[studentId][jobId]) {
          const applyDeadlineDateTime = new Date(job.applyDeadlineDate + 'T' + job.applyDeadlineTime); // Combine date and time strings into a Date object
          const deadline = currentDate < applyDeadlineDateTime ? 'ahead' : 'behind';
  
          // Check if interaction history exists
          if (allJobInteraction[studentId][jobId].length > 0) {
            const lastInteractionStatus = allJobInteraction[studentId][jobId][allJobInteraction[studentId][jobId].length - 1].status;
            if (deadline === 'ahead' && lastInteractionStatus !== true) {
              job.status = 'Apply';
            } else if (lastInteractionStatus === true) {
              job.status = 'Applied';
            } else if (deadline == 'behind' && lastInteractionStatus !== true) {
              job.status = 'Not Applied';
            }
            else if(deadline=="behind"){
              job.status='Not Applied'
            }
            console.log("job , deadline", job, deadline, lastInteractionStatus)

          }
        }
        else{
          const applyDeadlineDateTime = new Date(job.applyDeadlineDate + 'T' + job.applyDeadlineTime); // Combine date and time strings into a Date object
          const deadline = currentDate < applyDeadlineDateTime ? 'ahead' : 'behind';
          if(deadline=='ahead'){
            job.status='Apply'
          }
          else{
            job.status='Not Applied'
          }
        }
      }
  
      setJobData(data);
    } catch (error) {
      console.log("got the error", error);
    }
  };
  

  
  

  const SetupDialog=()=>{
    if(!isDialogOpen) return;
    if(!openDialogData) return;
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
      if (status === 'ahead') {
        const storedData = localStorage.getItem('userData');
        if (!storedData) return; 
        var parsedData = JSON.parse(storedData);
        console.log("stored json data is",parsedData); // Output: { name: 'John', age: 30 }
        var student_id=parsedData.newStudent._id;
        const apiInteractionEndPoint='http://localhost:8001/addStudentJobInteraction';
        const sendingData={
            studentId: student_id,
            CompanyId:openDialogData._id,
            companyName:openDialogData.companyName,
            status:openDialogData.status=='Applied'? false :true,
            date:currentDateString,
            time:currentTimeString
        }
        axios.post(apiInteractionEndPoint, sendingData)
        .then(response => {
          // Handle success
          console.log('Apply click response:', response.data);
          window.location.reload();

        })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
        });
      }
      else {
        const storedData = localStorage.getItem('userData');
        if (!storedData) return;
        var parsedData = JSON.parse(storedData);
        console.log("stored json data is",parsedData); // Output: { name: 'John', age: 30 }
        var student_id=parsedData.newStudent._id;
        const apiEndPoint = 'http://localhost:8001/addStudentJobInteraction';
        const sendingData={
          studentId:student_id,
          CompanyId:openDialogData._id,
          status:false,
          date:currentDateString,
          time:currentTimeString
        }
        axios.post(apiEndPoint, sendingData)
        .then(response => {
          // Handle success
          console.log('Apply click response:', response.data);
          window.location.reload();

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
          <button className="status_button" disabled={status=='behind'}   style={{ backgroundColor: status === 'ahead' ? 'green' : 'grey' }} onClick={handleApplyClick}> {(status=='ahead' && openDialogData.status=='Applied')?'Reject':openDialogData.status} </button>
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
  // Copy jobData to a new variable for filtering and sorting
  let filteredData = jobData;
  // Filter data based on filterOption
  if (filterOption !== "all") {
    filteredData = filteredData.filter((job) =>
      // Filter jobs whose category matches the selected filter option
      job.category == filterOption
    );
  }

  // Sort filteredData based on sortOption
  if (sortOption === "az") {
    filteredData.sort((a, b) => (a.companyName > b.companyName ? 1 : -1));
  } else if (sortOption === "za") {
    filteredData.sort((a, b) => (a.companyName < b.companyName ? 1 : -1));
  }
  else if (sortOption === 'da') {
    filteredData.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
  } else if (sortOption === 'dd') {
    filteredData.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }

  console.log("filterd data is", filteredData)
  // Update jobComponent state with the filtered and sorted data
  const updatedJobComponent = filteredData.map((job) => (
    <JobCards
      key={job._id}
      company={job.companyName}
      city={job.city}
      duration={job.duration}
      ctc={job.ctc}
      startDate={job.startDate}
      status={job.status}
      imgPath={job.imgPath}
      category={job.category}
      onClick={() => handleJobCardClick(job._id)}
    />
  ));
  
  setJobComponent(updatedJobComponent);
};

  

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
          {/* <select id="myjobfilter" className='sort'>
                <option value="default">Job filter</option>
                <option value="priceLowToHigh">My Job</option>
                <option value="priceHighToLow">All Jobs</option>
              </select> */}
              {/* <label for="sortDropdown">Sort:</label> */}
              <select id="sortDropdown" value={sortOption} onChange={(e) => setSortOption(e.target.value)} className='sort'>
                <option value="default">Sort</option>
                <option value="az">A to Z</option>
                <option value="za">Z to A</option>
                <option value="da">Date Ascending</option>
                <option value="dd">Date Descending</option>
              </select>

              {/* <label for="filterDropdown">Filter:</label> */}
              <select id="filterDropdown" value={filterOption} onChange={(e) => setFilterOption(e.target.value)} className='filter'>
                <option value="all">Filter</option>
                {/* <option value="0">Eligible</option> */}
                <option value="1">Super Dream Offer</option>
                <option value="2">Super Dream Intern</option>
                <option value="3">Super Dream FTE</option>
                <option value="4">Dream Offer</option>
                <option value="5">Dream Intern</option>
                <option value="6">Dream FTE</option>
                <option value="7">Regular Offer</option>
                <option value="8">Regular Intern</option>
                <option value="9">Regular FTE</option>
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
                  {jobData.length}
                </div>
              </div>

              <div className="summary_detail">
                <div className="summary_head">
                  <FaUser className="icon" style={{ marginRight: '10px' }} />
                  <span className="inline"><b>Applied Jobs</b></span>
                </div>
                <div className='summary_count  waiting_detail'>
                  {appliedJobCount}
                </div>
              </div>
              {/* <div className="summary_detail">
                <div className="summary_head">
                  <FaUser className="icon" style={{ marginRight: '10px' }} />
                  <span className="inline"><b>Placed</b></span>
                </div>
                <div className='summary_count  placed_detail'>
                  0
                </div>
              </div> */}
              {/* <div className="summary_detail">
                <div className="summary_head">
                  <FaUser className="icon" style={{ marginRight: '10px' }} />
                  <span className="inline"><b>Waiting</b></span>
                </div>
                <div className='summary_count  waiting_detail'>
                  0
                </div>
              </div> */}
              {/* <div className="summary_detail">
                <div className="summary_head">
                    <FaUser className="icon" style={{ marginRight: '10px' }} />
                    <span className="inline"><b>Rejected</b></span>
                  </div>
                  <div className='summary_count  waiting_detail'>
                    0
                  </div>
              </div> */}
            </div>
            <h3>History</h3>


            <div className="history">

              
            {Interaction.length > 0 && (
              <div className="history">
                {history}
              </div>
            )}

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