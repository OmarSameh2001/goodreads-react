import React, { useState } from "react";
import AuthorCard from "../../../components/Card/AuthorCard ";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactPaginate from "react-paginate";
import axiosInstance from "../../../apis/config";

function Authors() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const { data: authors, error, isLoading} = useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const res = await axiosInstance.get("/authors/");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching authors</p>;



  const totalPages = Math.ceil(authors.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentAuthors = authors.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-2xl font-bold mb-4">Authors</h1>
      <div className="d-flex justify-content-center align-items-center">
        {currentAuthors.map((author) => (
          <AuthorCard key={author._id} author={author} />
        ))}
      </div>



      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakLabel={"..."}
        pageCount={totalPages}
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

export default Authors
