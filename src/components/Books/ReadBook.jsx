import { useState, useEffect, useRef } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Worker,Viewer } from "@react-pdf-viewer/core";
import axiosInstance from "../../apis/config"; 
import { CircularProgress, Button, Typography ,Box, IconButton} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";



//import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@@4.8.69/build/pdf.worker.min.js`;

//pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

export default function ReadBook({ pdfUrl }) {
  //const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(true); 
  const [totalPages, setTotalPages] = useState(0); 
  const [currentPage, setCurrentPage] = useState(1);



  // useEffect(() => {
  //   const fetchBook = async () => {
  //     try {
  //       const response = await axiosInstance.get(`/books/${bookId}`);
  //       setPdfUrl(response.data.pdfLink); // Store the embedded PDF link
  //     } catch (error) {
  //       console.error("Error fetching book:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBook();
  // }, [bookId]);


  // function handlePdfUpload(e) {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   if (file.type !== "application/pdf") {
  //     alert("Please upload a valid PDF file.");
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setPdfUrl(reader.result); 
  //   };

  //   reader.readAsDataURL(file);
  // }
  

  // const handlePageChange = (newPage) => {
  //   if (newPage >= 1 && newPage <= totalPages) {
  //     setCurrentPage(newPage);
  //   }
  // };

  // const onLoadSuccess = ({ numPages }) => {
  //   setTotalPages(numPages);
  // };

  return (

    // <div style={{ textAlign: "center", padding: "20px" }}>
    //   <Typography variant="h4" gutterBottom>
    //     Read Book
    //   </Typography>

    //   {loading ? (
    //     <CircularProgress />
    //   ) : pdfUrl ? (
    //     <div style={{ width: "80%", margin: "auto", height: "600px", border: "1px solid #ccc" }}>
    //       <Typography variant="h6" gutterBottom>
    //         Book Preview
    //       </Typography>
    //       <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
    //         <Viewer fileUrl={pdfUrl} />
    //       </Worker>
    //     </div>
    //   ) : (
    //     <Typography variant="h6" color="error">
    //       No PDF available for this book.
    //     </Typography>
    //   )}

    //   {/* Button to open the PDF in a new tab */}
    //   {pdfUrl && (
    //     <Button
    //       variant="contained"
    //       color="primary"
    //       sx={{ marginTop: "20px" }}
    //       onClick={() => window.open(pdfUrl, "_blank")}
    //     >
    //       Open PDF in New Tab
    //     </Button>
    //   )}
    // </div>
  /////////////////////////////////////////////////////////////////////////
  
    // <div>
    //   <h3>Upload PDF</h3>
    //   <input type="file" accept="application/pdf" onChange={handlePdfUpload} />

    //   {/* Show PDF Viewer only when PDF is uploaded */}
    //   {pdfUrl && (
    //     <div style={{ marginTop: 20, height: "600px" }}>
    //       <h3>PDF Preview</h3>
    //       <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
    //         {/* Use pageIndex for current page */}
    //         <Viewer
    //           fileUrl={pdfUrl}
    //           onLoadSuccess={onLoadSuccess}
    //           pageIndex={currentPage - 1} // Adjust for 0-based page index
    //         />
    //       </Worker>

    //       {/* Pagination Controls */}
    //       <div style={{ marginTop: 10 }}>
    //         <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
    //           Previous
    //         </button>
    //         <span> Page {currentPage} of {totalPages} </span>
    //         <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
    //           Next
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <Box sx={{ textAlign: "center", padding: "20px" }}>
    <Typography variant="h4" gutterBottom>
      Read Book
    </Typography>

    {!pdfUrl ? (
      <Typography variant="h6" color="error">
        No PDF available for this book.
      </Typography>
    ) : pdfUrl.includes("drive.google.com") ? (
      // If the PDF is hosted on Google Drive
      <Box sx={{ width: "80%", margin: "auto", height: "600px", border: "1px solid #ccc" }}>
        <Typography variant="h6" gutterBottom>
          Book Preview
        </Typography>
        <iframe 
          src={pdfUrl}
          width="100%"
          height="100%"
          allow="autoplay"
          title="PDF Preview"
          style={{ border: "none" }}
        />
      </Box>
    ) : (
      // If the PDF is a direct file URL
      <Box sx={{ width: "80%", margin: "auto", height: "600px", border: "1px solid #ccc" }}>
        <Typography variant="h6" gutterBottom>
          Book Preview
        </Typography>
        <embed src={pdfUrl} width="100%" height="100%" type="application/pdf" />
      </Box>
    )}

    {/* Button to open the PDF in a new tab */}
    {pdfUrl && (
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: "20px" }}
        onClick={() => window.open(pdfUrl, "_blank")}
      >
        Open PDF in New Tab
      </Button>
    )}
  </Box>

  );
}


//////////////////////////////////////////////////
// import React, { useState } from "react";
// import { Document, Page } from "react-pdf";
// import "@react-pdf-viewer/core/lib/styles/index.css"; 
//  import { Worker,Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
//  import { PDFDocument } from 'pdf-lib';

// export default function ReadBook() {
//   const [pdfUrl, setPdfUrl] = useState(""); // Store the URL of the PDF
//   const [totalPages, setTotalPages] = useState(0); // Total number of pages in the PDF
//   const [currentPage, setCurrentPage] = useState(1); // Current page number
//   const [pages, setPages] = useState([]);
//   // Handle PDF upload
//   function handlePdfUpload(e) {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.type !== "application/pdf") {
//       alert("Please upload a valid PDF file.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPdfUrl(reader.result); // Store the uploaded PDF as base64 or blob URL
//     };

//     reader.readAsDataURL(file);
//   }

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   // Set the total pages after PDF is loaded
//   const onLoadSuccess = ({ numPages }) => {
//     setTotalPages(numPages);
//   };

//   const splitPdf = async (arrayBuffer) => {
//     const pdfDoc = await PDFDocument.load(arrayBuffer);
//     const totalPages = pdfDoc.getPages().length;
//     const pagesArray = [];

//     // Extract each page and store it in the `pagesArray`
//     for (let i = 0; i < totalPages; i++) {
//       const newPdfDoc = await PDFDocument.create();
//       const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
//       newPdfDoc.addPage(copiedPage);

//       const pdfBytes = await newPdfDoc.save();
//       pagesArray.push(pdfBytes); // Store the individual page as a PDF byte array
//     }
//     setPages(pagesArray); // Set the pages in the state
//     console.log("Pages split and stored:", pagesArray);
//   };




//   return (
//     <div>
//     <h3>Upload PDF</h3>
//     <input type="file" accept="application/pdf" onChange={handlePdfUpload} />

//     <h3>Preview Pages</h3>
//     {/* Render preview or download links for each page */}
//     {pages.length > 0 && pages.map((page, index) => (
//       <div key={index}>
//         <h4>Page {index + 1}</h4>
//         <a href={`data:application/pdf;base64,${Buffer.from(page).toString('base64')}`} download={`page-${index + 1}.pdf`}>
//           Download Page {index + 1}
//         </a>
//       </div>
//     ))}
//   </div>
//   );
// }


//////////////////////////////////////////////////
// import React, { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

// export default function ReadBook() {
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);

//   const handlePdfUpload = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type === "application/pdf") {
//       setPdfUrl(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
//       {pdfUrl && (
//         <Document file={pdfUrl} onLoadSuccess={({ numPages }) => setTotalPages(numPages)}>
//           <Page pageNumber={pageNumber} />
//         </Document>
//       )}
//       <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>
//         Previous
//       </button>
//       <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= totalPages}>
//         Next
//       </button>
//     </div>
//   );
// }
