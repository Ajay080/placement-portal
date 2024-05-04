import './Dashboard.css'
import Background from '../../Img/multi-blue.jpg'
import Profile from '../../Img/profile-icon.jpg'
import React, { useEffect, useState } from 'react';
import ResumeDownloadButton from '../../components/ResumeDownloadButton/ResumeDownloadButton'; // Importing the ResumeDownloadButton component
import { FaFileDownload } from "react-icons/fa";
import PasswordInput from '../../components/PasswordInput/PasswordInput'; // Importing the PasswordInput component
import PersonalInfoForm from './PersonalInfoForm'; // Corrected import
import AcademicInfoForm from './AcademicInfoForm';
import AdditionalInfoForm from './AdditionalInfoForm';
import ResumeInfoForm from './ResumeInfoForm';
// import ResumeDownloadBtn from './ResumeDownloadButton.js';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';


import axios from 'axios';


const Dashboard = (props) => {
    const [loading, setLoading] = useState(true);
    const [selectedButton, setSelectedButton] = useState(2);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const pdfValue = 'Your PDF value goes here...';

    // Render the FaFileDownload component to a string
    const fileDownloadIcon = ReactDOMServer.renderToString(<FaFileDownload />);


    const handleButtonClick = (buttonId) => {
        setSelectedButton(buttonId);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };


    const [showPersonalInfoForm, setShowPersonalInfoForm] = useState(false);

    const handlePersonalInfoEditClick = () => {
        setShowPersonalInfoForm(true);
    };

    const handleClosePersonalInfoForm = () => {
        setShowPersonalInfoForm(false);
    };

    const [showAcademicInfoForm, setShowAcademicInfoForm] = useState(false);

    const handleAcademicInfoEditClick = () => {
        setShowAcademicInfoForm(true);
    };

    const handleCloseAcademicInfoForm = () => {
        setShowAcademicInfoForm(false);
    };

    const [showAdditionalInfoForm, setShowAdditionalInfoForm] = useState(false);

    const handleAdditionalInfoEditClick = () => {
        setShowAdditionalInfoForm(true);
    };

    const handleCloseAdditionalInfoForm = () => {
        setShowAdditionalInfoForm(false);
    };

    const [showResumeInfoForm, setShowResumeInfoForm] = useState(false);

    const handleResumeInfoEditClick = () => {
        setShowResumeInfoForm(true);
    };

    const handleCloseResumeInfoForm = () => {
        setShowResumeInfoForm(false);
    };




    // Getting data from the api, and putting manual data

    const [studentDetail, setStudentDetail] = useState(null);
    const getStudentDetails = async () => {
        try {
            const url = 'http://localhost:8001/students/6608648c5c049561e85f5f1a';
            const response = await axios.get(url);
            setStudentDetail(response.data);
            setLoading(false);
        } catch (error) {
            console.log("got the error while fetching the data", error);
        }
    };

    const [placementRule, setPlacementRule] = useState('');

    const getPlacementDetails = async () => {
        try {
            setLoading(true);
            const url = 'http://localhost:8001/placementRules';
            const response = await axios.get(url);
            setPlacementRule(response.data);
            setLoading(false);
            console.log("placement rule data is", response.data)
            const ruleDiv = document.querySelector('.rule-name-div');
            var data=response.data[0].rules
            if (ruleDiv) {
                // Clear existing content
                ruleDiv.innerHTML = '';

                // Create a new ul elementc
                console.log("ul element created")
                const ulElement = document.createElement('ul');

                // Iterate over the data and create li elements
                console.log("data", data)
                data.forEach(rule => {
                    const liElement = document.createElement('li');
                    console.log("li element created") 
                    liElement.textContent = rule;
                    ulElement.appendChild(liElement);
                });

                // Append the ul element to the ruleDiv
                ruleDiv.appendChild(ulElement);
            }
        } catch (error) {
            console.log("got the error while fetching the placement details")
        }
    }

    useEffect(() => {
        getPlacementDetails();
        getStudentDetails();

    }, []);

    useEffect(() => {
        // Update HTML elements here
        setTimeout(() => { updateHTML() }, 1000);
    }, [studentDetail]);


    // useEffect(() => {
    //     // Check if studentDetail exists before logging
    //     if (studentDetail) {
    //         console.log("getting student details like", studentDetail);
    //     }
    // }, [studentDetail]); // Dependency array with studentDetail
    const updateHTML = () => {
        // Update HTML elements based on studentDetail
        if (!studentDetail) {
            // console.error('Caught above Error: studentDetail is null or undefined');
            return;
        }

        const nameElement = document.querySelector('.personal-name');
        if (nameElement) {
            nameElement.textContent = studentDetail.name || 'NA';
        }

        const regNumberElement = document.querySelector('.personal-reg');
        if (regNumberElement) {
            regNumberElement.textContent = studentDetail.registrationNumber || 'NA';
        }

        const emailElement = document.querySelector('.personal-email');
        if (emailElement) {
            emailElement.textContent = studentDetail.email || 'NA';
        }

        const phoneElement = document.querySelector('.personal-phone');
        if (phoneElement) {
            phoneElement.textContent = studentDetail.phoneNumber || 'NA';
        }

        const genderElement = document.querySelector('.personal-gender');
        if (genderElement) {
            genderElement.textContent = studentDetail.gender || 'NA';
        }
        
        const dashboardName = document.querySelector('.dashboardName');
        if (dashboardName) {
            dashboardName.textContent = studentDetail.name || 'NA';
        }

        const dashboardStatus = document.querySelector('.dashboardStatus');
        if (dashboardStatus) {
            dashboardStatus.textContent = studentDetail.status==true?'Approved': 'Rejected';
        }

        const dobElement = document.querySelector('.personal-dob');
        if (dobElement) {
            dobElement.textContent = studentDetail.dob ? studentDetail.dob.substring(0, 10).split('-').reverse().join('-') : 'NA';
        }

        const tagElement = document.querySelector('.personal-tag');
        if (tagElement) {
            tagElement.textContent = studentDetail.tag || 'NA';
        }

        // Similarly, update other elements...

        // Update academic information
        const academicNameDivValue = document.querySelector('.academic-name-div-value');
        if (academicNameDivValue) {
            academicNameDivValue.textContent = studentDetail.name || 'NA';
        }

        const academicRegNameDivValue = document.querySelector('.academic-regName-div-value');
        if (academicRegNameDivValue) {
            academicRegNameDivValue.textContent = studentDetail.registrationNumber || 'NA';
        }

        const academicEmailDivValue = document.querySelector('.academic-email-div-value');
        if (academicEmailDivValue) {
            academicEmailDivValue.textContent = studentDetail.email || 'NA';
        }

        const academicPhoneDivValue = document.querySelector('.academic-phone-div-value');
        if (academicPhoneDivValue) {
            academicPhoneDivValue.textContent = studentDetail.phoneNumber || 'NA';
        }

        const academicGenderDivValue = document.querySelector('.academic-gender-div-value');
        if (academicGenderDivValue) {
            academicGenderDivValue.textContent = studentDetail.gender || 'NA';
        }

        const academicDOBDivValue = document.querySelector('.academic-dob-div-value');
        if (academicDOBDivValue) {
            academicDOBDivValue.textContent = studentDetail.dob ? studentDetail.dob.substring(0, 10).split('-').reverse().join('-') : 'NA';
        }

        const academicTagDivValue = document.querySelector('.academic-tag-div-value');
        if (academicTagDivValue) {
            academicTagDivValue.textContent = studentDetail.tag || 'NA';
        }

        // Update additional information
        const additionalNameDivValue = document.querySelectorAll('.additional-name-div-value');
        if (additionalNameDivValue) {
            additionalNameDivValue.forEach(element => {
                element.textContent = studentDetail.name || 'NA';
            });
        }

        const additionalRegNameDivValue = document.querySelectorAll('.additional-regName-div-value');
        if (additionalRegNameDivValue) {
            additionalRegNameDivValue.forEach(element => {
                element.textContent = studentDetail.registrationNumber || 'NA';
            });
        }

        const additionalEmailDivValue = document.querySelectorAll('.additional-email-div-value');
        if (additionalEmailDivValue) {
            additionalEmailDivValue.forEach(element => {
                element.textContent = studentDetail.email || 'NA';
            });
        }

        const additionalPhoneDivValue = document.querySelectorAll('.additional-phone-div-value');
        if (additionalPhoneDivValue) {
            additionalPhoneDivValue.forEach(element => {
                element.textContent = studentDetail.phoneNumber || 'NA';
            });
        }

        const additionalGenderDivValue = document.querySelectorAll('.additional-gender-div-value');
        if (additionalGenderDivValue) {
            additionalGenderDivValue.forEach(element => {
                element.textContent = studentDetail.gender || 'NA';
            });
        }

        const additionalDOBDivValue = document.querySelectorAll('.additional-dob-div-value');
        if (additionalDOBDivValue) {
            additionalDOBDivValue.forEach(element => {
                element.textContent = studentDetail.dob ? studentDetail.dob.substring(0, 10).split('-').reverse().join('-') : 'NA';
            });
        }

        const additionalTagDivValue = document.querySelectorAll('.additional-tag-div-value');
        if (additionalTagDivValue) {
            additionalTagDivValue.forEach(element => {
                element.textContent = studentDetail.tag || 'NA';
            });
        }

        const additionalAgeDivValue = document.querySelectorAll('.additional-age-div-value');
        if (additionalAgeDivValue) {
            additionalAgeDivValue.forEach(element => {
                element.textContent = studentDetail.age || 'NA';
            });
        }

        const additionalStatusDivValue = document.querySelectorAll('.additional-status-div-value');
        if (additionalStatusDivValue) {
            additionalStatusDivValue.forEach(element => {
                element.textContent = studentDetail.status || 'NA';
            });
        }

        const additionalCGPADivValue = document.querySelectorAll('.additional-cgpa-div-value');
        if (additionalCGPADivValue) {
            additionalCGPADivValue.forEach(element => {
                element.textContent = studentDetail.cgpa || 'NA';
            });
        }

        const additionalTenthMarksDivValue = document.querySelectorAll('.additional-tenth-div-value');
        if (additionalTenthMarksDivValue) {
            additionalTenthMarksDivValue.forEach(element => {
                element.textContent = studentDetail.tenthMarks ? studentDetail.tenthMarks : 'NA';
            });
        }

        const additionalTwelfthMarksDivValue = document.querySelectorAll('.additional-twelfth-div-value');
        if (additionalTwelfthMarksDivValue) {
            additionalTwelfthMarksDivValue.forEach(element => {
                element.textContent = studentDetail.twelfthMarks || 'NA';
            });
        }

        const additionalYearDivValue = document.querySelectorAll('.additional-year-div-value');
        if (additionalYearDivValue) {
            additionalYearDivValue.forEach(element => {
                element.textContent = studentDetail.year || 'NA';
            });
        }

        const additionalBranchDivValue = document.querySelectorAll('.additional-branch-div-value');
        if (additionalBranchDivValue) {
            additionalBranchDivValue.forEach(element => {
                element.textContent = studentDetail.branch ? studentDetail.branch : 'NA';
            });
        }

        const additionalPlacedDivValue = document.querySelectorAll('.additional-placed-div-value');
        if (additionalPlacedDivValue) {
            additionalPlacedDivValue.forEach(element => {
                element.textContent = studentDetail.placed || 'NA';
            });
        }
        const additionalTypeDivValue = document.querySelectorAll('.additional-type-div-value');
        if (additionalTypeDivValue) {
            additionalTypeDivValue.forEach(element => {
                element.textContent = studentDetail.type || 'NA';
            });
        }

        const resumeNameDivKey = document.querySelectorAll('.resume-name-div-key');
        if (resumeNameDivKey) {
            resumeNameDivKey.forEach(element => {
                element.innerHTML = `<b><span style="margin-right: 5px;">${fileDownloadIcon}</span>${studentDetail.name ? studentDetail.name + '_Resume' : 'NA'}</b>`;
            });
        }
        const { file } = studentDetail;

        // Check if the file data exists
        if (file && file.type === 'Buffer' && Array.isArray(file.data)) {
            const resumeDiv = document.querySelector('.resume-name-div-value');

            if (resumeDiv) {
                const binaryData = [
                    37, 80, 68, 70, 45, 49, 46, 52, 10, 37, 226, 227, 207, 211, 10, 50, 32,
                    48, 32, 111, 98, 106, 10, 60, 60, 10, 47, 84, 121, 112, 101, 32, 47, 80,
                    97, 103, 101, 10, 47, 77, 111, 100, 68, 97, 116, 101, 32, 40, 68, 58, 49,
                    54, 48, 51, 48, 54, 48, 52, 48, 56, 43, 48, 51, 39, 48, 48, 39, 41, 10, 47,
                    76, 101, 110, 103, 116, 104, 32, 49, 48, 32, 48, 32, 82, 10, 47, 70, 105,
                    108, 116, 101, 114, 32, 47, 70, 108, 97, 116, 101, 68, 101, 99, 111, 100,
                    101, 10, 62, 62, 10, 115, 116, 114, 101, 97, 109, 10, 120, 121, 122, 10, 101,
                    110, 100, 115, 116, 114, 101, 97, 109, 10, 101, 110, 100, 111, 98, 106, 10,
                    101, 110, 100, 111, 98, 106, 10, 49, 32, 48, 32, 111, 98, 106, 10, 60, 60,
                    47, 84, 121, 112, 101, 32, 47, 70, 111, 110, 116, 10, 47, 83, 117, 98, 116,
                    121, 112, 101, 32, 47, 84, 121, 112, 101, 49, 10, 47, 66, 97, 115, 101, 70,
                    111, 110, 116, 32, 47, 84, 105, 109, 101, 115, 45, 82, 111, 109, 97, 110, 10,
                    62, 62, 10, 101, 110, 100, 111, 98, 106, 10, 101, 110, 100, 111, 98, 106, 10,
                    101, 110, 100, 111, 98, 106, 10, 101, 110, 100, 111, 98, 106, 10
                ];

                // Convert the array of numbers into Uint8Array
                //   const uintArray = new Uint8Array(file.data);
                const uintArray = new Uint8Array(binaryData);

                // Convert the Uint8Array into a Blob
                const blob = new Blob([uintArray], { type: 'application/pdf' });


                // Update the content of the div
                resumeDiv.innerHTML = `
        <button onclick="downloadResume()">Download</button>
      `;

                // Define the downloadResume function
                window.downloadResume = function () {
                    // Create a temporary URL for the Blob
                    const url = URL.createObjectURL(blob);

                    // Create a link element
                    const link = document.createElement('a');
                    link.href = url;

                    // Set the filename for the download
                    link.setAttribute('download', 'resume.pdf');

                    // Append the link to the body and trigger the click event
                    document.body.appendChild(link);
                    link.click();

                    // Clean up
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                };
            }
        }
    };


    return (
        <div className="dashboard">
            <div className="dashboard-background">
                <img src={Background}></img>
            </div>
            <div className="dashboard-details">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="dashboard-details-card">
                        <div className="dashboard-img">
                            <img src={Profile}></img>
                        </div>
                        <div className="dashboard-name-status">
                            <p style={{ fontWeight: "bold", fontSize: "1.7em", margin: '0' }} className="dashboardName">NA</p>
                            <p style={{ color: "green", fontSize: "1.2em", margin: '0' }} className="dashboardStatus">NA</p>
                        </div>
                        <div className="dashboard-personal">
                            <div className="dashboard-personal-head">
                                <div>
                                    Personal Information
                                </div>
                                <div>
                                    <button className="personal-edit" onClick={handlePersonalInfoEditClick}>Edit</button>
                                </div>
                            </div>
                            <div className='dashboard-personal-name personal-div'>
                                <div className="personal-head-name personal-div-left">
                                    <b>Name</b>
                                </div>
                                <div className="personal-name personal-div-right">
                                    NA
                                </div>
                            </div>
                            <div className='dashboard-personal-reg personal-div'>
                                <div className="personal-head-reg personal-div-left">
                                    <b>Reg No.</b>
                                </div>
                                <div className="personal-reg personal-div-right">
                                    NA
                                </div>
                            </div>
                            <div className='dashboard-personal-email personal-div'>
                                <div className="personal-head-email personal-div-left">
                                    <b>Email</b>
                                </div>
                                <div className="personal-email personal-div-right">
                                    NA
                                </div>
                            </div>
                            <div className='dashboard-personal-phone personal-div'>
                                <div className="personal-head-phone personal-div-left">
                                    <b>Phone</b>
                                </div>
                                <div className="personal-phone personal-div-right">
                                    NA
                                </div>
                            </div>
                            <div className='dashboard-personal-gender personal-div'>
                                <div className="personal-head-gender personal-div-left">
                                    <b>Gender</b>
                                </div>
                                <div className="personal-gender personal-div-right">
                                    NA
                                </div>
                            </div>
                            <div className='dashboard-personal-dob personal-div'>
                                <div className="personal-head-dob personal-div-left">
                                    <b>D O B</b>
                                </div>
                                <div className="personal-dob personal-div-right">
                                    NA
                                </div>
                            </div>
                            <div className='dashboard-personal-tag personal-div'>
                                <div className="personal-head-tag personal-div-left">
                                    <b>Tag</b>
                                </div>
                                <div className="personal-tag personal-div-right">
                                    NA
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                <div className="dashboard-details-cap">

                    <div className="details-cap-button-container">
                        {/* <div><button className={selectedButton === 1 ? 'selected' : ''} onClick={() => handleButtonClick(1)}>Academic Information</button></div> */}
                        <div><button className={selectedButton === 2 ? 'selected' : ''} onClick={() => handleButtonClick(2)}>Additional Information</button></div>
                        <div><button className={selectedButton === 3 ? 'selected' : ''} onClick={() => handleButtonClick(3)}>Resume</button></div>
                        <div><button className={selectedButton === 4 ? 'selected' : ''} onClick={() => handleButtonClick(4)}>Account Settings</button></div>
                        <div><button className={selectedButton === 5 ? 'selected' : ''} onClick={() => handleButtonClick(5)}>Placement Rules</button></div>
                    </div>
                    <div className='details-cap-card academic-card' style={{ display: selectedButton === 1 ? 'block' : 'none' }}>
                        <div className='cap-card-header-details'>
                            <div className="cap-card-header-head cap-academic">
                                Academic Information
                            </div>
                            <div>
                                <button className="academic-edit" onClick={handleAcademicInfoEditClick}> Edit</button>
                            </div>
                        </div>
                        <div className='cap-details-container'>
                            <div className='academic-name-div cap-div'>
                                <div className="academic-name-div-key cap-div-left">
                                    <b>Name</b>
                                </div>
                                <div className="academic-name-div-value cap-div-right">
                                    NA
                                </div>
                            </div>

                            <div className='academic-regName-div cap-div'>
                                <div className="academic-regName-div-key cap-div-left">
                                    <b>Reg No.</b>
                                </div>
                                <div className="academic-regName-div-value cap-div-right">
                                    NA
                                </div>
                            </div>

                            <div className='academic-email-div cap-div'>
                                <div className="academic-email-div-key cap-div-left">
                                    <b>Email</b>
                                </div>
                                <div className="academic-email-div-value cap-div-right">
                                    NA
                                </div>
                            </div>

                            <div className='academic-phone-div cap-div'>
                                <div className="academic-phone-div-key cap-div-left">
                                    <b>Phone</b>
                                </div>
                                <div className="academic-phone-div-value cap-div-right">
                                    NA
                                </div>
                            </div>

                            <div className='academic-gender-div cap-div'>
                                <div className="academic-gender-div-key cap-div-left">
                                    <b>Gender</b>
                                </div>
                                <div className="academic-gender-div-value cap-div-right">
                                    NA
                                </div>
                            </div>

                            <div className='academic-dob-div cap-div'>
                                <div className="academic-dob-div-key cap-div-left">
                                    <b>D O B</b>
                                </div>
                                <div className="academic-dob-div-value cap-div-right">
                                    NA
                                </div>
                            </div>

                            <div className='academic-tag-div cap-div'>
                                <div className="academic-tag-div-key cap-div-left">
                                    <b>Tag</b>
                                </div>
                                <div className="academic-tag-div-value cap-div-right">
                                    NA
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='details-cap-card additional-card' style={{ display: selectedButton === 2 ? 'block' : 'none' }}>
                        <div className='cap-card-header-details'>
                            <div className="cap-card-header-head cap-additional">
                                Additional Information
                            </div>
                            <div>
                                <button className="additional-edit" onClick={handleAdditionalInfoEditClick}> Edit</button>
                            </div>
                        </div>
                        <div className='cap-details-container'>
                            <div className='additional-name-div cap-div'>
                                <div className="additional-name-div-key cap-div-left">
                                    <b>Name</b>
                                </div>
                                <div className="additional-name-div-value cap-div-right">
                                    Ajay Singh
                                </div>
                            </div>

                            <div className='additional-regName-div cap-div'>
                                <div className="additional-regName-div-key cap-div-left">
                                    <b>Reg No.</b>
                                </div>
                                <div className="additional-regName-div-value cap-div-right">
                                    20BAI2319
                                </div>
                            </div>

                            <div className='additional-email-div cap-div'>
                                <div className="additional-email-div-key cap-div-left">
                                    <b>Email</b>
                                </div>
                                <div className="additional-email-div-value cap-div-right">
                                    ajay@gmail.com
                                </div>
                            </div>

                            <div className='additional-phone-div cap-div'>
                                <div className="academic-phone-div-key cap-div-left">
                                    <b>Phone</b>
                                </div>
                                <div className="additional-phone-div-value cap-div-right">
                                    4323422434
                                </div>
                            </div>

                            <div className='additional-gender-div cap-div'>
                                <div className="additional-gender-div-key cap-div-left">
                                    <b>Gender</b>
                                </div>
                                <div className="academic-gender-div-value cap-div-right">
                                    Male
                                </div>
                            </div>

                            <div className='additional-dob-div cap-div'>
                                <div className="additional-dob-div-key cap-div-left">
                                    <b>D O B</b>
                                </div>
                                <div className="additional-dob-div-value cap-div-right">
                                    20/12/2003
                                </div>
                            </div>

                            <div className='additional-tag-div cap-div'>
                                <div className="additional-tag-div-key cap-div-left">
                                    <b>Tag</b>
                                </div>
                                <div className="additional-tag-div-value cap-div-right">
                                    Approved
                                </div>
                            </div>
                            <div className='additional-age-div cap-div'>
                                <div className="additional-age-div-key cap-div-left">
                                    <b>Age</b>
                                </div>
                                <div className="additional-age-div-value cap-div-right">
                                    NA
                                </div>
                            </div>

                            <div className='additional-status-div cap-div'>
                                <div className="additional-status-div-key cap-div-left">
                                    <b>Status</b>
                                </div>
                                <div className="additional-status-div-value cap-div-right">
                                    NA
                                </div>
                            </div>

                            <div className='additional-cgpa-div cap-div'>
                                <div className="additional-cgpa-div-key cap-div-left">
                                    <b>CGPA</b>
                                </div>
                                <div className="additional-cgpa-div-value cap-div-right">
                                    NA
                                </div>
                            </div>

                            <div className='additional-tenth-div cap-div'>
                                <div className="additional-tenth-div-key cap-div-left">
                                    <b>Tenth Marks</b>
                                </div>
                                <div className="additional-tenth-div-value cap-div-right">
                                    NA
                                </div>
                            </div>

                            <div className='additional-twelfth-div cap-div'>
                                <div className="additional-twelfth-div-key cap-div-left">
                                    <b>Twelfth Marks</b>
                                </div>
                                <div className="additional-twelfth-div-value cap-div-right">
                                    NA
                                </div>
                            </div>

                            <div className='additional-year-div cap-div'>
                                <div className="additional-year-div-key cap-div-left">
                                    <b>Batch Year</b>
                                </div>
                                <div className="additional-year-div-value cap-div-right">
                                    NA
                                </div>
                            </div>

                            <div className='additional-branch-div cap-div'>
                                <div className="additional-branch-div-key cap-div-left">
                                    <b>Branch</b>
                                </div>
                                <div className="additional-branch-div-value cap-div-right">
                                    NA
                                </div>
                            </div>

                            <div className='additional-placed-div cap-div'>
                                <div className="additional-placed-div-key cap-div-left">
                                    <b>Placed</b>
                                </div>
                                <div className="additional-placed-div-value cap-div-right">
                                    NA
                                </div>
                            </div>

                            <div className='additional-type-div cap-div'>
                                <div className="additional-type-div-key cap-div-left">
                                    <b>Type</b>
                                </div>
                                <div className="additional-type-div-value cap-div-right">
                                    NA
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='details-cap-card resume-card' style={{ display: selectedButton === 3 ? 'block' : 'none' }}>
                        <div className='cap-card-header-details resume-detail-container'>
                            <div className="cap-card-header-head cap-resume">
                                Resume
                            </div>
                            <div>
                                <button className="resume-edit" onClick={handleResumeInfoEditClick}> Edit</button>
                            </div>
                        </div>
                        <div className='resume-name-div cap-div'>
                            <div className="resume-name-div-key cap-div-left">
                                <b><FaFileDownload style={{ marginRight: "30px" }} />Resume</b>
                            </div>
                            <div className="resume-name-div-value">k</div>
                            {/* <div className="resume-name-div-value"><ResumeDownloadButton pdfValue={pdfValue} /></div>    */}
                        </div>
                    </div>
                    <div className='details-cap-card password-card' style={{ display: selectedButton === 4 ? 'block' : 'none' }}>
                        <div className='cap-card-header-details password-detail-container'>
                            <div className="cap-card-header-head cap-resume">
                                Password Management
                            </div>
                        </div>
                        <div className='password-name-div'>
                            <div className="password-name-div-row">
                                <div className="password-name-div-key">
                                    <b>Name</b>
                                </div>
                                <div className="password-name-div-value">
                                    <input type="text" className="current-pass" />
                                </div>
                            </div>
                            <div className="password-name-div-row">
                                <div className="password-name-div-key">
                                    <b>Email</b>
                                </div>
                                <div className="password-name-div-value">
                                    <input type="email" className="current-email" />
                                </div>
                            </div>
                            <div className="password-name-div-row">
                                <div className="password-name-div-key">
                                    <b>Enter Current Password</b>
                                </div>
                                <div className="password-name-div-value">
                                    <input type={showPassword ? "text" : "password"} className="current-password" value={password} onChange={handlePasswordChange} />
                                </div>
                            </div>
                            <label htmlFor="showPassword">
                                <input
                                    type="checkbox"
                                    id="showPassword"
                                    className="current-password"
                                    checked={showPassword}
                                    onChange={handleCheckboxChange}
                                />
                                Show Password
                            </label>
                            <div className="password-name-div-submit">
                                <button className='password-edit'>Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className='details-cap-card rule-card' style={{ display: selectedButton === 5 ? 'block' : 'none' }}>
                        <div className='cap-card-header-details rule-detail-container'>
                            <div className="cap-card-header-head cap-rule">
                                Placement Norms
                            </div>
                        </div>
                        <div className='rule-name-div'>
                            <ul>
                                <li>A student who applies for any job/internship position is bound to go through the entire selection process unless rejected midway by the company.</li>
                                <li>Any student who withdraws deliberately in the midst of a selection process will be considered as a case of absenteeism.</li>
                                <ul>
                                    <li>Absenteeism: A student not attending the PPT, Test, Interview, and any other criterion required by a company after registering and without prior intimation (at least 24 hrs prior to the placement process via email) will be deemed as absent.</li>
                                    <li>Absenteeism anytime will lead to suspension of student account on OCCaP placement portal. The decision of revocation of student account will rest solely with OCCaP.</li>
                                </ul>
                                <li>Students should maintain discipline and decorum in every action they take during the placement process.</li>
                                <li>Any student found violating any rules of general ethics and etiquette as deemed by the company or OCCaP, or defaming the Institute will be debarred from the placement process for the entire placement season.</li>
                                <li>Students found cheating or misbehaving during the selection process (PPT/Test/GD/Interview) will be debarred from the placement process. Any kind of misbehavior by the student will lead to debarment of the student from any further placement activity.</li>
                                <li>During online tests, students should ensure that email or any other communication client (other than the one prescribed by the recruiter) is not active on their laptop during the test.</li>
                                <li>Students are expected to follow the dress code stipulated by OCCaP.</li>
                                <ul>
                                    <li>Students must be formally dressed whenever they participate in any sort of interaction with a company.</li>
                                    <li>Formal clothes for men include a formal shirt and trousers, and leather shoes. Formal clothes for women include either a pair of Salwar-Kameez (no binge) or formal shirt and trousers. Ties and other formal accessories are optional. Accessories deemed unsuitable by OCCaP, such as sunglasses, are strictly prohibited.</li>
                                    <li>OCCaP reserves the right to restrict or prohibit the use of any accessory that it finds improper.</li>
                                    <li>Students, both women and men, are advised to have a business suit available in case a company stipulates that students attend the process suited up. Women are advised to have a saree available as well.</li>
                                    <li>Tee shirts, jeans, casual shirts, caps, and other informal wear are strictly prohibited. Students found violating the dress code will be disallowed from attending the process and treated as absent, as regulated by the rule above.</li>
                                </ul>
                                <li>Students must carry their Institute Identity cards at all times during the placement process.</li>
                                <li>Impersonation will lead to debarment from placement, and further action may be pursued at the Institute level.</li>
                            </ul>
                        </div>
                    </div>
                    {showPersonalInfoForm && <PersonalInfoForm handleClosePersonalInfoForm={handleClosePersonalInfoForm} />}
                    {showAcademicInfoForm && <AcademicInfoForm handleCloseAcademicInfoForm={handleCloseAcademicInfoForm} />}
                    {showAdditionalInfoForm && <AdditionalInfoForm handleCloseAdditionalInfoForm={handleCloseAdditionalInfoForm} />}
                    {showResumeInfoForm && <ResumeInfoForm handleCloseResumeInfoForm={handleCloseResumeInfoForm} />}
                </div>
            </div>

        </div>
    )
};

export default Dashboard;
