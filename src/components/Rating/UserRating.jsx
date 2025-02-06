import { Rating } from "@mui/material";
import axiosInstance from "../../apis/config";
import { useState } from "react";

// This component is responsible for viewing and updating user rating
function UserRating({ userId, bookId, rating = 0 }) {
  const [rate, setRating] = useState(rating);

  function handleRatingChange(event, newValue) {
    console.log(userId, bookId, newValue);
    axiosInstance
      .patch(`/userbook/rate/${bookId}`, {
        rating: newValue,
        userId: userId,
      })
      .then((response) => {
        setRating(response.data.rating);
      })
      .catch((error) => {
        console.error("Error updating rating:", error);
      });
  }

  return (
    <Rating
      name="size-medium"
      value={rate} 
      onChange={handleRatingChange}
    />
  );
}

export default UserRating;
