import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Job from './pages/Job/Job';
import Dashboard from './pages/Dashboard/Dashboard';
import Calendar from './pages/Calendar/Calendar';
import Drop from './pages/Drop/Drop';
import About from './pages/About/About';
import Login from './pages/Login/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<WithNavbarRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

function WithNavbarRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/job" element={<Job />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/drop" element={<Drop />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
