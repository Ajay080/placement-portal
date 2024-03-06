import './Dashboard.css'
import Background from '../../Img/background-bg.jpg'
import Profile from '../../Img/profile-icon.jpg'
import React, { useState } from 'react';
import ResumeDownloadButton from '../../components/ResumeDownloadButton/ResumeDownloadButton'; // Importing the ResumeDownloadButton component
import { FaFileDownload } from "react-icons/fa";
import PasswordInput from '../../components/PasswordInput/PasswordInput'; // Importing the PasswordInput component
import PersonalInfoForm from './PersonalInfoForm'; // Corrected import
import AcademicInfoForm from './AcademicInfoForm';
import AdditionalInfoForm from './AdditionalInfoForm';
import ResumeInfoForm from './ResumeInfoForm';


const Dashboard = (props) => {
    const [selectedButton, setSelectedButton] = useState(1);

    const handleButtonClick = (buttonId) => {
      setSelectedButton(buttonId);
    };
    const pdfValue = 'Your PDF value goes here...';


    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

  
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

  return (
    <div className="dashboard">
        <div className="dashboard-background">
            <img src={Background}></img>
        </div>
        <div className="dashboard-details">
            <div className="dashboard-details-card">
                <div className="dashboard-img">
                    <img src={Profile}></img>
                </div>
                <div className="dashboard-name-status">
                    <p style={{fontWeight: "bold", fontSize: "1.7em", margin:'0'}}>Ajay Singh</p>
                    <p style={{color: "green", fontSize: "1.2em", margin:'0'}}>Approved</p>
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
                            Ajay
                        </div>
                    </div>
                    <div className='dashboard-personal-reg personal-div'>
                        <div className="personal-head-reg personal-div-left">
                            <b>Reg No.</b>
                        </div>
                        <div className="personal-reg personal-div-right">
                            20BAI2319
                        </div>
                    </div>
                    <div className='dashboard-personal-email personal-div'>
                        <div className="personal-head-email personal-div-left">
                            <b>Email</b>
                        </div>
                        <div className="personal-email personal-div-right">
                            anakie@gmail.com
                        </div>
                    </div>
                    <div className='dashboard-personal-phone personal-div'>
                        <div className="personal-head-phone personal-div-left">
                            <b>Phone</b>
                        </div>
                        <div className="personal-phone personal-div-right">
                            3247724323                            
                        </div>
                    </div>
                    <div className='dashboard-personal-gender personal-div'>
                        <div className="personal-head-gender personal-div-left">
                            <b>Gender</b>
                        </div>
                        <div className="personal-gender personal-div-right">
                            Male
                        </div>
                    </div>
                    <div className='dashboard-personal-dob personal-div'>
                        <div className="personal-head-dob personal-div-left">
                        <b>D O B</b>
                        </div>
                        <div className="personal-dob personal-div-right">
                            08-06-02
                        </div>
                    </div>
                    <div className='dashboard-personal-tag personal-div'>
                        <div className="personal-head-tag personal-div-left">
                            <b>Tag</b>
                        </div>
                        <div className="personal-tag personal-div-right">
                            None
                        </div>
                    </div>
                </div>

            </div>
            <div className="dashboard-details-cap">
 
                <div className="details-cap-button-container">
                    <div><button className={selectedButton === 1 ? 'selected' : ''} onClick={() => handleButtonClick(1)}>Academic Information</button></div>
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
                                    Ajay Singh
                                </div>
                            </div>

                            <div className='academic-regName-div cap-div'>
                                <div className="academic-regName-div-key cap-div-left">
                                    <b>Reg No.</b>
                                </div>
                                <div className="academic-regName-div-value cap-div-right">
                                    20BAI2319
                                </div>
                            </div>

                            <div className='academic-email-div cap-div'>
                                <div className="academic-email-div-key cap-div-left">
                                    <b>Email</b>
                                </div>
                                <div className="academic-email-div-value cap-div-right">
                                    ajay@gmail.com
                                </div>
                            </div>

                            <div className='academic-phone-div cap-div'>
                                <div className="academic-phone-div-key cap-div-left">
                                    <b>Phone</b>
                                </div>
                                <div className="academic-phone-div-value cap-div-right">
                                    4323422434
                                </div>
                            </div>

                            <div className='academic-gender-div cap-div'>
                                <div className="academic-gender-div-key cap-div-left">
                                    <b>Gender</b>
                                </div>
                                <div className="academic-gender-div-value cap-div-right">
                                    Male
                                </div>
                            </div>

                            <div className='academic-dob-div cap-div'>
                                <div className="academic-dob-div-key cap-div-left">
                                    <b>D O B</b>
                                </div>
                                <div className="academic-dob-div-value cap-div-right">
                                    20/12/2003
                                </div>
                            </div>

                            <div className='academic-tag-div cap-div'>
                                <div className="academic-tag-div-key cap-div-left">
                                    <b>Tag</b>
                                </div>
                                <div className="academic-tag-div-value cap-div-right">
                                    Approved
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
                            <b><FaFileDownload style={{marginRight:"30px"}}/>AjaySingh_BAI_Resume</b>
                        </div>
                        <ResumeDownloadButton pdfValue={pdfValue} />
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
                                <input type="text" className="current-pass"/>
                            </div>
                        </div>
                        <div className="password-name-div-row">
                            <div className="password-name-div-key">
                                <b>Email</b>
                            </div>
                            <div className="password-name-div-value">
                                <input type="email" className="current-email"/>
                            </div>
                        </div>
                        <div className="password-name-div-row">
                            <div className="password-name-div-key">
                                <b>Enter Current Password</b>
                            </div>
                            <div className="password-name-div-value">
                                <input type="password" className="current-password" value={password} onChange={handlePasswordChange}/>
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
