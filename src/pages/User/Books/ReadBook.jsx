import { useState, useEffect, useRef } from "react";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import { Button, Typography, Box, IconButton, CircularProgress} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../apis/config";
export default function ReadBook() {
  const { bookId } = useParams();
 // const bookId = "67a801daf002318a2e75053c"; 
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdf, setPdf] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageUrl, setImageUrl] = useState(""); // Store the rendered image
  const canvasRef = useRef(null);

  
  useEffect(() => {
    async function fetchBook() {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          console.error("No token found, user is not authenticated");
          return;
        }
  
        const response = await axiosInstance.get(`/books/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        let pdfUrl = response.data.pdfLink;
  
        // If the URL is from Google Drive, convert it to a direct link
        if (pdfUrl.includes("drive.google.com")) {
          const fileId = pdfUrl.match(/d\/(.*)\/view/)[1]; // Extract file ID
          pdfUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        }
  
        setPdfUrl(pdfUrl);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchBook();
  }, [bookId]);
  
  
 
  const loadPdf = async (url) => {
    try {
      console.log("Fetching PDF from:", url);
  
      const response = await fetch(url, { mode: "cors" });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
      }
  
      // Ensure the response is a PDF
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("pdf")) {
        throw new Error("Invalid file type. Expected a PDF.");
      }
  
      const arrayBuffer = await response.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer, withCredentials: true });
      const pdfDoc = await loadingTask.promise;
  
      setPdf(pdfDoc);
      setNumPages(pdfDoc.numPages);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error loading PDF:", error);
    }
  };

  

  useEffect(() => {
    if (pdf) {
      renderPage(currentPage);
    }
  }, [pdf, currentPage]);
  
  const renderPage = async (pageNumber) => {
    if (!pdf) return;

    const page = await pdf.getPage(pageNumber);
    const scale = 1.5;
    const viewport = page.getViewport({ scale });

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
    setImageUrl(canvas.toDataURL("image/png"));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= numPages) {
      setCurrentPage(newPage);
    }
  };
  
  return (
    <Box sx={{ textAlign: "center", padding: "20px" }}>
    <Typography variant="h4" gutterBottom>
      Read Book
    </Typography>

    {loading ? (
      <CircularProgress />
    ) : pdfUrl ? (
      <>
        <Box
          sx={{
            margin: "auto",
            maxWidth: "800px",
            border: "1px solid #ccc",
            padding: "10px",
            backgroundColor: "#f8f8f8",
            position: "relative",
          }}
        >
          <canvas ref={canvasRef} style={{ display: "none" }} />
          {imageUrl && <img src={imageUrl} alt={`Page ${currentPage}`} style={{ width: "100%" }} />}

          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2, gap: 2 }}>
            <IconButton disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
              <ArrowBack />
            </IconButton>
            <Typography variant="body1">Page {currentPage} of {numPages}</Typography>
            <IconButton disabled={currentPage === numPages} onClick={() => handlePageChange(currentPage + 1)}>
              <ArrowForward />
            </IconButton>
          </Box>
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "20px" }}
          onClick={() => window.open(pdfUrl, "_blank")}
        >
          Open PDF in New Tab
        </Button>
      </>
    ) : (
      <Typography variant="h6" color="error">
        No PDF available for this book.
      </Typography>
    )}
  </Box>
  );
}
///////////////////

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Document, Page } from "react-pdf";
// import { pdfjs } from "react-pdf";
// import {
//   Container,
//   Box,
//   Typography,
//   Button,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import axiosInstance from "../../../apis/config.js";

// // Configure PDF worker
// pdfjs.GlobalWorkerOptions.workerSrc = `"https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"`;

// function ReadBook() {
//   const { bookId } = useParams();
//   const navigate = useNavigate();
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [bookData, setBookData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBookData = async () => {
//       try {
//         const response = await axiosInstance.get(`/books/${bookId}`);
//         if (!response.data.pdfLink) {
//           throw new Error("No PDF available for this book");
//         }
//         setBookData(response.data);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookData();
//   }, [bookId]);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Container sx={{ py: 4 }}>
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//         <Button
//           variant="contained"
//           startIcon={<ArrowBackIcon />}
//           onClick={() => navigate(-1)}
//         >
//           Back to Book Details
//         </Button>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Box sx={{ mb: 2 }}>
//         <Button
//           variant="outlined"
//           startIcon={<ArrowBackIcon />}
//           onClick={() => navigate(-1)}
//           sx={{ mb: 2 }}
//         >
//           Back to Book
//         </Button>
        
//         <Typography variant="h4" component="h1" gutterBottom>
//           {bookData.title}
//         </Typography>
//         <Typography variant="subtitle1" gutterBottom>
//           by {bookData.author?.name || "Unknown Author"}
//         </Typography>
//       </Box>

//       <Box sx={{ 
//         border: "1px solid #e0e0e0",
//         borderRadius: 2,
//         overflow: "hidden",
//         minHeight: "80vh"
//       }}>
//         <Document
//           file={bookData.pdfLink}
//           onLoadSuccess={onDocumentLoadSuccess}
//           onLoadError={(error) => setError("Failed to load PDF document")}
//           loading={
//             <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//               <CircularProgress />
//             </Box>
//           }
//         >
//           <Page 
//             pageNumber={pageNumber} 
//             width={window.innerWidth * 0.8}
//             renderAnnotationLayer={false}
//             renderTextLayer={false}
//           />
//         </Document>
//       </Box>

//       <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
//         <Button
//           variant="contained"
//           disabled={pageNumber <= 1}
//           onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
//         >
//           Previous
//         </Button>
//         <Typography variant="body1" sx={{ mx: 2 }}>
//           Page {pageNumber} of {numPages || "..."}
//         </Typography>
//         <Button
//           variant="contained"
//           disabled={pageNumber >= numPages}
//           onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
//         >
//           Next
//         </Button>
//       </Box>
//     </Container>
//   );
// }

// export default ReadBook;