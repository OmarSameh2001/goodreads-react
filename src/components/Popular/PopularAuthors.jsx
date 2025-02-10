import React, { useState, useEffect } from "react";
import axiosInstance from "../../apis/config";
import { Box, Typography, IconButton, Card } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

export default function ListPopularAuthors({ user }) {
  const [popularAuthors, setPopularAuthors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const visibleCount = 5; // number of items visible at once
  const imageWidth = 150; // image width
  const imageHeight = 250; // image height
  const gap = 10; // gap between items

  useEffect(() => {
    const controller = new AbortController();
    axiosInstance
      .get("/authors/popular", { signal: controller.signal })
      .then((res) => setPopularAuthors(res.data))
      .catch((err) => console.error("Unable to fetch popular authors", err));

    return () => controller.abort();
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
    // Wrapper with a gradient background that acts like a border
    <Box
      sx={{
        m: 4,
        p: 1,
        background:
          "linear-gradient(90deg, rgba(238,174,202,1), rgba(148,187,233,1))",
        borderRadius: 0, // sharp edges
      }}
    >
      <Card
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0 6px 10px rgba(0,0,0,0.15)",
          borderRadius: 0, // no curves inside
          p: 3,
        }}
      >
        <Box sx={{ width: "88%", mx: "auto", mt: 2, position: "relative" }}>
          {/* Carousel viewport */}
          <Box overflow="hidden">
<h2 style={{ textAlign: "left", marginBottom: "20px" }} className="b612-regular" >
Check out this collection of the most popular authors

</h2>
            <Box
              display="flex"
              sx={{
                transform: `translateX(-${currentIndex * (imageWidth + gap)}px)`,
                transition: "transform 0.3s ease",
                p: 2,
              }}
            >
              {popularAuthors.map((author) => (
                <Box key={author._id} sx={{ textAlign: "center", mx: gap / 2 }}>
                  <Box
                    onClick={() =>
                      navigate(user ? `/adminAuthors` : `/authors/${author._id}`)
                    }
                    sx={{
                      cursor: "pointer",
                      boxShadow: 3,
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.05)" },
                      width: imageWidth,
                      height: imageHeight,
                      overflow: "hidden",
                      border: "9px solid rgb(255, 248, 251)",
                      // borderImage: "linear-gradient(90deg, rgba(238,174,202,1), rgba(148,187,233,1)) 1",
                      flex: `0 0 ${imageWidth}px`,
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
                  <h5
                    className="b612-regular-italic" 
                    style={{ fontSize: "18px", color: "rgb(34, 34, 36)" }}
                  >
                    {author.name}
                  </h5>
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
    </Box>
  );
}
