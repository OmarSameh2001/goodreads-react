import React from "react";
import { Card, Typography, Grid2 } from "@mui/material";
import { useNavigate } from "react-router";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  return (
    <Grid2 className="mb-4">
      <Card
        sx={{
          cursor: "pointer",
          textAlign: "center",
          padding: 2,
          ":hover": {
            backgroundColor: "#f5f5f5",
            scale: 1.05,
            transition: "all 0.3s ease-in-out",
          },
        }}
        onClick={() => {
          navigate(`/books?categories=${category.name.split(" ").join("+")}`);
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
