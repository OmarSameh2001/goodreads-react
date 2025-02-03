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

export default function BookCard(props) {
  const { book } = props;
  return (
    <Card
      sx={{
        width: 320,
        maxWidth: "100%",
        boxShadow: "lg",
        minHeight: 500,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <img
            src="https://media.istockphoto.com/id/1318370803/photo/open-book-black-on-white-with-clipping-path.jpg?s=2048x2048&w=is&k=20&c=VFq-TpyWBtOAjBB2CvpxmloRgMJsr06RdrwGpM5ks_A="
            srcSet="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          />
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
          href="#product-card"
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
