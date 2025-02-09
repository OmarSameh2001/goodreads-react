import React from 'react';
import './BookViewer.css';
const BookViewer = ({ pdfUrl }) => {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <iframe
        src={`${pdfUrl}`}
        width="100%"
        height="100%"
        title="PDF Viewer"
      />
    </div>
  );
};

export default BookViewer;
