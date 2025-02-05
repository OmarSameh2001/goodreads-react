import React from "react";
import { Card, CardContent, CardMedia, CardActions, Button, Typography, Grid2 } from "@mui/material";

const CategoryCard = ({ category }) => {
  return (
    <Grid2 item xs={12} sm={6} md={4} className="mb-4">
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Optional: You can use CardMedia for the image */}
        {/* <CardMedia
          component="img"
          height="140"
          image={category.image}
          alt={category.name}
        /> */}
        <CardContent sx={{ flexGrow: 1 }}>
          {/* Optional: Add a description or any other content */}
          {/* <Typography variant="body2" color="text.secondary">
            {category.about}
          </Typography> */}
        </CardContent>

        <CardActions sx={{ justifyContent: 'center', marginTop: 'auto' }}>
          <Typography variant="h6" component="div">
            {category.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {category.description}
          </Typography>
        </CardActions>
      </Card>
    </Grid2>
  );
};

export default CategoryCard;
