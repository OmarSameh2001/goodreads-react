import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CircularProgress,
  Pagination,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../apis/config";

function Authors() {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const {
    data: authors,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["authors", currentPage],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/authors/paginated?page=${currentPage}&limit=${itemsPerPage}`
      );
      setTotal(res.data.data.pagination.total);
      setInitialLoading(false);
      console.log(res.data.data.items, currentPage);
      return res.data.data.items;
    },
  });

  if (initialLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error fetching authors
      </Typography>
    );
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Style constants from your snippet
  const imageWidth = 200;
  const imageHeight = 300;
  const gap = 2; // MUI spacing unit

  return (
    <>
      <h3
        align="left"
        style={{ color: "rgb(34, 34, 36)", marginLeft: "200px" }}
        className="b612-bold"
      >
        Authors of our books
      </h3>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "73.5vh",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: gap,
            }}
          >
            {authors?.map((author) => (
              <Box
                key={author._id}
                sx={{ textAlign: "center", mx: gap / 2, my: gap }}
              >
                <Box
                  onClick={() => navigate(`/authors/${author._id}`)}
                  sx={{
                    cursor: "pointer",
                    boxShadow: 3,
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.05)" },
                    width: imageWidth,
                    height: imageHeight,
                    overflow: "hidden",
                    border: "9px solid rgb(255, 248, 251)",
                    flex: `0 0 ${imageWidth}px`,
                  }}
                >
                  <Box
                    component="img"
                    src={author.img}
                    alt={author.name}
                    loading="lazy"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "18px",
                    color: "rgb(34, 34, 36)",
                    mt: 1,
                  }}
                >
                  {author.name}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={Math.ceil(total / itemsPerPage)}
            disabled={isLoading || Math.ceil(total / itemsPerPage) < 2}
            onChange={handlePageChange}
            page={currentPage}
          />
        </Box>
      </Box>
    </>
  );
}

export default Authors;
