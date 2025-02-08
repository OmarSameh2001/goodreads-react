import {
  Button,
  TextField,
  Snackbar,
  Alert,
  Card,
  Container,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  Rating,
} from "@mui/material";
import { useContext, useState } from "react";
import UserBooks from "../../context/userBooks.js";
import axiosInstance from "../../apis/config.js";

export default function UserReview({ bookId }) {
  const { userBooks } = useContext(UserBooks);
  const userBook = userBooks.find((userBook) => userBook.book._id === bookId && (userBook.rating != null || userBook.review != null)); 
  const [inputReview, setInputReview] = useState("");
  const [showTextarea, setShowTextarea] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const username = localStorage.getItem("username");
console.log(userBook);
  async function handleReviewSubmit() {
    setLoading(true);
    try {
      await axiosInstance.patch(`/userbook/review/${bookId}`, {
        userId: localStorage.getItem("userId"),
        review: inputReview
      });
      setShowTextarea(false);
      setSuccess(true);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container sx={{ mt: 2, p: 2, borderRadius: 2, boxShadow: 1 }}>
      {showTextarea && (
        <>
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Your Review"
            value={inputReview}
            onChange={(e) => setInputReview(e.target.value)}
            variant="outlined"
          />
          <Button variant="contained" onClick={handleReviewSubmit} sx={{ mt: 1 }} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </>
      )}
           
   
    {userBook ? (
      <>
       <h3 className="b612-bold">Your Review</h3>
        <Card sx={{ background: "linear-gradient(135deg, #f8bbd0, #bbdefb, #d1c4e9)", borderRadius: 2, boxShadow: 2, p: 2, mb: 2 }}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: "primary.main" }}>{username?.charAt(0)}</Avatar>}
            title={username || "Anonymous"}
            subheader={new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: true }).format(new Date(userBook.updatedAt || userBook.createdAt))}
          />
          <CardContent>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>{userBook.review}</Typography>
            <Rating name="size-medium" value={userBook.rating} readOnly />
          </CardContent>
        </Card>
        </>
      ) : (
        !showTextarea && (
          <Container sx={{ 
            background: "linear-gradient(135deg, #f8bbd0, #bbdefb, #d1c4e9)", 
            borderRadius: 2, 
            boxShadow: 2, 
            p: 2, 
            mb: 2, 
            textAlign: "center", 
            mt: 3 
           }}>
            <Typography variant="h6">No review yet?</Typography>
            <Button variant="contained" onClick={() => setShowTextarea(true)} sx={{ mt: 1 }}>
              Write your review now 
            </Button>
          </Container>
        )
      )}

      {/* Success Snackbar */}
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" variant="filled">
          Review submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
