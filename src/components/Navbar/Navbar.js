import React, { useState } from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';
import { GiHamburger } from "react-icons/gi";
import { GiHamburgerMenu } from "react-icons/gi";
import BrandName from '../BrandName/BrandName';
import ProfileIcon from '../../Img/profile-icon.jpg'

const Navbar = () => {
  const [showPages, setShowPages] = useState(false);
  const [showDropdown, setShowDropdown]= useState(false);

  const toggleDropDown=()=>{
    setShowDropdown(!showDropdown);
  };

  const togglePages = () => {
    setShowPages(!showPages);
  };

  return (
    <nav className="navbar">
      <div className="brand"><BrandName/></div>
      <div className="navbar-links">
        <ul className={`pages ${showPages ? 'show' : ''}`}>
          <li><Link to="dashboard">Dashboard</Link></li>
          <li>Drops</li>
          <li>< Link to="job">JobBoard</Link></li>
          {/* <li><Link to="job">sdsd</Link></li> */}
          <li>Calender</li>
          <li>About us</li>
          {/* Add more page options */}
        </ul>
        <div className="profile-option profile-icon" onClick={toggleDropDown}>
          <img  className="profile-pic" src={ProfileIcon}></img>
        </div>
        {!showPages && showDropdown && (
          <div className="dropdown">
              <ul>
                <li>Dashboard</li>
                <li>Logout</li>
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
