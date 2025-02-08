import React, { useState, useEffect } from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import axiosInstance from "../../apis/config";
import { useNavigate } from "react-router";

export default function CategoryRanking({ user }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance
      .get("/categories/popular")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        }
      })
      .catch((err) => console.error("Unable to fetch popular categories", err));
  }, []);

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4, position: "relative" }}>
      <h2 style={{ textAlign: "left", marginBottom: "20px" }}>
        Check Out the Most Loved Categories
      </h2>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 15,
          marginBottom: "100px",
        }}
      >
        {categories.map((category, index) => (
          <Box
            key={category.name}
            sx={{ position: "relative", display: "flex", alignItems: "center" }}
          >
            <Stack direction="row" spacing={1}>
            <Chip
              label={category.name}
              variant="outlined"
              sx={{ color: "black", fontWeight: "bold" }}
              onClick={() => navigate(user === "admin" ? `/adminCategories` : `/categories/`)}
            />
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
