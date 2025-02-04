import axios from "axios";
import React, { useEffect, useState, useRef, use, useContext } from "react";
import axiosInstance from "../../../apis/config.js";
import BookCard from "../../../components/Card/BookCard";
import BooksContext from "../../../context/books";
import ReactPaginate from "react-paginate";
function UserBooks() {
  const { books, setBooks } = useContext(BooksContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentBooks = books.slice(startIndex, startIndex + itemsPerPage);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/books");
        console.log(response.data);
        setBooks(response.data);
      } catch (error) {
        setError(error); // Properly catch errors
      } finally {
        setIsLoading(false); // Ensure loading state is updated
      }
    };

    fetchData();
  }, []);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  console.log(books);
  return (
    <div>
      <h1>Books</h1>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      {books && books.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-5 g-4 text-center">
          {currentBooks.map((book) => (
            <div className="col" key={book._id}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      ) : (
        !isLoading && <div>No books found</div>
      )}
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

export default UserBooks;
