import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../apis/config";
import {
  List,
  Card,
  Container,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  Rating,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import UserReview from "../../../components/Reviews/UserReview";

export default function Reviews() {
  const lightColors = [
    "#fce4ec",
    "#e3f2fd",
    "#e8f5e9",
    "#fff3e0",
    "#f3e5f5",
    "#ede7f6",
  ];
  const { bookId } = useParams();
  const [othersReviews, setOthersReviews] = useState([]);
  const [book, setBook] = useState(null);

  // const Banner = styled("div")(({ theme }) => ({
  //   background: `linear-gradient(135deg,rgb(223, 124, 197),rgb(228, 222, 237) ,rgb(86, 97, 213))`,
  //   height: 90,
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   color:" rgb(242, 233, 240)", // Slightly darker text for contrast
  //   fontSize: "2rem",
  //   fontWeight: "bold",
  //   textShadow: "1px 1px 8px rgba(0,0,0,0.2)",
  //   borderBottomLeftRadius: "80px", // Unique curve effect
  //   borderBottomRightRadius: "80px",
  // }));

  useEffect(() => {
    async function fetchData() {
      try {
        const bookResponse = await axiosInstance.get(`/books/${bookId}`);
        setBook(bookResponse.data);

        const reviewsResponse = await axiosInstance.get(
          `userbook/review/${bookId}`
        );
        setOthersReviews(reviewsResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [bookId]);

  return (
    <>
     {/* <Banner>{book ? book.title : "Book Review"}</Banner> */}
      <UserReview bookId={bookId} />
      <br/>
      <Container sx={{ mt: 2, p: 2, borderRadius: 2, boxShadow: 1 }}>
      <h3 className="b612-bold">Other Users' Reviews</h3>
        {/* Other Users' Reviews */}
        <List sx={{ mt: 3 }}>
          {othersReviews.map((otherUserReview) => {
            const randomColor =
              lightColors[Math.floor(Math.random() * lightColors.length)];
            return (
              <Card
                key={otherUserReview._id}
                sx={{
                  backgroundColor: randomColor,
                  borderRadius: 2,
                  boxShadow: 2,
                  p: 2,
                  mb: 2,
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      {otherUserReview.user.username.charAt(0)}
                    </Avatar>
                  }
                  title={otherUserReview.user.username || "Anonymous"}
                  subheader={new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }).format(
                    new Date(
                      otherUserReview.updatedAt || otherUserReview.createdAt
                    )
                  )}
                />
                <CardContent>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    {otherUserReview.review}
                  </Typography>
                  <Rating
                    name="size-medium"
                    value={otherUserReview.rating}
                    readOnly
                  />
                </CardContent>
              </Card>
            );
          })}
        </List>
        </Container>
    </>
  );
}
