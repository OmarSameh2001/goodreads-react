import { Rating } from "@mui/material";
import axiosInstance from "../../apis/config";
import { useContext, useState } from "react";
import UserBooks from "../../context/userBooks"; 

function UserRating({ userId, bookId, rating = 0 }) {
  const { userBooks, setUserBooks } = useContext(UserBooks); 
  const [rate, setRating] = useState(rating);

  function handleRatingChange(event, newValue) {
    axiosInstance
      .patch(`/userbook/rate/${bookId}`, {
        rating: newValue,
        userId: userId,
      })
      .then((response) => {
        setRating(response.data.rating);

        // ✅ Update global state using context
        setUserBooks((prevUserBooks) =>
          prevUserBooks.map((userBook) => {
            if (userBook.book._id === bookId) {
              return { ...userBook, rating: response.data.rating };
            }
            return userBook;
          })
        );
      })
      .catch((error) => {
        console.error("Error updating rating:", error);
      });
  }

  return (
    <Rating name="size-medium" value={rate} onChange={handleRatingChange} />
  );
}

export default UserRating;
