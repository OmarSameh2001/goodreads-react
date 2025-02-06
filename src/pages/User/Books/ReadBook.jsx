// import React, { useState } from "react";
// import { Document, Page } from "react-pdf";
// import { Button, Box, Typography } from "@mui/material";
// import { ArrowBack, ArrowForward } from "@mui/icons-material";
// // import { pdfjs } from "react-pdf";
// // import { pdfjs } from "react-pdf";
// // pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


// function ReadBook({ pdfUrl }) {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const nextPage = () => {
//     if (pageNumber < numPages) {
//       setPageNumber(pageNumber + 1);
//     }
//   };

//   const prevPage = () => {
//     if (pageNumber > 1) {
//       setPageNumber(pageNumber - 1);
//     }
//   };

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
//       {/* PDF Viewer */}
//       <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
//         <Page pageNumber={pageNumber} />
//       </Document>

//       {/* Pagination Controls */}
//       <Box display="flex" alignItems="center" mt={2}>
//         <Button
//           onClick={prevPage}
//           disabled={pageNumber <= 1}
//           variant="contained"
//           startIcon={<ArrowBack />}
//         >
//           Previous
//         </Button>
//         <Typography mx={2}>
//           Page {pageNumber} of {numPages || "?"}
//         </Typography>
//         <Button
//           onClick={nextPage}
//           disabled={pageNumber >= numPages}
//           variant="contained"
//           endIcon={<ArrowForward />}
//         >
//           Next
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// export default function App() {
//   const googleDriveUrl =
//     "https://drive.google.com/file/d/1-dstlEu-EOMsYWBJChfxERkdmYr4nHbf/view?usp=drive_link"; 

//   return <ReadBook pdfUrl={googleDriveUrl} />;
// }
