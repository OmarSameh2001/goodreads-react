import React, { useState, useEffect } from "react";
import axiosInstance from "../../apis/config";
import { Box, Typography, IconButton, Card } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function ListPopularAuthors() {
  const [popularAuthors, setPopularAuthors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const visibleCount = 5; // number of items visible at once
  const imageWidth = 150; // narrower width
  const imageHeight = 250; // taller height
  const gap = 16; // gap between items
  const controller = new AbortController();
  useEffect(() => {
    axiosInstance
      .get("/authors/popular")
      .then((res) => setPopularAuthors(res.data))
      .catch((err) => console.error("Unable to fetch popular authors", err));

    return () => controller.abort(); // Cleanup function to cancel request
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
    <Card
      sx={{
        background: "linear-gradient(135deg, #1B2A41,#1B2A41,rgb(134, 110, 84), #1B2A41)",
        borderRadius: 5,
        boxShadow: 2,
        p: 2,
        mb: 2,
        margin: 6,
      }}
    >
      <Box sx={{ width: "90%", margin: "auto", mt: 4, position: "relative" }}>
        {/* Carousel viewport */}
        <Box overflow="hidden">
          <h2
            style={{
              textAlign: "left",
              background: "linear-gradient(135deg, #F5E6CA, #FFFFFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "28px",
            }}
            className="b612-regular"
          >
            Check out this collection of the most popular authors
          </h2>
          <Box
            display="flex"
            sx={{
              transform: `translateX(-${currentIndex * (imageWidth + gap)}px)`,
              transition: "transform 0.3s ease",
              borderRadius: "10px",
              padding: "18px",
            }}
          >
            {popularAuthors.map((author) => (
              <Box key={author._id}>
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
                    border: "10px solid #2C3E50",
                    flex: `0 0 ${imageWidth}px`,
                    mx: `${gap / 2}px`,
                    textAlign: "center",
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
                <h4
                  style={{
                    textAlign: "center",
                    background: "linear-gradient(135deg, #F5E6CA, #FFFFFF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "18px",
                    marginTop: "8px",
                  }}
                  className="b612-regular-italic"
                >
                  {author.name}
                </h4>
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
    </Card>
  );
}
