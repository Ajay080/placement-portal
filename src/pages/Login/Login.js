import React, { useState } from 'react';
import './Login.css'
// import Background from '../../Img/background-bg.jpg'
import Background from '../../Img/LoginBg.jpg'
import {Link} from 'react-router-dom';


const Login = () => {
    const [login, setlogin] = useState('');
    const [showlogin, setShowlogin] = useState(false);

  
    const handleloginChange = (e) => {
      setlogin(e.target.value);
    };
  
    const handleCheckboxChange = () => {
      setShowlogin(!showlogin);
    };

  return (
    <div className="loginSignup">
        <div className='login'>
            <div className='login-left'>
                <img src={Background}></img>
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
                                <input type="login" className="current-login" value={login} onChange={handleloginChange}/>
                            </div>
                        </div>
                        <label htmlFor="showlogin">
                                <input
                                type="checkbox"
                                id="showlogin"
                                className="current-login"
                                checked={showlogin}
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
  )
}

export default Login