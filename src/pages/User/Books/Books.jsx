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
import Search from "../../../components/Search/Search.jsx";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TbZoomReset } from "react-icons/tb";

function UserBooks() {
  const [books, setBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState(books);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const itemsPerPage = 5;
  const totalPages = Math.ceil(displayedBooks.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentBooks = displayedBooks.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [authorSearch, setAuthorSearch] = useState("");
  const [bookSearch, setBookSearch] = useState("");
  const [appliedBookSearch, setAppliedBookSearch] = useState("");

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedAuthors([]);
    setAuthorSearch("");
    setBookSearch("");
    navigate("/books", { replace: true });
  };
  // Update handlers to modify URL with IDs
  const handleAuthorSelect = (event, authorName) => {
    const newSelectedAuthors = event.target.checked
      ? [...selectedAuthors, authorName]
      : selectedAuthors.filter((name) => name !== authorName);

    setSelectedAuthors(newSelectedAuthors);

    const searchParams = new URLSearchParams(location.search);
    if (newSelectedAuthors.length > 0) {
      searchParams.set("authors", newSelectedAuthors.join(",")); //"," is encoded to %2C in the URL as commas are reserved characters in url.
    } else {
      searchParams.delete("authors");
    }
    //searchParams is an object which needs to be converted to a string.
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  const handleCategorySelect = (event, categoryName) => {
    const newSelectedCategories = event.target.checked
      ? [...selectedCategories, categoryName]
      : selectedCategories.filter((name) => name !== categoryName);

    setSelectedCategories(newSelectedCategories);

    const searchParams = new URLSearchParams(location.search);
    if (newSelectedCategories.length > 0) {
      searchParams.set("categories", newSelectedCategories.join(","));
    } else {
      searchParams.delete("categories");
    }
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  // Initialize state from URL params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const urlAuthorsNames = searchParams.get("authors")?.split(",") || [];
    //check if the category ids in url are valid if not set it to empty array
    const validAuthors = urlAuthorsNames.filter((name) =>
      authors.some((a) => a.name === name)
    );

    const urlCategoriesNames = searchParams.get("categories")?.split(",") || [];
    //check if the category ids in url are valid if not set it to empty array
    const validCategories = urlCategoriesNames.filter((name) =>
      categories.some((c) => c.name === name)
    );

    // Get book name directly from URL
    const urlBookName = searchParams.get("search") || "";
    setAppliedBookSearch(urlBookName);
    setSelectedAuthors(validAuthors);
    setSelectedCategories(validCategories);
  }, [location.search, authors, categories]);

  //handle filters
  useEffect(() => {
    const filteredBooks = books.filter((book) => {
      // Search filter
      const matchesSearch = book.title
        .toLowerCase()
        .includes(appliedBookSearch.toLowerCase());

      // Category filter (if any selected)
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(book.category?.name?.toString());

      // Author filter (if any selected)
      const matchesAuthor =
        selectedAuthors.length === 0 ||
        selectedAuthors.includes(book.author?.name?.toString());

      return matchesSearch && matchesCategory && matchesAuthor;
    });

    setDisplayedBooks(filteredBooks);
  }, [selectedCategories, selectedAuthors, books, appliedBookSearch]);

  //fetch authors , categories and books
  // Fetch authors
  const {
    data: authorsData,
    isLoading: authorsLoading,
    error: authorsError,
  } = useQuery({
    queryKey: ["authors"],
    queryFn: async () => (await axiosInstance.get("/authors/names")).data,
  });

  // Fetch categories
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      (await axiosInstance.get("/categories/names")).data.data,
  });

  // Fetch books
  const {
    data: booksData,
    isLoading: booksLoading,
    error: booksError,
  } = useQuery({
    queryKey: ["books"],
    queryFn: async () => (await axiosInstance.get("/books")).data,
  });

  // Derive combined loading and error states (use these in your render)
  useEffect(() => {
    setIsLoading(authorsLoading || categoriesLoading || booksLoading);
  }, [authorsLoading, categoriesLoading, booksLoading]);

  useEffect(() => {
    if (authorsError || categoriesError || booksError) {
      setError(authorsError || categoriesError || booksError);
    }
  }, [authorsError, categoriesError, booksError]);

  // Update local state when any query data arrives
  useEffect(() => {
    if (authorsData) setAuthors(authorsData);
    if (categoriesData) setCategories(categoriesData);
    if (booksData) {
      setBooks(booksData);
      setDisplayedBooks(booksData);
    }
  }, [authorsData, categoriesData, booksData]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div>
      <h1 className="BooksTitle">Books</h1>
      {isLoading && (
        <div className="text-center">
          <CircularProgress />
        </div>
      )}
      {error && <div>Error: {error.message}</div>}
      <div className="BooksGrid" style={{ minimumHeight: "100vh" }}>
        <div className="d-flex align-items-center gap-2">
          <h3>Filters</h3>
          <button className="btn btn-danger py-0 px-1">
            <TbZoomReset onClick={handleReset} />
          </button>
        </div>
        <div
          className="filters d-flex flex-wrap justify-content-center gap-1 mb-2"
          style={{ maxWidth: "100vw" }}
        >
          <Search
            bookSearch={bookSearch}
            setBookSearch={setBookSearch}
            appliedBookSearch={appliedBookSearch}
            setAppliedBookSearch={setAppliedBookSearch}
          />
            <div
              className="d-flex flex-column"
            >
              <Accordion style={{ width: "300px", height: "100%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgb(44, 62, 80)",
                      color: "white",
                      borderRadius: 1,
                    },
                  }}
                >
                  <Typography component="span">Authors</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    helperText="Search authors by name"
                    id="author-search-field"
                    label="Search Authors"
                    value={authorSearch}
                    onChange={(e) => setAuthorSearch(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                  />

                  {/* Only render authors when the search input is not empty */}
                  {authorSearch.trim() !== "" &&
                    authors
                      .filter((author) =>
                        author.name
                          .toLowerCase()
                          .includes(authorSearch.trim().toLowerCase())
                      )
                      .map((author) => (
                        <AccordionDetails key={author._id}>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={selectedAuthors.includes(
                                    author.name
                                  )}
                                  onChange={(e) =>
                                    handleAuthorSelect(e, author.name)
                                  }
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
                                  {author.name}
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
                </AccordionDetails>
              </Accordion>
              <Accordion style={{ width: "300px", height: "100%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgb(44, 62, 80)",
                      color: "white",
                      borderRadius: 1,
                    },
                  }}
                >
                  <Typography component="span">Categories</Typography>
                </AccordionSummary>
                {categories.map((category) => (
                  <AccordionDetails key={category._id}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedCategories.includes(category.name)}
                            onChange={(e) =>
                              handleCategorySelect(e, category.name)
                            }
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
        </div>

        {displayedBooks && displayedBooks.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-5 g-4 text-center mx-3 ">
            {currentBooks
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((book) => (
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
