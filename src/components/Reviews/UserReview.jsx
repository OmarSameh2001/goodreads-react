import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function UserReview({ bookId, review  }) {
  const [bookReview, setReview] = useState(review || ""); 
  const navigate = useNavigate(); // ✅ Correct way to use useNavigate
  return (
    <>
      {bookReview  ? (
        // If review exists and is longer than 40 characters, trim it
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <h5 className="b612-regular-italic">
            {bookReview.slice(0, 40)}...
          </h5>

          <Link
            to={`/reviews/${bookId}`}  // Navigates to the book review page
            style={{
              fontSize: "12px",
              marginLeft: "8px",  // Space between text and the link
              color: "#1976d2",  // Blue color
              textDecoration: "none",
            }}
          >
            View
          </Link>
        </Box>
      ) :  (
        // If no review exists, show the "Add Review" icon
        <AddCircleOutlineIcon
          className="fa-plus-circle"
          fontSize="small"
          sx={{
            color: "gray",  // Default color
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              color: "green",  // Change color on hover
              transform: "scale(1.2)",  // Slightly enlarge
            },
          }}
          onClick = {() => {  navigate(`/reviews/${bookId}`)}}
        />
      )}
    </>
  );
}

export default UserReview;
