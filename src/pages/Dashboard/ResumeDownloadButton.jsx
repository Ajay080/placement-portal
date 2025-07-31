import React from 'react';

const ResumeDownloadButton = ({ pdfValue }) => {
  const downloadResume = () => {
    // Convert the binary data to a Blob
    const blob = new Blob([pdfValue], { type: 'application/pdf' });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');
    link.href = url;

    // Set the filename for the download
    link.setAttribute('download', 'resume.pdf');

    // Append the link to the body and trigger the click event
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={downloadResume}>Download</button>
  );
};

export default ResumeDownloadButton;
