import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState, useRef, use } from "react";
import axiosInstance from "../../../apis/config";
function UserBooks() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axiosInstance.get("/books");
        console.log(response.data);
        setBooks(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      setError(error);
    }
  }, []);

  return (
    <div>
      <h1>Books</h1>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      {books && books.length > 0 ? (
        <div>
          {books.map((book) => (
            <div key={book._id}>
              <h2>{book.title}</h2>
              <p>{book.author?.name || "Unknown Author"}</p>
              <p>{book.category?.name || "Uncategorized"}</p>
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
