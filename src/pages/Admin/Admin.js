import React, { useState, useEffect, useRef } from 'react';
import './Admin.css';
import $ from 'jquery';
import 'datatables.net'; // Import DataTables library
import EditStudentDetails from './EditStudentDetails';
import EditPlacementDetails from './EditPlacementDetails'

const Admin = () => {
    const [selectedButton, setSelectedButton] = useState(0);
    const [tableData, setTableData] = useState([
        { id: 1, registrationNo: '1', email: 'john@example.com', phone: '123-456-7890', gender: 'Male', dob: '1990-01-01', status: 'Approved', resume: 'resume1.pdf' },
        { id: 2, registrationNo: '2', email: 'jane@example.com', phone: '987-654-3210', gender: 'Female', dob: '1992-05-15', status: 'Rejected', resume: 'resume2.pdf' },
        { id: 3, registrationNo: '3', email: 'alice@example.com', phone: '555-555-5555', gender: 'Female', dob: '1988-10-20', status: 'Approved', resume: 'resume3.pdf' },
        // Add more rows as needed
    ]);

    const tableRef = useRef(null);

    useEffect(() => {
        if (tableRef.current) {
            $(tableRef.current).DataTable({
                "autoWidth": true, // Automatically adjust column widths
                "columnDefs": [
                    { "width": "auto", "targets": "_all" } // Set all columns to auto width
                ]
            });
        }
    }, [tableData]);

    const handleButtonClick = (buttonId) => {
        setSelectedButton(buttonId);
        if(buttonId==1) setStudentFormOpen(true)
        if(buttonId==2) setPlacementFormOpen(true)
    };

    const handleDownloadResume = (resumeFilename) => {
        // Implement logic to download the resume PDF
        console.log('Downloading resume:', resumeFilename);
    };

    const [StudentFormOpen, setStudentFormOpen] = useState(true);

    const handleCloseStudentInfoForm = () => {
      setStudentFormOpen(false);
    };

    const [PlacementFormOpen, setPlacementFormOpen] = useState(true);

    const handleClosePlacementInfoForm = () => {
      setPlacementFormOpen(false);
    };

    return (
        <div>
            <div className="Buttons">
                <div><button className={selectedButton === 1 ? 'selected' : ''} onClick={() => handleButtonClick(1)}>Edit Student Details</button></div>
                <div><button className={selectedButton === 2 ? 'selected' : ''} onClick={() => handleButtonClick(2)}>Edit Placement rules</button></div>
                <div><button className={selectedButton === 3 ? 'selected' : ''} onClick={() => handleButtonClick(3)}>Resume</button></div>
                <div><button className={selectedButton === 4 ? 'selected' : ''} onClick={() => handleButtonClick(4)}>Account Settings</button></div>
                <div><button className={selectedButton === 5 ? 'selected' : ''} onClick={() => handleButtonClick(5)}>Placement Rules</button></div>
            </div>
            {selectedButton === 1 && StudentFormOpen && <EditStudentDetails handleCloseStudentInfoForm={handleCloseStudentInfoForm} />}
            {selectedButton === 2 && PlacementFormOpen && <EditPlacementDetails handleClosePlacementInfoForm={handleClosePlacementInfoForm} />}
            <div className="admin_power">
                <div className='TableContainer'>
                    <table ref={tableRef} className='DataTable'>
                        <thead>
                            <tr>
                                <th></th> {/* Empty column for radio buttons */}
                                <th>Registration No</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>DOB</th>
                                <th>Status</th>
                                <th>Resume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((rowData, rowIndex) => (
                                <tr key={rowData.id}>
                                    <td><input type="radio" name="selectedRow" value={rowData.id} /></td>
                                    <td>{rowData.registrationNo}</td>
                                    <td>{rowData.email}</td>
                                    <td>{rowData.phone}</td>
                                    <td>{rowData.gender}</td>
                                    <td>{rowData.dob}</td>
                                    <td>{rowData.status}</td>
                                    <td><button onClick={() => handleDownloadResume(rowData.resume)}>Download PDF</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin;
