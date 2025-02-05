import { useParams } from "react-router";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Rating,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { use, useState } from "react";
import axios from "axios";
import axiosInstance from "../../../apis/config.js";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { Chip } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import WtrBooksContext from "../../../context/wtrBooks.js";
import { useContext } from "react";

function BookDetails(props) {
  const { wtrBooks, setWtrBooks } = useContext(WtrBooksContext);
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bookId = searchParams.get("bookId");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [book, setBook] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          `http://localhost:3001/books/${bookId}`
        );
        setBook(res.data);
        setWtrBooks(res.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  async function handleAddToWantToRead(user_id, book_id) {
    const requestBody = {
      user: user_id,
      book: book_id,
    };

    try {
      const response = await axiosInstance.post("userBook/", requestBody);
      toast(`Book: ${book.title} has been added successfully`, {
        type: "success",
        theme: "colored",
      });
    } catch (error) {
      toast("Error, Book already exist", { type: "error", theme: "colored" });
    }
  }
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Book Cover */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              image={book.img} // Replace with actual book cover
              alt="Book Cover"
              sx={{ borderRadius: 2 }}
            />
          </Card>
        </Grid>

        {/* Book Information */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" fontWeight="bold">
            {`Book Title: ${book.title}`}
          </Typography>
          <Typography variant="h6" sx={{ my: 1 }}>
            {`Author Name: ${book.author.name}`}
          </Typography>

          {/* Rating */}
          <Typography variant="h6" sx={{ my: 1 }}>
            {`About author: ${book.author.about}`}
          </Typography>
          <Rating
            value={book.totalRate / book.totalRateCount}
            precision={0.5}
            readOnly
            sx={{ mb: 2 }}
          />
          <Grid container spacing={1} sx={{ mb: 2 }}>
            {book.category?.name && (
              <Grid item>
                <Chip
                  label={book.category.name}
                  color="primary"
                  sx={{ borderRadius: "20px" }}
                />
              </Grid>
            )}
          </Grid>

          {/* Description */}
          <Typography variant="body1" sx={{ mb: 3 }}>
            {book.description}
          </Typography>

          <Button
            variant="contained"
            color="success"
            sx={{ py: 1.5 }}
            onClick={() => handleAddToWantToRead(userId, book._id)}
            // disabled={wtrBooks.some((b) => b._id === book._id)} // Disable if book exists in user's list
          >
            Add to Want to Read
          </Button>
        </Grid>
      </Grid>
      <ToastContainer />
    </Container>
  );
}
export default BookDetails;
