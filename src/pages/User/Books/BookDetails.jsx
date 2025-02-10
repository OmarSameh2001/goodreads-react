import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Rating,
  Button,
  IconButton,
  Tooltip,
  Box,
  Avatar,
  Stack,
  Container,
  Divider,
} from "@mui/material";
import { FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosInstance from "../../../apis/config.js";
import UserBooks from "../../../context/userBooks.js";
import BooksContext from "../../../context/books.js";
import UserReview from "../../../components/Reviews/UserReview.jsx";
import ReviewLink from "../../../components/Reviews/ReviewLink.jsx";
import UserRating from "../../../components/Rating/UserRating.jsx";

function BookDetails() {
  const { userBooks, setUserBooks } = useContext(UserBooks);
  const { setReadingBook } = useContext(BooksContext);
  const navigate = useNavigate();
  const { bookId } = useParams();
  const userId = localStorage.getItem("userId");

  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [expandedAuthor, setExpandedAuthor] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/books/${bookId}`);
        setBook(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [bookId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const isBookAdded = userBooks.some(
    (userBook) => userBook.book._id === book._id
  );
  const userRating =
    userBooks.find((userBook) => userBook.book._id === book._id)?.rating || 0;
  const averageRating =
    book.totalRateCount > 0 ? book.totalRate / book.totalRateCount : 0;
  const downloadAvailable = book.pdfLink && book.pdfLink !== "not subscribed";

  async function handleAddToWantToRead(user_id, book_id) {
    const requestBody = { user: user_id, book: book_id };
    try {
      const response = await axiosInstance.post("userBook/", requestBody);
      toast(`Book: ${book.title} has been added successfully`, {
        type: "success",
        theme: "colored",
      });
      setUserBooks((prev) => [...prev, response.data]);
    } catch (error) {
      toast("Error, Book already exist", { type: "error", theme: "colored" });
    }
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Card
        sx={{
          borderRadius: "15px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
            }}
          >
            {/* Left Column */}
            <Box sx={{ flex: 1 }}>
              <Box
                component="img"
                src={book.img || "/default-book-cover.jpg"}
                alt={book.title}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.src = "/default-book-cover.jpg";
                }}
              />
              <Stack spacing={2} mt={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating
                    value={averageRating}
                    precision={0.01}
                    readOnly
                    size="large"
                  />
                  <span>({book.totalRateCount.toLocaleString()})</span>
                </Box>
                <Button
                  variant={isBookAdded ? "contained" : "outlined"}
                  onClick={() => handleAddToWantToRead(userId, book._id)}
                  disabled={isBookAdded}
                  sx={{ borderRadius: "20px", textTransform: "none" }}
                >
                  {isBookAdded ? "Already Added" : "Want to Read"}
                </Button>
                <span style={{ fontSize: "0.8rem", color: "gray" }}>
                  Added on: {new Date(book.createdAt).toLocaleDateString()}
                </span>
              </Stack>
            </Box>

            {/* Right Column */}
            <Box sx={{ flex: 2 }}>
              <h2 className="b612-bold" style={{ fontSize: "30px", margin: 0 }}>
                {book.title}
              </h2>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  marginBottom: "1rem",
                }}
              >
                <Avatar
                  alt={book.author?.name || "Author"}
                  src={book.author?.img || "https://via.placeholder.com/40"}
                />
                <h3
                  className="b612-regular"
                  style={{ color: "gray", fontSize: "16px", margin: 0 }}
                >
                  {book.author?.name || "Unknown Author"}
                </h3>
              </Box>
              <p className="b612-regular" style={{ textAlign: "justify" }}>
                {expanded
                  ? book.description
                  : `${book.description.slice(0, 100)}...`}
                <Button
                  size="small"
                  onClick={() => setExpanded(!expanded)}
                  sx={{ ml: 1, textTransform: "none" }}
                >
                  {expanded ? "Read Less" : "Read More"}
                </Button>
              </p>
              {book.author?.about && (
                <>
                  <h2
                    className="b612-bold"
                    style={{ fontSize: "24px", marginBottom: "0.5rem" }}
                  >
                    About the Author
                  </h2>
                  <p className="b612-regular" style={{ textAlign: "justify" }}>
                    {expandedAuthor
                      ? book.author.about
                      : `${book.author.about.slice(0, 100)}...`}
                    <Button
                      size="small"
                      onClick={() => setExpandedAuthor(!expandedAuthor)}
                      sx={{ ml: 1, textTransform: "none" }}
                    >
                      {expandedAuthor ? "Read Less" : "Read More"}
                    </Button>
                  </p>
                </>
              )}
              <Box sx={{ mt: 3 }}>
                <Tooltip
                  title={
                    !book.pdfLink
                      ? "Sorry this book is not available for reading"
                      : book.pdfLink === "not subscribed"
                      ? "Sorry you need to subscribe to read this book"
                      : "Download Book"
                  }
                >
                  <span>
                    <IconButton
                      disabled={!downloadAvailable}
                      aria-label="download book"
                      onClick={() => {
                        if (downloadAvailable) {
                          setReadingBook(book.pdfLink);
                          navigate(`/bookViewer/${book.title}`);
                        }
                      }}
                    >
                      <FaDownload />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </CardContent>
        <Divider />
        <Box sx={{ p: 3 }}>
          {/* Review Section */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2
              className="b612-regular-italic"
              style={{ fontSize: "22px", marginRight: 11}}
            >
              Your review about this book
            </h2>
            <ReviewLink bookId={book._id} style={{ marginLeft: "8px" }} />
          </div>
          {/* Rating Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <h2
              className="b612-regular-italic"
              style={{ fontSize: "22px", marginRight: 11 }}
            >
              Your Rating
            </h2>
            <UserRating
              userId={userId}
              bookId={bookId}
              rating={userRating}
              style={{ marginLeft: "8px" }}
            />
          </div>
          {/* Link to other reviews */}
          <div style={{ textAlign: "right", marginTop: "1rem" }}>
            <Link
              to={`/reviews/${book._id}`}
              className="b612-bold"
              style={{
                fontSize: "18px",
                textDecoration: "none",
                color: "#1976d2",
              }}
            >
              See all reviews
            </Link>
          </div>
        </Box>
      </Card>
    </Container>
  );
}

export default BookDetails;
