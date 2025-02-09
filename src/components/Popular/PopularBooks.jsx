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
  const visibleCount = 5; // number of items visible at once
  const imageWidth = 140; // narrower width
  const imageHeight = 250; // taller height
  const gap = 80; // gap between items
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
    <Card
      sx={{
        background:
          "linear-gradient(135deg, #1B2A41,#1B2A41,rgb(134, 110, 84), #1B2A41)",
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
           Our best choices of books by our users
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
            {books.map((book) => (
              <Box key={book._id}>
<Box
  onClick={() => navigate(user ? `/adminBooks` : `/bookDetails/${book._id}`)}
  sx={{
    cursor: "pointer",
    // borderRadius: 2,
    // boxShadow: 3,
   // transition: "transform 0.3s ease",
    //"&:hover": { transform: "scale(1.05)" },
   // width: imageWidth,
    //height: imageHeight,
    // overflow: "hidden",
   // border: "10px solid #2C3E50",
    flex: `0 0 ${imageWidth}px`,
    mx: `${gap / 2}px`,
    textAlign: "center",
  }}
>
                
                  <Box
                    onClick={() =>
                      navigate(
                        user ? `/adminBooks` : `/bookDetails/${book._id}`
                      )
                    }
                  >
                    <div className="book">
                      <a href="#">
                        <ul>
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
                  </Box>
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
                  {book.title}
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
  );
}