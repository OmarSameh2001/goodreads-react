// import React from 'react'
// import { Document, Page } from 'react-pdf/dist/entry.webpack';
// import { useState, useEffect  } from "react";
// // pdfjs.GlobalWorkerOptions.workerSrc = '/path/to/pdf.worker.min.js';
// // Use a reliable CDN for pdf.js worker
// // import { pdfjsWorker } from "pdfjs-dist";
// // pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// // // pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;
// // pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;
// function PdfViwer({pdf}) {
//     const [numPages, setNumPages] = useState(null);
//     const [pageNumber, setPageNumber] = useState(1);
  
//   // Convert Google Drive URL to embeddable preview link
// //   const convertGoogleDriveUrl = (url) => {
// //     const fileId = url.split('/d/')[1]?.split('/')[0];
// //     return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null;
// //   };


//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   }
//     // const nextPage = () => {
//     //     if (pageNumber < numPages) {
//     //         setPageNumber(pageNumber + 1);
//     //     }
//     // }
//     // const prevPage = () => {
//     //     if (pageNumber > 1) {
//     //         setPageNumber(pageNumber - 1);
//     //     }
//     // }   
//     const pdfUrl = convertGoogleDriveUrl(pdf); 
//   return (
// <div>
//             <div className="d-flex justify-content-center">
//                 <button className="btn btn-primary" onClick={prevPage} disabled={pageNumber === 1}>
//                     Previous
//                 </button>
//                 <button className="btn btn-primary" onClick={nextPage} disabled={pageNumber === numPages}>
//                     Next
//                 </button>
//             </div>

//             {pdfUrl && (
//                 <div className="d-flex justify-content-center">
//                     <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} onContextMenu={(e) => e.preventDefault()}>
//                         <Page pageNumber={pageNumber} />
//                     </Document>
//                 </div>
//             )}
//         </div>
//   )
// }

// export default PdfViwer
/////////////////////////////////////


// import React from 'react'
// import { Document,Page } from 'react-pdf';
// import { useState, useEffect  } from "react";
// export default function PdfViwer() {
//     const [numPages, setNumPages] = useState(null);
//     const [pageNumber, setPageNumber] = useState(1);
  
//     function onDocumentLoadSuccess({numPages}){
//       setNumPages(numPages);
//       setPageNumber(1);
//     }
  
//     function changePage(offSet){
//       setPageNumber(prevPageNumber => prevPageNumber + offSet);
//     }
  
//     function changePageBack(){
//       changePage(-1)
//     }
  
//     function changePageNext(){
//       changePage(+1)
//     }
  
//     return (
//       <div className="App">
//         <header className="App-header">
//           <Document file="/sample.pdf" onLoadSuccess={onDocumentLoadSuccess}>
//             <Page height="600" pageNumber={pageNumber} />
//           </Document>
//           <p> Page {pageNumber} of {numPages}</p>
//           { pageNumber > 1 && 
//           <button onClick={changePageBack}>Previous Page</button>
//           }
//           {
//             pageNumber < numPages &&
//             <button onClick={changePageNext}>Next Page</button>
//           }
//         </header>
//         <center>
//           <div>
//             <Document file="../file/kids.pdf" onLoadSuccess={onDocumentLoadSuccess}>
//               {Array.from(
//                 new Array(numPages),
//                 (el,index) => (
//                   <Page 
//                     key={`page_${index+1}`}
//                     pageNumber={index+1}
//                   />
//                 )
//               )}
//             </Document>
//           </div>
//         </center>
//       </div>
//     );
// }
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import * as pdfWorker from "pdfjs-dist/build/pdf.worker.entry";

// 🛠 Set the correct worker path
// pdfjs.GlobalWorkerOptions.workerSrc = URL.createObjectURL(
//   new Blob([pdfWorker], { type: "application/javascript" })
// );
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
export default function PdfViwer({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  return (
    <div className="pdf-container">
      <h2>PDF Viewer</h2>
      {pdfUrl ? (
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page height={600} pageNumber={pageNumber} />
        </Document>
      ) : (
        <p>No PDF specified</p>
      )}

      {numPages && (
        <div className="pagination-buttons">
          {pageNumber > 1 && <button onClick={() => changePage(-1)}>Previous</button>}
          {pageNumber < numPages && <button onClick={() => changePage(1)}>Next</button>}
        </div>
      )}
    </div>
  );
}

