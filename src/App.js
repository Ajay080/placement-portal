import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css'
import Job from './pages/Job/Job';
import Dashboard from './pages/Dashboard/Dashboard';
import Calendar from './pages/Calendar/Calendar';
import Drop from './pages/Drop/Drop';
 
function App(){
  return (
    <Router>
        <div className="App">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Job/>} />
            <Route path='/job' element={<Job/>} />
            <Route path ='/dashboard' element={<Dashboard/>}/>
            <Route path ='/calendar' element={<Calendar/>}/>
            <Route path ='/drop' element={<Drop/>}/>
          </Routes>
        </div>
    </Router>
  );
}

export default App;
