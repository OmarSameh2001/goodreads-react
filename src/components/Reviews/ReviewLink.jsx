import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import UserBooks from "../../context/userBooks";

function ReviewLink({ bookId }) {
  const { userBooks, setUserBooks } = useContext(UserBooks); 
  const navigate = useNavigate();

  const bookReview = userBooks.find((userBook) => userBook.book._id === bookId)?.review || "";

  return (
    <>
      {bookReview ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <h5 className="b612-regular-italic" style={{ fontSize: "14px" }}>{bookReview.slice(0, 40)}...</h5>
          <Link
            to={`/reviews/${bookId}`}
            style={{
              fontSize: "14px",
              marginLeft: "8px",
              color: "#1976d2",
              textDecoration: "none",
            }}
          >
            View
          </Link>
        </Box>
      ) : (
        <AddCircleOutlineIcon
          className="fa-plus-circle"
          fontSize="small"
          sx={{
            color: "gray",
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": { color: "green", transform: "scale(1.2)" },
          }}
          onClick={() => navigate(`/reviews/${bookId}`)}
        />
      )}
    </>
  );
}

export default ReviewLink;
