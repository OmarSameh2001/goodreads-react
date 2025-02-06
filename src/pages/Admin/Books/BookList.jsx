import { useEffect, useState } from "react";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div>
      <h2>Available Books</h2>
      {books.map((book) => (
        <div key={book._id}>
          <h3>{book.title}</h3>
          {book.pdfUrl && (
            <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">
              Read PDF
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookList;
