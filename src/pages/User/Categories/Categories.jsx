import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CategoryCard from "../../../components/Card/CategoryCard";
import Pagination from "@mui/material/Pagination";
import ReactPaginate from "react-paginate";
import axiosInstance from "../../../apis/config";

function Categories() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  // Fetch paginated categories
  const {
    data: categories,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories", currentPage],
    queryFn: async () => {
      console.log(currentPage);
      const res = await axiosInstance.get(
        `/categories/paginated?page=${currentPage}&limit=${itemsPerPage}`
      );
      console.log(res.data.data.items);
      setTotal(res.data.data.pagination.total);
      return res.data.data.items;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching categories</p>;

  // Handle page change
  const handlePageChange = (newPage) => {
    console.log(newPage.selected + 1);
    setCurrentPage(newPage.selected + 1);
    refetch();
  };

  return (
    <div className="container mt-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div>
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>

      {/* Pagination Component */}
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakLabel={"..."}
        pageCount={total / itemsPerPage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={"pagination justify-content-center mt-4"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Categories;
