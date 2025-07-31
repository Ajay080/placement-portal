import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { GiHamburger } from "react-icons/gi";
import { GiHamburgerMenu } from "react-icons/gi";
import BrandName from '../BrandName/BrandName';
import ProfileIcon from '../../Img/user.png'

const Navbar = () => {
  const [showPages, setShowPages] = useState(false);
  const [activeButton, setActiveButton] = useState('dashboard');
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropDown = () => {
    setShowDropdown(!showDropdown);
  };

  const togglePages = () => {
    setShowPages(!showPages);
  };

  const handleButtonClick = (page) => {
    setActiveButton(page);
  };

  const storedData = localStorage.getItem('userData');
  if (!storedData) return;
  var parsedData = JSON.parse(storedData);
  console.log("stored json data is",parsedData); // Output: { name: 'John', age: 30 }
  var student_role='';
  if (!parsedData) {
    student_role = 'admin';
  } else {
    if (!parsedData.newStudent || !parsedData.newStudent.role) {
      student_role = 'admin';
    } else {
      student_role = parsedData.newStudent.role;
    }
  }
  

  return (
    <nav className="navbar">
      <div className="brand"><BrandName /></div>
      <div className="navbar-links">
        <ul className={`pages ${showPages ? 'show' : ''}`}>
          <li className={activeButton === 'dashboard' ? 'active' : ''} onClick={() => handleButtonClick('dashboard')}><Link to="dashboard">Dashboard</Link></li>
          <li className={activeButton === 'drop' ? 'active' : ''} onClick={() => handleButtonClick('drop')}><Link to="drop">Drops</Link></li>
          <li className={activeButton === 'job' ? 'active' : ''} onClick={() => handleButtonClick('job')}><Link to="job">JobBoard</Link></li>
          <li className={activeButton === 'calendar' ? 'active' : ''} onClick={() => handleButtonClick('calendar')}><Link to="calendar">Interviews</Link></li>
          <li className={activeButton === 'about' ? 'active' : ''} onClick={() => handleButtonClick('about')}><Link to="about">About us</Link></li>
          {student_role !== 'student' && (
          <li className={activeButton === 'admin' ? 'active' : ''} onClick={() => handleButtonClick('admin')}>
            <Link to="/admin">Admin</Link>
          </li>)}          
        <li className="LogoutNav"><Link to="/">Logout</Link></li>
        </ul>
        <div className="profile-option profile-icon" onClick={toggleDropDown}>
          <img className="profile-pic" src={ProfileIcon}></img>
        </div>
        {!showPages && showDropdown && (
          <div className="dropdown">
            <ul>
              <li><Link to='dashboard'>Dashboard</Link></li>
              <li><Link to='login'>Logout</Link></li>
            </ul>
          </div>
        )

        }
        <div className="hamburger-menu" onClick={togglePages}>
          <div className="HamBurger">{showPages ? <GiHamburgerMenu /> : <GiHamburger />}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
