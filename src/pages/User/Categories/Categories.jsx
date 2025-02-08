import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CategoryCard from "../../../components/Card/CategoryCard";
import Pagination from "@mui/material/Pagination";
import ReactPaginate from "react-paginate";
import axiosInstance from "../../../apis/config";
import { CircularProgress } from "@mui/material";

function Categories() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [intialLoad, setInitialLoad] = useState(true);
  const [total, setTotal] = useState(0);

  // Fetch paginated categories
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["categories", currentPage],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/categories/paginated?page=${currentPage}&limit=${itemsPerPage}`
      );
      console.log(res.data.data.items);
      setTotal(res.data.data.pagination.total);
      setInitialLoad(false);
      return res.data.data.items;
    },
  });

  if (intialLoad) return <CircularProgress />;
  if (error) return <p>Error fetching categories</p>;

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div>
        {isLoading ? <CircularProgress /> : categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>

      {/* Pagination Component */}
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Pagination
          count={Math.ceil(total / itemsPerPage)}
          disabled={isLoading || Math.ceil(total / itemsPerPage) < 2}
          onChange={handlePageChange}
          page={currentPage}
        />
      </div>
    </div>
  );
}

export default Categories;
