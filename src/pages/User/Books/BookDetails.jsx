import { useNavigate, useParams } from "react-router";
import {
  Container,
  Card,
  CardMedia,
  Typography,
  Rating,
  Box,
  Link,
} from "@mui/material";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import { useState } from "react";
import axiosInstance from "../../../apis/config.js";
import { useEffect } from "react";
import { Chip } from "@mui/material";
import { toast } from "react-toastify";
import { useContext } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link as RouterLink } from "react-router";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import UserBooks from "../../../context/userBooks.js";
import BookViewer from "./BookViewer.jsx";
import BooksContext from "../../../context/books.js";

function BookDetails() {
  const { userBooks, setUserBooks } = useContext(UserBooks);
  const userId = localStorage.getItem("userId");
  const { bookId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [book, setBook] = useState({});
  const { setReadingBook } = useContext(BooksContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/books/${bookId}`);
        setBook(res.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [bookId]);

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
      setUserBooks((prevUserBooks) => [...prevUserBooks, response.data]);
    } catch (error) {
      toast("Error, Book already exist", { type: "error", theme: "colored" });
    }
  }
  return (
    <Container
      sx={{ py: 6, fontFamily: "Merriweather, serif", width: "100vw" }}
    >
      <Grid container spacing={6}>
        {/* Book Cover Section */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              position: "relative",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              "&:hover": { transform: "scale(1.02)" },
              transition: "all 0.3s ease",
            }}
          >
            <CardMedia
              component="img"
              image={book.img || "/default-book-cover.jpg"}
              alt={book.title}
              sx={{
                height: "auto",
                borderRadius: "4px",
                aspectRatio: "2/3",
                objectFit: "cover",
              }}
            />
            <Chip
              label={`${book.edition} Edition`}
              color="secondary"
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                fontWeight: "bold",
                backdropFilter: "blur(4px)",
                backgroundColor: "rgba(66, 64, 64, 0.9)",
              }}
            />
          </Card>
        </Grid>

        {/* Book Details Section */}
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "text.primary",
                lineHeight: 1.2,
                fontFamily: "inherit",
              }}
            >
              {book.title}
            </Typography>

            <Typography
              variant="h5"
              component="h2"
              sx={{
                mb: 3,
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <PersonOutlineIcon fontSize="small" />
              {book.author?.name || "Unknown Author"}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
              <Rating
                value={
                  book.totalRateCount > 0
                    ? book.totalRate / book.totalRateCount
                    : 0
                }
                precision={0.1}
                readOnly
                size="large"
                sx={{ color: "main" }}
              />
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                ({book.totalRateCount.toLocaleString()} ratings)
              </Typography>
              <Chip
                label={`📖 ${book.views.toLocaleString()} views`}
                variant="outlined"
                sx={{ borderRadius: 1, borderColor: "divider" }}
              />
            </Box>

            {book.category?.name && (
              <Link
                to={`/books?categories=${book.category.name}`}
                component={RouterLink}
                sx={{
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                <Chip
                  label={book.category.name}
                  color="primary"
                  variant="outlined"
                  sx={{
                    mb: 3,
                    borderRadius: "8px",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                />
              </Link>
            )}
          </Box>

          {/* Book Metadata */}
          <Box
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 2,
              p: 3,
              mb: 4,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Added:
                </Typography>
                <Typography variant="body1">
                  {new Date(book.createdAt).toLocaleDateString()}
                </Typography>
              </Grid>

              {!book.pdfLink ? (
                <Grid item xs={6} md={3}>
                  <p>Sorry this book is not available for reading</p>
                </Grid>
              ) :
              book.pdfLink === "not subscribed" ? (
                <Grid item xs={6} md={3}>
                  <p>Sorry you need to subscribe to read this book</p>
                </Grid>
              ) : (
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Read Online
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => {
                      navigate(`/bookViewer/${book.title}`);
                      setReadingBook(book.pdfLink);
                    }}
                  >
                    Access Book
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>

          {/* Author Section */}
          {book.author?.about && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{ mb: 2, fontWeight: 600 }}
              >
                About the Author
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  color: "text.secondary",
                  whiteSpace: "pre-wrap",
                }}
              >
                {book.author.about}
              </Typography>
            </Box>
          )}

          {/* Description */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ mb: 2, fontWeight: 600 }}
            >
              Book Description
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                fontSize: "1.1rem",
                color: "text.primary",
              }}
            >
              {book.description}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<BookmarkAddIcon />}
              onClick={() => handleAddToWantToRead(userId, book._id)}
              disabled={userBooks.some(
                (userBook) => userBook.book._id === book._id
              )}
              sx={{
                px: 4,
                fontWeight: 600,
                borderRadius: "8px",
                textTransform: "none",
                backgroundColor: "rgb(44, 62, 80)",
                "&:hover": {
                  scale: 1.05,
                  transition: "all 0.3s ease-in-out",
                  backgroundColor: "rgb(44, 62, 80)",
                },
              }}
            >
              {userBooks.some((userBook) => userBook.book._id === book._id)
                ? "Already Added"
                : "Want to Read"}
            </Button>
          </Box>
          <BookViewer
            pdfUrl={
              "https://drive.google.com/file/d/10-EfbWKjmUkzYZqFAAeueC8mvMEJ_NnH/preview"
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}
export default BookDetails;
