import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css'
import Job from './pages/Job/Job';
function App(){
  return (
    <Router>
        <div className="App">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Job/>} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
