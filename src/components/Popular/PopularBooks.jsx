import React, { useState, useEffect } from "react";
import axiosInstance from "../../apis/config";
import { useNavigate } from "react-router-dom";
import { Box, Card, IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import "../Popular/popularBooks.css";
export default function BookList({ user }) {
  const [books, setBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const visibleCount = 10; // number of items visible at once
  const imageWidth = 100; // narrower width
  const imageHeight = 100; // taller height
  const gap = 3; // gap between items
  const controller = new AbortController();

  // Shift left by one item
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Shift right by one item
  const handleNext = () => {
    if (currentIndex < books.length - visibleCount) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    axiosInstance
      .get("/books/popular")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Unable to fetch popular books", err));

    return () => controller.abort();
  }, []);

  return (
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
            <h2
              style={{ textAlign: "left", marginBottom: "20px" }}
              className="b612-regular"
            >
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
              {books.map((book) => (
                <Box key={book._id} sx={{ textAlign: "center", mx: gap / 2 }}>
                  <Box
                    onClick={() =>
                      navigate(user ? `/adminBooks` : `/bookDetails/${book._id}`)
                    }
                    sx={{
                      cursor: "pointer",
                      flex: `0 0 ${imageWidth}px`,
                      mx: `${gap / 2}px`,
                      textAlign: "center",
                    }}
                  >
                    <div className="book">
                      <a href="#">
                        <ul >
                          <li className="page page3"></li>
                          <li className="page page2"></li>
                          <li className="page page1"></li>
                          <li
                            className="cover"
                            style={{
                              backgroundImage: `url(${book.img})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></li>
                        </ul>
                      </a>
                    </div>
                    <h5
                      className="b612-regular-italic"
                      style={{ fontSize: "18px", color: "rgb(34, 34, 36)" }}
                    >
                      {book.title}
                    </h5>
                  </Box>
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
            disabled={currentIndex >= books.length - visibleCount}
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