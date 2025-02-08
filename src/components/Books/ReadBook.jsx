import { useState, useEffect, useRef } from "react";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import { Button, Typography, Box, IconButton, CircularProgress} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import axiosInstance from "../../apis/config";
import { useParams } from "react-router-dom";
export default function ReadBook() {
  //const { bookId } = useParams();
  const bookId = "67a6f3c894fba1ebeb358442"; 
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
        const token = localStorage.getItem("token"); // Get token from storage
  
        if (!token) {
          console.error("No token found, user is not authenticated");
          return;
        }
  
        const response = await axiosInstance.get(`/books/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setPdfUrl(response.data.pdfLink);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [bookId]);

  
  useEffect(() => {
    if (pdfUrl) {
      loadPdf(pdfUrl);
    }
  }, [pdfUrl]);

  const loadPdf = async (url) => {
    try {
      const loadingTask = pdfjs.getDocument(url);
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

