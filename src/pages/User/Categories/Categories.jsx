import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CategoryCard from "../../../components/Card/CategoryCard";
import Pagination from "@mui/material/Pagination";

function Categories() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const token = localStorage.getItem("token");

  // Fetch paginated categories
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories", currentPage],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3001/categories/paginated?page=${currentPage}&limit=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching categories</p>;

  // Handle page change
  const handlePageChange = (_, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="row flex-stretch d-flex justify-content-center">
        {data.items.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination
        count={data.totalPages} // Use total pages from API
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </div>
  );
}

export default Categories;
