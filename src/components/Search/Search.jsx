import { FaSearch, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router";
import { TextField, IconButton } from "@mui/material";
import Tesseract from "tesseract.js";
import { useState, useEffect } from "react";
import axios from "axios"; 

function Search(props) {
  const { bookSearch, setBookSearch, setAppliedBookSearch } = props;
  const navigate = useNavigate();
  const [isExtracting, setIsExtracting] = useState(false);
  const [source, setSource] = useState("");


  const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/microsoft/trocr-base-printed";
  const HUGGING_FACE_API_KEY = "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";  

  // Preprocess image (optional, you can skip this if Hugging Face model handles the preprocessing)
  async function preprocessImage(imageFile) {
    const img = cv.imread(imageFile);
    const gray = img.bgrToGray();
    const binary = gray.threshold(0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU); // Thresholding
    const denoised = binary.medianBlur(5); // Denoising
    return denoised;
  }

  // Model API call
  async function huggingFaceOcr(imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile);
  
    let attempts = 0;
    const maxAttempts = 3;
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
    while (attempts < maxAttempts) {
      try {
        const response = await axios.post(HUGGING_FACE_API_URL, formData, {
          headers: {
            "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
            "Content-Type": "multipart/form-data",
          },
        });
  
        // Check for model loading state
        if (response.data.error === "Model microsoft/trocr-base-printed is currently loading") {
          console.log(`Model is loading. Waiting for ${response.data.estimated_time} seconds.`);
          await delay(response.data.estimated_time * 1000); // Wait for the estimated time
          attempts++;
          continue;  // Retry the request
        }
  
        return response.data[0]?.generated_text || "";
      } catch (error) {
        attempts++;
        console.error("API call error:", error);
        if (attempts < maxAttempts) {
          console.log("Retrying...");
          await delay(1000 * attempts); // Retry with increasing delay
        } else {
          alert("Failed after multiple attempts.");
          return "";
        }
      }
    }
  }
  
  function handleBookSearch() {
    setAppliedBookSearch(bookSearch);
    navigate(`?search=${bookSearch}`, { replace: true });
  }

  async function handleImageUpload(event) {
    const file = event.target.files[0];
    console.log("file",file);
    if (file) {
      setIsExtracting(true);
      try {
        
        const hfText = await huggingFaceOcr(file);

        if (hfText) {
          setBookSearch(hfText);
          setAppliedBookSearch(hfText);
          navigate(`?search=${hfText}`, { replace: true });
        } else {
          // Step 2: Fallback to Tesseract.js if Hugging Face fails
          const { data } = await Tesseract.recognize(file, 'eng', {
            logger: (m) => console.log(m),
          });

          const extractedText = data.text.split("\n").join(" ");
          setSource("Tesseract");
          console.log("Extracted Text from Tesseract:", extractedText);

          if (extractedText) {
            setBookSearch(extractedText);
            setAppliedBookSearch(extractedText);
            navigate(`?search=${extractedText}`, { replace: true });
          } else {
            alert("No text found. Try another image.");
          }
        }
      } catch (error) {
        console.error("Error in text extraction:", error);
        alert("Failed to extract text. Try again.");
      } finally {
        setIsExtracting(false);
      }
    }
  }

  return (
    <div className="d-flex">
      <TextField
        helperText="Search books by title"
        id="book-search-field"
        label="Search Books"
        value={bookSearch}
        onChange={(e) => setBookSearch(e.target.value)}
        fullWidth
        sx={{ mb: 2, width: "200px" }}
        onKeyPress={(e) => e.key === "Enter" && handleBookSearch()}
      />
      <button
        className="btn btn-primary mx-2"
        onClick={handleBookSearch}
        style={{
          height: "60px",
          width: "50px",
          backgroundColor: "rgb(44, 62, 80)",
        }}
      >
        <FaSearch />
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        id="upload-cover"
        style={{ display: "none" }}
      />
      <IconButton component="label" htmlFor="upload-cover" color="primary" sx={{ height: "60px", width: "50px" }}>
        <FaCamera />
      </IconButton>
      {isExtracting && <span>Extracting text...</span>}
    </div>
  );
}

export default Search;
