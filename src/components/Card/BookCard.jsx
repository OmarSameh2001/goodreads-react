import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { Link as RouterLink } from "react-router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/joy/Box";
import Rating from "@mui/material/Rating";
import axiosInstance from "../../apis/config";
import { toast } from "react-toastify";
import { useContext } from "react";
import UserBooks from "../../context/userBooks";
export default function BookCard(props) {
  const { book } = props;
  const { userBooks, setUserBooks } = useContext(UserBooks);
  const userId = localStorage.getItem("userId");

  //Add a book to userBooks as want to read by default.
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
      <CardOverflow>
        <AspectRatio ratio="2/3" sx={{ borderRadius: "sm" }}>
          <img
            src={book.img}
            srcSet={book.img} //incase of multiple image versions choose best resolution.
            loading="lazy"
            alt={book.title}
            style={{ objectFit: "cover" }}
          />
        </AspectRatio>
      </CardOverflow>

      <CardContent sx={{ flexGrow: 1, px: 2, pt: 2 }}>
        <Typography
          level="title-md"//font size
          component={RouterLink} //makes it render as a React Router link (<Link> tag)
          to={`/bookDetails/${book._id}`}
          sx={{
            fontWeight: "bold",
            mb: 0.5,
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {book.title}
        </Typography>

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

        <Typography
          level="body-xs"
          sx={{
            mb: 1,
            color: "text.tertiary",
            display: "-webkit-box",
            WebkitLineClamp: 3, // number of lines to show
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {book.description}
        </Typography>
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
          <Chip variant="outlined" size="sm" color="neutral">
            {book.edition} Edition
          </Chip>
          <Chip variant="outlined" size="sm" color="neutral">
            {book.category.name}
          </Chip>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <VisibilityIcon fontSize="small" />
            <Typography level="body-xs">{book.views}</Typography>
          </Box>
        </Box>

        <Button
          fullWidth
          variant="soft"
          color="primary"
          size="sm"
          onClick={() => handleAddToWantToRead(userId, book._id)}
          disabled={userBooks.some(
            (userBook) => userBook.book._id === book._id
          )}
          sx={{ mt: 1.5 }}
        >
          {userBooks.some((userBook) => userBook.book._id === book._id)
            ? "Already Added"
            : "Want to Read"}
        </Button>
      </CardOverflow>
    </Card>
  );
}
