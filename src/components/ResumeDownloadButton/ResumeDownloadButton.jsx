import React from 'react';
// import './styles.css'; // Assuming this is your CSS file with the provided styles

function ResumeDownloadButton({ pdfValue }) {
  const handleDownload = () => {
    // Creating a blob from the provided PDF value
    const blob = new Blob([pdfValue], { type: 'application/pdf' });
    
    // Creating a temporary anchor element
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    
    // Setting the download attribute and filename
    a.download = 'resume.pdf';
    
    // Triggering the click event to start download
    a.click();
    
    // Removing the temporary anchor element
    window.URL.revokeObjectURL(a.href);
  };

  return (
    <div className="resume-name-div-value cap-div-right">
      <button className="resumeDownload" style={{ backgroundColor: "black",padding:"10px 20px", color: "white", fontWeight:"bolder", borderRadius: "10px" }} onClick={handleDownload}>Download</button>
    </div>
  );
}

export default ResumeDownloadButton;
