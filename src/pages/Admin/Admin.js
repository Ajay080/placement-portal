import React, { useState, useEffect, useRef } from 'react';
import './Admin.css';
import $ from 'jquery';
import 'datatables.net'; // Import DataTables library
import EditStudentDetails from './EditStudentDetails';
import EditPlacementDetails from './EditPlacementDetails'
import EditJob from './EditJob'
import EditInterview from './EditInterview'
import EditDrop from './EditDrop'
import axios from 'axios';
import ResumeDownloadButton from '../../components/ResumeDownloadButton/ResumeDownloadButton'; // Importing the ResumeDownloadButton component
import { buildApiUrl } from '../../utils/config';


const Admin = () => {
    const [dropData, setDropData] = useState([]);

    const [selectedButton, setSelectedButton] = useState(0);
    const [studentData, setStudentData]= useState('')
    const [showStudentTable, setShowStudentTable] = useState(true);
    const [showDropTable, setShowDropTable] = useState(false);
    const [showRequestTable, setshowRequestTable]=useState(false);
    const [requestData, setrequestData]=useState([]);

    const[interviewData, setInterviewData]=useState([]);
    const [showAssignInterviews, setShowAssignInterviews]= useState(false)
    
    
    const[jobData, setJobData]=useState([]);
    const [showJob, setShowJob]= useState(false)
  
    const pdfValue = 'Your PDF value goes here...';

    // const [tableData, setTableData] = useState([
    //     { id: 1, registrationNo: '1', email: 'john@example.com', phone: '123-456-7890', gender: 'Male', dob: '1990-01-01', status: 'Approved', resume: 'resume1.pdf' },
    //     { id: 2, registrationNo: '2', email: 'jane@example.com', phone: '987-654-3210', gender: 'Female', dob: '1992-05-15', status: 'Rejected', resume: 'resume2.pdf' },
    //     { id: 3, registrationNo: '3', email: 'alice@example.com', phone: '555-555-5555', gender: 'Female', dob: '1988-10-20', status: 'Approved', resume: 'resume3.pdf' },
    //     // Add more rows as needed
    // ]);
    const [tableData, setTableData] = useState([]);

    const getStudentDetails = async () => {
        try {
            const response = await axios.get(buildApiUrl('getAllStudents'));
            setStudentData(response.data);
            console.log("response data is", response.data);
    
            // Extracting student details and formatting them for the table
            const formattedData = response.data.map((student, index) => ({
                id: index + 1,
                registrationNo: student.registrationNumber,
                email: student.email,
                phone: student.phoneNumber || 'N/A',
                gender: student.gender,
                dob: student.dob ? new Date(student.dob).toISOString().split('T')[0] : 'N/A',
                status: student.status ? 'Approved' : 'Rejected',
                // Assuming resume details are not available in the fetched data
                resume: 'N/A',
            }));
    
            // Setting the formatted data to the tableData state
            setTableData(formattedData);
        } catch (error) {
            console.error("Error fetching student details:", error.message);
        }
    };

    
    const getJobs = async () => {
        try {
            const response = await axios.get(buildApiUrl('jobs'));
            // setJobData(response.data);
            console.log("response data is---------", response.data);
    
            // Extracting student details and formatting them for the table
            const formattedData = response.data.map((company, index) => ({
                id: company._id,
                companyName: company.companyName,
                city: company.city,
                ctc: company.ctc,
                startDate: company.startDate,
                applyDeadlineDate: company.applyDeadlineDate,
                applyDeadlineTime: company.applyDeadlineTime,
                status: company.status,
            }));
    
            // Setting the formatted data to the tableData state
            setJobData(formattedData);
        } catch (error) {
            console.error("Error fetching student details:", error.message);
        }
    };
    
    
    const tableRef = useRef(null);

    const getDropDetails = async () => {
        try {
            const response = await axios.get(buildApiUrl('drops'));
            console.log("response data is", response.data);
    
            const formattedData = response.data.map((drop, index) => ({
                id: drop._id,
                subject: drop.subject,
                message: drop.message,
                years: drop.years.length>0?drop.years: 'N/A',
                branch: drop.branch.length>0?drop.branch : 'N/A',
                type: drop.type.length>0? drop.type : 'N/A',
            }));
    
            setDropData(formattedData);
        } catch (error) {
            console.error("Error fetching drop details:", error.message);
        }
    };

    const getInterviewsDetails = async () => {
        try {
            const response = await axios.get(buildApiUrl('Interviews'));
            console.log("response data is", response.data);
            const formattedData = response.data.map((interview) => ({
                id: interview._id,
                platform: interview.platform,
                date: interview.date,
                time: interview.time,
                theme: interview.theme,
                duration: interview.duration,
                softwareRequirement: interview.softwareRequirement,
                joiningLink: interview.joiningLink,
                registrationNumber: interview.students,
                createdAt: interview.createdAt,
                updatedAt: interview.updatedAt,
                mockInterviewId: interview.mockInterviewId,
            }));
            
    
            setInterviewData(formattedData);
        } catch (error) {
            console.error("Error fetching drop details:", error.message);
        }
    };

    const getrequestDetails = async () => {
        try {
            const response = await axios.get(buildApiUrl('InterviewAsks'));
            console.log("response data is---------", response.data);
    
            const formattedData = response.data.map((item, index) => ({
                student_id: item.student_id,
                registrationNumber:item.registrationNumber,
                targetRole: item.targetRole,
                potentialDate: new Date(item.potentialDate).toLocaleDateString(), // Format date as YYYY-MM-DD
                potentialTime: item.potentialTime,
                potentialDuration: item.potentialDuration,
                targetCompany: item.targetCompany,
                currentTime: item.currentTime,
                currentDate:item.currentDate // Format date as YYYY-MM-DD
              }));
            
    
            setrequestData(formattedData);
        } catch (error) {
            console.error("Error fetching drop details:", error.message);
        }
    };



    const deleteDrop=async(drop_id)=>{
        try{
            const storedData = localStorage.getItem('userData');
            if (!storedData) return;
            var parsedData = JSON.parse(storedData);
            console.log("stored json data is",parsedData); // Output: { name: 'John', age: 30 }
            var student_id=parsedData.newStudent._id;
              
            const response=await axios.delete(buildApiUrl(`Deletedrops/${drop_id}`));
            window.location.reload();

        }
        catch (error) {
            console.error("Error fetching drop details:", error.message);
        }    }

        const deleteInterview=async(drop_id)=>{
            try{

                // var parsedData = JSON.parse(drop_id);
                // console.log("stored json data is",parsedData); // Output: { name: 'John', age: 30 }
                // var student_id=parsedData.newStudent._id;
                  
                const response=await axios.delete(buildApiUrl(`DeleteInterview/${drop_id}`));
                window.location.reload();

            }
            catch (error) {
                console.error("Error fetching drop details:", error.message);
            }    }
            const deleteJob=async(job_id)=>{
                try{
    
                    // var parsedData = JSON.parse(drop_id);
                    // console.log("stored json data is",parsedData); // Output: { name: 'John', age: 30 }
                    // var student_id=parsedData.newStudent._id;
                      
                    const response=await axios.delete(buildApiUrl(`DeleteJob/${job_id}`));
                    window.location.reload();

                }
                catch (error) {
                    console.error("Error fetching drop details:", error.message);
                }    }


    


useEffect(() => {
    const initializeDataTable = () => {
        if (tableRef.current && tableData.length > 0) {
            // Initialize DataTables
            const dataTable = $(tableRef.current).DataTable({
                "autoWidth": true, // Automatically adjust column widths
                "columnDefs": [
                    { "width": "auto", "targets": "_all" } // Set all columns to auto width
                ]
            });

            // Enable searching
            dataTable.search('').draw();

            // Apply the DataTables search functionality to the table
            $('#dropSearch').on('keyup', function () {
                dataTable.search(this.value).draw();
            });
        }
    };

    initializeDataTable();

    return () => {
        // Cleanup function to destroy DataTable instance
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable().destroy();

        }
    };
}, [tableData]);

    

    useEffect(()=>{
        getStudentDetails();
    },[])

    const handleButtonClick = (buttonId) => {
        setSelectedButton(buttonId);
        if(buttonId==1) setStudentFormOpen(true)
        if(buttonId==2) setPlacementFormOpen(true)
        if(buttonId==3) setJobFormOpen(true)
        if(buttonId==4) setInterviewFormOpen(true)
            if (buttonId === 5) {
                setDropFormOpen(true);
                setShowDropTable(true)
                setshowRequestTable(false);
                setShowStudentTable(false);
                setShowAssignInterviews(false)
                setShowJob(false)


                getDropDetails();
            }
            if (buttonId === 6) {
                setDropFormOpen(false);
                setShowStudentTable(false)
                setshowRequestTable(true)
                setShowAssignInterviews(false)
                setShowJob(false)

                getrequestDetails();
            }   
            if (buttonId === 7) {
                setDropFormOpen(false);
                setShowStudentTable(false)
                setshowRequestTable(false)
                setShowAssignInterviews(true)
                setShowJob(false)

                getInterviewsDetails();
            }  
            if (buttonId === 8) {
                setDropFormOpen(false);
                setShowStudentTable(false)
                setshowRequestTable(false)
                setShowAssignInterviews(false)
                setShowJob(true)

                getJobs();
            }             
    };

    const handleDownloadResume = (resumeFilename) => {
        // Implement logic to download the resume PDF
        console.log('Downloading resume:', resumeFilename);
    };

    const [StudentFormOpen, setStudentFormOpen] = useState(true);

    const handleCloseStudentInfoForm = () => {
      setStudentFormOpen(false);
    };

    const [PlacementFormOpen, setPlacementFormOpen] = useState(true);

    const handleClosePlacementInfoForm = () => {
      setPlacementFormOpen(false);
    };


    const [JobFormOpen, setJobFormOpen] = useState(true);

    const handleCloseJobInfoForm = () => {
      setJobFormOpen(false);
    };

    const [InterviewFormOpen, setInterviewFormOpen] = useState(true);

    const handleCloseInterviewInfoForm = () => {
      setInterviewFormOpen(false);
    };

    const [DropFormOpen, setDropFormOpen] = useState(true);

    const handleCloseDropInfoForm = () => {
      setDropFormOpen(false);
    };

    const handleDeleteDrop = () => {
        // Implement delete drop logic
        getDropDetails();
        setShowDropTable(true);
        setShowAssignInterviews(false)
        setShowStudentTable(false);
        setshowRequestTable(false);
        setShowJob(false)

    };

    const handleViewStudent = () => {
        setShowStudentTable(true);
        setshowRequestTable(false);
        setShowDropTable(false);
        setShowAssignInterviews(false)
        setShowJob(false)



    };

    
    const handleViewRequest = () => {
        getrequestDetails()
        setShowStudentTable(false);
        setshowRequestTable(true);
        setShowDropTable(false);
        setShowAssignInterviews(false)
        setShowJob(false)



    };
    const handleViewInterview = () => {
        getInterviewsDetails()
        setShowStudentTable(false);
        setshowRequestTable(false);
        setShowDropTable(false);
        setShowAssignInterviews(true)
        setShowJob(false)



    };
    const handleShowJob = () => {
        getJobs()
        setShowStudentTable(false);
        setshowRequestTable(false);
        setShowDropTable(false);
        setShowAssignInterviews(false)
        setShowJob(true)



    };



    return (
        <div>
            <div className="Buttons">
                {/* <div><button className={selectedButton === 1 ? 'selected' : ''} onClick={() => handleButtonClick(1)}>Edit Student Details</button></div> */}
                {/* <div><button className={selectedButton === 2 ? 'selected' : ''} onClick={() => handleButtonClick(2)}>Edit Placement rules</button></div> */}
                <div><button className={selectedButton === 3 ? 'selected' : ''} onClick={() => handleButtonClick(3)}>Add Job</button></div>
                <div><button className={selectedButton === 4 ? 'selected' : ''} onClick={() => handleButtonClick(4)}>Add Interviews</button></div>
                <div><button className={selectedButton === 5 ? 'selected' : ''} onClick={() => handleButtonClick(5)}>Add Drops</button></div>
                <div><button onClick={handleDeleteDrop}>Delete Drop</button></div>
                <div><button onClick={handleViewStudent}>View Student</button></div>
                <div><button onClick={handleViewRequest}>Interview Request</button></div>
                <div><button onClick={handleViewInterview}>Assigned Interview</button></div>
                <div><button onClick={handleShowJob}>Assigned Jobs</button></div>
            </div>
            {selectedButton === 1 && StudentFormOpen && <EditStudentDetails handleCloseStudentInfoForm={handleCloseStudentInfoForm} />}
            {selectedButton === 2 && PlacementFormOpen && <EditPlacementDetails handleClosePlacementInfoForm={handleClosePlacementInfoForm} />}
            {selectedButton === 3 && JobFormOpen && <EditJob handleCloseJobInfoForm={handleCloseJobInfoForm} />}
            {selectedButton === 4 && InterviewFormOpen && <EditInterview handleCloseInterviewInfoForm={handleCloseInterviewInfoForm} />}
            {selectedButton === 5 && DropFormOpen && <EditDrop handleCloseDropInfoForm={handleCloseDropInfoForm} />}
           
            <div className="admin_power">
            {showDropTable && (
                <div className='TableContainer'>
                    <table ref={tableRef} className='DataTable'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Years</th>
                                <th>branch</th>
                                <th>type</th>
                                <th>Delete</th>

                                {/* Add more columns as needed */}
                            </tr>
                        </thead>
                        <tbody>
                        {dropData.map((rowData) => (
                            <tr key={rowData.id}>
                                <td><input type="radio" name="selectedRow" value={rowData.id} /></td>
                                <td>{rowData.subject}</td>
                                <td>{rowData.message}</td>
                                <td>{Array.isArray(rowData.years) ? rowData.years.join(', ') : rowData.years}</td>
                                <td>{Array.isArray(rowData.branch) ? rowData.branch.join(', ') : rowData.branch}</td>
                                <td>{Array.isArray(rowData.type) ? rowData.type.join(', ') : rowData.type}</td>
                                <td><button onClick={() => deleteDrop(rowData.id)}>Delete</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            {showJob && (
                <div className='TableContainer'>
                    <table ref={tableRef} className='DataTable'>
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>City</th>
                                <th>CTC(Annual)</th>
                                <th>Start Date</th>
                                <th>Deadline Date</th>
                                <th>Deadline Time</th>
                                <th>Operation</th>


                                {/* Add more columns as needed */}
                            </tr>
                        </thead>
                        <tbody>
                        {jobData.map((rowData) => (
                            <tr key={rowData.id}>
                                <td>{rowData.companyName}</td>
                                <td>{rowData.city}</td>
                                <td>{rowData.ctc}</td>
                                <td>{rowData.startDate}</td>
                                <td>{rowData.applyDeadlineDate}</td>
                                <td>{rowData.applyDeadlineTime}</td>
                                <td><button onClick={() => deleteJob(rowData.id)}>Delete</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            {showStudentTable && (
                <div className="admin_power">
                    <div className='TableContainer'>
                        <table ref={tableRef} className='DataTable'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Registration No</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Gender</th>
                                    <th>DOB</th>
                                    <th>Status</th>
                                    <th>Resume</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((rowData, rowIndex) => (
                                    <tr key={rowData.id}>
                                        <td><input type="radio" name="selectedRow" value={rowData.id} /></td>
                                        <td>{rowData.registrationNo}</td>
                                        <td>{rowData.email}</td>
                                        <td>{rowData.phone}</td>
                                        <td>{rowData.gender}</td>
                                        <td>{rowData.dob}</td>
                                        <td>{rowData.status}</td>
                                        <td><ResumeDownloadButton pdfValue={pdfValue} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {showRequestTable && (
                <div className='TableContainer'>
                    <table ref={tableRef} className='DataTable'>
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Registration Number</th>
                                <th>Target Role</th>
                                <th>Potential Date</th>
                                <th>Potential Time</th>
                                <th>Potential Duration</th>
                                <th>Target Company</th>
                                <th> Request Date</th>
                                <th> Request Time</th>
                                {/* Add more columns as needed */}
                            </tr>
                        </thead>
                        <tbody>
                        {requestData.map((rowData) => (
                            <tr key={rowData.id}>
                                {/* <td><input type="radio" name="selectedRow" value={rowData.id} /></td> */}
                                <td>{rowData.student_id}</td>
                                <td>{rowData.registrationNumber}</td>
                                <td>{rowData.targetRole}</td>
                                <td>{rowData.potentialDate}</td>
                                <td>{rowData.potentialTime}</td>
                                <td>{rowData.potentialDuration}</td>
                                <td>{rowData.targetCompany}</td>
                                <td>{rowData.currentDate}</td>
                                <td>{rowData.currentTime}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            {showAssignInterviews && (
                <div className='TableContainer'>
                    <table ref={tableRef} className='DataTable'>
                        <thead>
                            <tr>
                                <th>Registration Number</th>
                                <th>Platform</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Theme</th>
                                <th>Duration</th>
                                <th>softwareRequirement</th>
                                <th>JoiningLink</th>
                                <th>Operation</th>
                                {/* Add more columns as needed */}
                            </tr>
                        </thead>
                        <tbody>
                        {interviewData.map((rowData) => (
                            <tr key={rowData.id}>
                                {/* <td><input type="radio" name="selectedRow" value={rowData.id} /></td> */}
                                <td>{rowData.registrationNumber}</td>
                                <td>{rowData.platform}</td>
                                <td>{rowData.date}</td>
                                <td>{rowData.time}</td>
                                <td>{rowData.theme}</td>
                                <td>{rowData.duration}</td>
                                <td>{rowData.softwareRequirement}</td>
                                <td>{rowData.joiningLink}</td>
                                <td><button onClick={() => deleteInterview(rowData.id)}>Delete</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}


            </div>
        </div>
    );
};

export default Admin;
