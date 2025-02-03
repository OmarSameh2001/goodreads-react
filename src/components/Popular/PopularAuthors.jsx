import React, { useState, useEffect } from "react";
import axiosInstance from "../../apis/config";
import { Card, CardContent, Typography, CardMedia, Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

export default function ListPopularAuthors() {
  const [popularAuthors, setPopularAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/authors/popular")
      .then((res) => setPopularAuthors(res.data))
      .catch((err) => console.error("Unable to fetch popular authors", err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Popular Authors
      </Typography>
      <Slider {...settings}>
        {popularAuthors.map((author) => (
          <Card key={author._id} sx={{ mx: 1, p: 2 }}>
            <CardContent>
              <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                {author.name}
              </Typography>
              <Typography variant="h6">{author.about}</Typography>
            </CardContent>
            <CardMedia
              component="img"
              image={author.img}
              alt="Author image"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/authors/${author._id}`)}
            />
          </Card>
        ))}
      </Slider>
    </Box>
  );
}
