import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { Link as RouterLink } from "react-router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/joy/Box";
import Rating from "@mui/material/Rating";
import { useContext } from "react";
import UserBooks from "../../context/userBooks";
import CategoryCard from "./CategoryCard";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import Button from "@mui/joy/Button"; 
import axiosInstance from "../../apis/config"; 
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import BookState from "../Userbook/BookState";
export default function BookCard(props) {
  const { book } = props;
  const { userBooks, setUserBooks } = useContext(UserBooks);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  async function handleAddToWantToRead(user_id, book_id) {
    const requestBody = { user: user_id, book: book_id };
    try {
      const response = await axiosInstance.post("userBook/", requestBody);
      toast.success(`Book: ${book.title} added successfully!`);
      setUserBooks((prevUserBooks) => [
        ...prevUserBooks, 
        { _id: response.data._id, book: book, state: "want to read" }
      ]);
    } catch (error) {
      toast.error("Error: Book already exists!");
    }
  }

  const userBook = userBooks.find((userBook) => userBook.book._id === book._id);
  return (
    <Card 
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "xl",
        },
      }}
    >
      <CardOverflow onClick = {() => navigate(`/bookdetails/${book._id}`)}> 
        <AspectRatio ratio="2/3" sx={{ borderRadius: "sm" }}>
          <img
            src={book.img || "/default-book-cover.jpg"}
            srcSet={book.img || "/default-book-cover.jpg"}
            loading="lazy"
            alt={book.title}
            style={{ objectFit: "cover" }}
          />
        </AspectRatio>
      </CardOverflow>

      <CardContent sx={{ flexGrow: 1, px: 2, pt: 2 }}>
        <h4 className="b612-regular"> {book.title}</h4>
        <Typography level="body-sm" sx={{ mb: 1, color: "text.secondary" }}>
          by {book.author?.name || "Unknown Author"}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, mb: 1, alignItems: "center" }}>
          <Rating
            name="book-rating"
            value={
              book.totalRateCount > 0 ? book.totalRate / book.totalRateCount : 0
            }
            precision={0.5}
            readOnly
            size="sm"
          />
          <Typography level="body-xs">
            ({book.totalRateCount} ratings)
          </Typography>
        </Box>
      </CardContent>
      <CardOverflow
        sx={{ px: 2, pb: 2, borderTop: "1px solid", borderColor: "divider" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
            {book.edition} Edition
            {book.category.name}

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <VisibilityIcon fontSize="small" />
            <Typography level="body-xs">{book.views}</Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 1.5 }}>
          {userBook ? (
            <BookState userId={userId} bookId={book._id} state={userBook.state} />
          ) : (
            <Button
              fullWidth
              variant="soft"
              color="primary"
              size="sm"
              onClick={(event) => handleAddToWantToRead(userId, book._id)}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <BookmarkAddIcon fontSize="small" /> Want to Read
            </Button>
          )}
        </Box>
      </CardOverflow>
    </Card>
  );
}
