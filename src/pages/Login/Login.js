import React, { useState } from 'react';
import './Login.css'
import Background from '../../Img/LoginBg.jpg'
import {Link} from 'react-router-dom';

const Login = () => {
    const [login, setLogin] = useState('');
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    };
  
    const handleCheckboxChange = () => {
        setShowLogin(!showLogin);
    };

    return (
        <div className="loginSignup">
            <div className='login'>
                <div className='login-left'>
                    <img src={Background} alt="Background" />
                </div>
                <div className='login-right'>
                    <div className='login-head'>
                        <br/>
                        Career Development and Placement Portal
                    </div>
                    <div className='login-form'>
                        <div className='login-name-div'>
                            <div className="login-name-div-row">
                                <div className="login-name-div-key">
                                    <b>Name</b>
                                </div>
                                <div className="login-name-div-value">
                                    <input type="text" className="current-pass"/>
                                </div>
                            </div>
                            <div className="login-name-div-row">
                                <div className="login-name-div-key">
                                    <b>Email</b>
                                </div>
                                <div className="login-name-div-value">
                                    <input type="email" className="current-email"/>
                                </div>
                            </div>
                            <div className="login-name-div-row">
                                <div className="login-name-div-key">
                                    <b>Enter Current Password</b>
                                </div>
                                <div className="login-name-div-value">
                                    <input
                                        type={showLogin ? "text" : "password"}
                                        className="current-login"
                                        value={login}
                                        onChange={handleLoginChange}
                                    />
                                </div>
                            </div>
                            <label htmlFor="showLogin">
                                <input
                                    type="checkbox"
                                    id="showLogin"
                                    checked={showLogin}
                                    onChange={handleCheckboxChange}
                                />
                                Show Password
                            </label>
                            <div className="login-name-div-submit">
                                <Link to='/drop'><button className='login-current-pass'>Submit</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
