import React, { useEffect, useState, useRef, use, useContext } from "react";
import axiosInstance from "../../../apis/config.js";
import BookCard from "../../../components/Card/BookCard";
import ReactPaginate from "react-paginate";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Books.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
function UserBooks() {
  const [books, setBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState(books);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentBooks = displayedBooks.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategorySelect = (event, categoryId) => {
    if (event.target.checked) {
      setSelectedCategories((prev) => [...prev, categoryId]);
    } else {
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
    }
  };

  // Add this useEffect to handle filtering whenever selectedCategories or books change
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setDisplayedBooks(books);
    } else {
      console.log(selectedCategories);
      const filteredBooks = books.filter((book) =>
        selectedCategories.includes(book.category?._id?.toString())
      );
      console.log(filteredBooks);
      setDisplayedBooks(filteredBooks);
    }
  }, [selectedCategories, books]);

  // Your existing data fetching useEffect remains the same
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axiosInstance.get("/categories/names");
        setCategories(categoryResponse.data.data);
        const response = await axiosInstance.get("/books");
        setBooks(response.data);
        setDisplayedBooks(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  return (
    <div>
      <h1>Books</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <div className="BooksGrid">
        <div className="filters m-5">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Authors</Typography>
            </AccordionSummary>
            <AccordionDetails></AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span">Categories</Typography>
            </AccordionSummary>
            {categories.map((category) => (
              <AccordionDetails key={category._id}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedCategories.includes(category._id)}
                        onChange={(e) => handleCategorySelect(e, category._id)}
                        icon={<CheckCircleOutlineIcon />}
                        checkedIcon={<CheckCircleIcon />}
                        color="primary"
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 28,
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="body1"
                        sx={{
                          ml: 1,
                          fontWeight: 600,
                          color: "text.primary",
                        }}
                      >
                        {category.name}
                      </Typography>
                    }
                    sx={{
                      "&:hover": {
                        backgroundColor: "action.hover",
                        borderRadius: 1,
                      },
                      p: 1,
                      m: 0,
                    }}
                  />
                </FormGroup>
              </AccordionDetails>
            ))}
          </Accordion>
        </div>

        {displayedBooks && displayedBooks.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-5 g-4 text-center m-5">
            {currentBooks.map((book) => (
              <div className="col" key={book._id}>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        ) : (
          !isLoading && <div>No books found</div>
        )}
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

export default UserBooks;
