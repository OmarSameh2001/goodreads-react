import React, { useState, useEffect, useCallback } from "react";
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
import UserReview from "../../../components/Reviews/UserReview";

export default function Reviews() {
  const lightColors = ["#fce4ec", "#e3f2fd", "#e8f5e9", "#fff3e0", "#f3e5f5", "#ede7f6"];
  const { bookId } = useParams();
  const [othersReviews, setOthersReviews] = useState([]);
  const [reviewUpdated, setReviewUpdated] = useState(false); // Trigger re-fetch

  // Fetch reviews
  const fetchData = useCallback(async () => {
    try {
      const reviewsResponse = await axiosInstance.get(`userbook/review/${bookId}`);
      setOthersReviews(reviewsResponse.data);
    } catch (error) {
      console.log(error);
    }
  }, [bookId]);

  useEffect(() => {
    fetchData();
  }, [fetchData, reviewUpdated]); // Runs when reviewUpdated changes

  return (
    <>
      <UserReview bookId={bookId} onReviewSubmit={() => setReviewUpdated((prev) => !prev)} />
      <br/>
      <Container sx={{ mt: 2, p: 2, borderRadius: 2, boxShadow: 1 }}>
        <h3 className="b612-bold">All Book Reviews</h3>
        <List sx={{ mt: 3 }}>
          {othersReviews.map((review) => {
            const randomColor = lightColors[Math.floor(Math.random() * lightColors.length)];
            return (
              <Card key={review._id} sx={{ backgroundColor: randomColor, borderRadius: 2, boxShadow: 2, p: 2, mb: 2 }}>
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: "primary.main" }}>{review?.user?.username?.charAt(0)}</Avatar>}
                  title={review?.user?.username || "Anonymous"}
                  subheader={new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }).format(new Date(review.updatedAt || review.createdAt))}
                />
                <CardContent>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>{review.review}</Typography>
                  <Rating name="size-medium" value={review.rating} readOnly />
                </CardContent>
              </Card>
            );
          })}
        </List>
      </Container>
    </>
  );
}
