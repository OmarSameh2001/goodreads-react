import React from "react";
import { Card, CardContent, CardMedia, CardActions, Button, Typography, Grid2 } from "@mui/material";
import { Link } from "react-router-dom";

const AuthorCard = ({ author }) => {
  return (
    <Grid2 item xs={12} sm={6} md={4} className="mb-4">
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardMedia
          component="img"
          height="200"
          image={author.image}
          alt={author.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          {/* Optionally add additional details like "about" */}
          {/* <Typography variant="body2" color="text.secondary">
            {author.about}
          </Typography> */}
        </CardContent>

        <CardActions sx={{ justifyContent: 'center', marginTop: 'auto' }}>
          <Typography variant="h6" component="div">
            {author.name}
          </Typography>
        </CardActions>

        <CardActions sx={{ justifyContent: 'center' }}>
          <Button component={Link} to={`/authors/${author._id}`} variant="contained" color="primary">
            View Profile
          </Button>
        </CardActions>
      </Card>
    </Grid2>
  );
};

export default AuthorCard;
