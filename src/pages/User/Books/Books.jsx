import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState, useRef, use } from "react";
import axiosInstance from "../../../apis/config.js";
import BookCard from "../../../components/Card/BookCard";
function UserBooks() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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

  console.log(books);
  return (
    <div>
      <h1>Books</h1>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      {books && books.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-5 g-4 text-center">
          {books.map((book) => (
            <div className="col" key={book._id}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      ) : (
        !isLoading && <div>No books found</div>
      )}
    </div>
  );
}

export default UserBooks;
