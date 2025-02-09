import React from "react";
import { Card, Typography, Grid2 } from "@mui/material";
import { useNavigate } from "react-router";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  function handleNavigate(name) {
    navigate(`/books?categories=${name}`);
  }
  return (
    <Grid2 className="mb-4">
      <Card
        onClick={() => handleNavigate(category.name)}
        sx={{
          cursor: "pointer",
          padding: 2,
          ":hover": {
            backgroundColor: "#f5f5f5",
            scale: 1.02,
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        <Typography variant="h6" component="div">
          {category.name}
        </Typography>
        <Typography variant="body2" className="mb-1" color="text.secondary">
          {category.description}
        </Typography>
      </Card>
    </Grid2>
  );
};

export default CategoryCard;
