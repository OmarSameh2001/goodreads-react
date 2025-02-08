import React, { use, useEffect, useState } from "react";
import AuthorCard from "../../../components/Card/AuthorCard ";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactPaginate from "react-paginate";
import axiosInstance from "../../../apis/config";
import { CircularProgress, Pagination } from "@mui/material";

function Authors() {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [intialLoading, setInitialLoading] = useState(true);
  const itemsPerPage = 5;

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

  if (intialLoading)
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <CircularProgress />
      </div>
    );
  if (error) return <p>Error fetching authors</p>;

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container mt-4 d-flex flex-column justify-content-center">
      <h1 className="text-2xl font-bold mb-4 text-center">Authors</h1>
      <div className="d-flex justify-content-center align-items-center">
        {isLoading ? (
          <CircularProgress />
        ) : (
          authors?.map((author) => (
            <AuthorCard key={author._id} author={author} />
          ))
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
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

export default Authors;
