//This component is responsible for showing the top 10 popular authors
import React from "react";
import axiosInstance from "../../apis/config";
import { Card, CardMedia, Container, Grid2, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

export default function ListPopularAuthors() {
  const [popularAuthors, setPopularAuthors] = useState([]);

  // create a function to redirect to the author details page
  function handleRedirectionToAuthorDetails(id) {
    navigate(`/authors/${id}`);
  }

  useEffect(() => {
    axiosInstance
      .get("/authors/popular")
      .then((res) => {
        setPopularAuthors(res.data); // ✅ Ensure you're accessing `res.data`
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Unable to fetch popular authors", err);
      });
  }, []);

  return (
    <Stack spacing={2}>
      <h1>Popular Authors</h1>
      <Grid2 container spacing={5}>
        {popularAuthors.map((popularAuthor) => {
          return (
            <>
              <Card key={popularAuthor._id} sx={{ width: 310 }}>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  {popularAuthor.name}
                </Typography>
                <Typography variant="h5" component="div">
                  {popularAuthor.about}
                </Typography>
                <CardMedia
                  component="img"
                  image={`${popularAuthor.img}`}
                  alt="author image"
                  onClick={() =>
                    handleRedirectionToAuthorDetails(popularAuthor.id)
                  }
                />
                {/* <img src="https://i.imgur.com/BYwiZv4_d.webp?maxwidth=760&fidelity=grand" ></img> */}
              </Card>
            </>
          );
        })}
      </Grid2>
    </Stack>
  );
}
