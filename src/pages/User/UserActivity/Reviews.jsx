import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../apis/config";
import { List, ListItem, ListItemText, Divider, Button, TextField, Box, Snackbar, Alert } from "@mui/material";
import UserBooks from "../../../context/userBooks";
import BookCard from "../../../components/Card/BookCard";

export default function Reviews() {
  const { bookId } = useParams();
  const { userBooks } = useContext(UserBooks);

  // Extract review from user book
  const userBook = userBooks.find((userBook) => userBook.book._id === bookId);
  const [review, setReview] = useState(userBook ? userBook.review : ""); // Saved review
  const [inputReview, setInputReview] = useState(""); // Separate state for textarea input

  const [othersReviews, setOthersReviews] = useState([]);
  const [book, setBook] = useState({});
  const [showTextarea, setShowTextarea] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [success, setSuccess] = useState(false); // Success message state
  
  useEffect(() => {
    async function fetchData() {
      try {
        const bookResponse = await axiosInstance.get(`/books/${bookId}`);
        setBook(bookResponse.data);

        const reviewsResponse = await axiosInstance.get(`/reviews/${bookId}`);
        setOthersReviews(reviewsResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [bookId]);

  function handleReviewClick() {
    setShowTextarea(true);
  }

  async function handleReviewSubmit() {
    setLoading(true); // Show loading state

    try {
      const response = await axiosInstance.patch(`/userbook/review/${bookId}`, { 
        review: inputReview, 
        userId: localStorage.getItem("userId") 
      });

      setReview(response.data.review); // Update saved review
      setInputReview(""); // Clear input field
      setShowTextarea(false); // Hide textarea
      setSuccess(true); // Show success message
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  }

  return (
    <>
      {/* Show book details */}
      <Box sx={{ mb: 2 }}>
        {/* <BookCard book={book} /> */}
      </Box>

      {/* User's Review */}
      <List sx={{ mb: 2 }} aria-label="user-review">
        <ListItem>
          {review ? (
            <ListItemText primary={review} />
          ) : (
            <>
              <ListItemText primary="Write your review" />
              <Button variant="outlined" onClick={handleReviewClick}>
                Write your review
              </Button>
            </>
          )}
        </ListItem>
        {showTextarea && (
          <Box sx={{ mt: 1, p: 2 }}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Your Review"
              value={inputReview} // Use separate inputReview state
              onChange={(e) => setInputReview(e.target.value)}
              variant="outlined"
            />
            <Button 
              variant="contained" 
              onClick={handleReviewSubmit}
              sx={{ mt: 1 }}
              disabled={loading} // Disable button when loading
            >
              {loading ? "Submitting..." : "Submit"} {/* Show loading text */}
            </Button>
          </Box>
        )}
        <Divider component="li" />
      </List>

      {/* Other Users' Reviews */}
      <List sx={{ mt: 2 }} aria-label="other-reviews">
        {othersReviews.map((review, index) => (
          <React.Fragment key={index}>
            <ListItem sx={index === 0 ? { backgroundColor: "#e0f7fa", transition: "0.5s" } : {}}>
              <ListItemText primary={review} />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>

      {/* Success Snackbar */}
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" variant="filled">
          Review submitted successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
