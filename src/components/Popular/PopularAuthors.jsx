import React, { useState, useEffect } from "react";
import axiosInstance from "../../apis/config";
import { Box, Typography, IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import "../Popular/popular.css"

export default function ListPopularAuthors() {
  const [popularAuthors, setPopularAuthors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const visibleCount = 5; // number of items visible at once
  const imageWidth = 140; // narrower width
  const imageHeight = 250; // taller height
  const gap = 16; // gap between items

  useEffect(() => {
    axiosInstance
      .get("/authors/popular")
      .then((res) => setPopularAuthors(res.data))
      .catch((err) => console.error("Unable to fetch popular authors", err));
  }, []);

  // Shift left by one item
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Shift right by one item
  const handleNext = () => {
    if (currentIndex < popularAuthors.length - visibleCount) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4, position: "relative" }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "left" }}>
        Check out our popular authors
      </Typography>

      {/* Carousel viewport */}
      <Box overflow="hidden">
        <Box
          display="flex"
          sx={{
            transform: `translateX(-${currentIndex * (imageWidth + gap)}px)`,
            transition: "transform 0.3s ease",
          }}
        >
          {popularAuthors.map((author) => (
            <Box
              key={author._id}
              sx={{
                flex: `0 0 ${imageWidth}px`,
                mx: `${gap / 2}px`,
                textAlign: "center",
              }}
            >
              <Box
                onClick={() => navigate(`/authors/${author._id}`)}
                sx={{
                  cursor: "pointer",
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.05)" },
                  width: imageWidth,
                  height: imageHeight,
                  overflow: "hidden",
                  border: "5px solid #383838",
                }}
              >
                <img
                  src={author.img}
                  alt={author.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                 
                  }}
                  loading="lazy"
                />
              </Box>
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                {author.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Left Arrow */}
      <IconButton
        onClick={handlePrev}
        disabled={currentIndex === 0}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "#fff",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
      >
        <KeyboardArrowLeft />
      </IconButton>

      {/* Right Arrow */}
      <IconButton
        onClick={handleNext}
        disabled={currentIndex >= popularAuthors.length - visibleCount}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "#fff",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
}
