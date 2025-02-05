import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Navigate } from "react-router";
import { Link as RouterLink } from "react-router"; // Import React Router Link

export default function BookCard(props) {
  const { book } = props;
  return (
    <Card
      sx={{
        width: 320,
        maxWidth: "100%",
        boxShadow: "lg",
        minHeight: 550,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <img src={book.img} srcSet={book.img} loading="lazy" alt="" />
        </AspectRatio>
      </CardOverflow>
      <CardContent sx={{ justifyContent: "center", alignItems: "center" }}>
        <Typography
          level="body-xs"
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          {book.author.name}
        </Typography>
        <Link
          component={RouterLink} // Use React Router's Link as the base component
          to={`/bookDetails?bookId=${book._id}`} // React Router's navigation prop
          color="neutral"
          textColor="text.primary"
          sx={{ fontWeight: "md" }}
        >
          {book.title}
        </Link>

        <Typography level="body-sm">
          {book.description.slice(0, 100)}...
        </Typography>
      </CardContent>
      <CardOverflow>
        <Button variant="solid" color="success" size="lg">
          Add to Want to Read
        </Button>
      </CardOverflow>
    </Card>
  );
}
