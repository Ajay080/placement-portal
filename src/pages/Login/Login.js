import React, { useContext, useState } from 'react';
import './Login.css'
import axios from 'axios';
import Background from '../../Img/LoginBg.jpg'
import { Link, useNavigate } from 'react-router-dom';
// import AuthProvider, { AuthContext } from '../../AuthProvider';


const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registration, setRegistration] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // New state for phone number
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('student'); // New state for role

    const[SignUpL,setSignUpL]= useState(true);
    const navigate = useNavigate(); // Move useNavigate inside the functional component

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleRegistrationChange = (e) => {
        setRegistration(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    


    const handleSubmit = async (e) => {
        /* eslint-disable */
        e.preventDefault();
        
        // Basic validation
        if (!email || !password) {
            alert("Email and password are required!");
            return;
        }
        
        if (SignUpL) {
            if (!name) {
                alert("Name is required for signup!");
                return;
            }
            if (role === 'student' && (!registration || !phoneNumber)) {
                alert("Registration number and phone number are required for student signup!");
                return;
            }
            if (role !== 'student' && !phoneNumber) {
                alert("Phone number is required for signup!");
                return;
            }
        }
        
        let apiEndPoint = '';
        let data = {};

        // Determine API endpoint and data based on signup/login and role
        if (SignUpL) { // Signup
            if (role === 'student') {
                apiEndPoint = 'http://localhost:8001/addStudent';
                data = {
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                    registrationNumber: registration,
                    phoneNumber: phoneNumber
                };
            } else if (role === 'user' || role === 'admin') {
                apiEndPoint = 'http://localhost:8001/users/signup';
                data = {
                    name: name,
                    email: email,
                    password: password,
                    role: role
                };
            }
        } else { // Login
            if (role === 'student') {
                apiEndPoint = 'http://localhost:8001/students/login';
                data = {
                    email: email,
                    password: password
                };
            } else if (role === 'user' || role === 'admin') {
                apiEndPoint = 'http://localhost:8001/users/login';
                data = {
                    email: email,
                    password: password
                };
            }
        }

        try {
            const response = await axios.post(apiEndPoint, data);
            console.log("Response:", response.data);
            
            // Clear and set user data in localStorage
            localStorage.removeItem('userData');
            localStorage.setItem('userData', JSON.stringify(response.data));
            
            // Navigate based on role
            if (role === 'admin') {
                navigate('/admin'); // Assuming you have an admin route
            } else {
                navigate('/drop');
            }
        } catch (error) {
            console.log("Error:", error);
            
            let errorMessage = "Login/Signup failed. Please check your credentials.";
            
            if (error.response && error.response.data) {
                // Handle specific MongoDB duplicate key error
                if (error.response.data.code === 11000) {
                    if (error.response.data.keyPattern.phoneNumber) {
                        errorMessage = "This phone number is already registered. Please use a different phone number.";
                    } else if (error.response.data.keyPattern.email) {
                        errorMessage = "This email is already registered. Please use a different email or try logging in.";
                    } else {
                        errorMessage = "This information is already registered. Please check your details.";
                    }
                } else if (error.response.data.error) {
                    errorMessage = error.response.data.error;
                }
            }
            
            alert(errorMessage);
        }
        /* eslint-enable */
    };
    

    return (
        <div className="loginSignup">
            <div className='login'>
                <div className='login-left'>
                    <img src={Background} alt="Background" />
                </div>
                <div className='login-right'>
                    <div className='login-head'>
                        <br />
                        Career Development and Placement Portal
                    </div>
                    <div className='login-form'>
                        <div className='login-name-div'>
                            {SignUpL && (
                                <div className="login-name-div-row">
                                    <div className="login-name-div-key">
                                        <b>Name</b>
                                    </div>
                                    <div className="login-name-div-value">
                                        <input type="text" className="current-pass" onChange={handleNameChange} />
                                    </div>
                                </div>
                            )}
                            <div className="login-name-div-row">
                                <div className="login-name-div-key">
                                    <b>Role</b>
                                </div>
                                <div className="login-name-div-value">
                                    <select className="current-pass" value={role} onChange={handleRoleChange}>
                                        <option value="student">Student</option>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="login-name-div-row">
                                <div className="login-name-div-key">
                                    <b>Email</b>
                                </div>
                                <div className="login-name-div-value">
                                    <input type="email" className="current-email" onChange={handleEmailChange} />
                                </div>
                            </div>
                            {(SignUpL && role === 'student') && (
                                <div className="login-name-div-row">
                                    <div className="login-name-div-key">
                                        <b>Registration Number</b>
                                    </div>
                                    <div className="login-name-div-value">
                                        <input type="text" className="current-registration" onChange={handleRegistrationChange} />
                                    </div>
                                </div>
                            )}
                            {SignUpL && (
                                <div className="login-name-div-row">
                                    <div className="login-name-div-key">
                                        <b>Phone Number</b>
                                    </div>
                                    <div className="login-name-div-value">
                                        <input type="tel" className="current-phone" onChange={handlePhoneNumberChange} />
                                    </div>
                                </div>
                            )}
                            <div className="login-name-div-row">
                                <div className="login-name-div-key">
                                    <b>Password</b>
                                </div>
                                <div className="login-name-div-value">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="current-login"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                            </div>
                            <label htmlFor="showPassword">
                                <input
                                    type="checkbox"
                                    id="showPassword"
                                    checked={showPassword}
                                    onChange={handleCheckboxChange}
                                />
                                Show Password
                            </label>
                            <div className="login-name-div-submit">
                                <button className='login-current-pass' onClick={handleSubmit}>Submit</button>
                                <button className='set-sign-up' onClick={()=>setSignUpL(!SignUpL)}>{SignUpL==true?"Login":"Sign Up"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
