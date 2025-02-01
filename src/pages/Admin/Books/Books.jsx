import {
  CircularProgress,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { use, useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { IoMdAddCircle } from "react-icons/io";
import { RiDeleteBinFill } from "react-icons/ri";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function AdminBooks() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [update, setUpdate] = useState({});
  const [isNew, setIsNew] = useState(false);
  const [newBook, setNewBook] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleClose() {
    setUpdate({});
    setIsNew(false);
    setNewBook({});
  }

  function handleChange(e) {
    console.log(e.target.name, e.target.value);
    isNew
      ? setNewBook({ ...newBook, [e.target.name]: e.target.value })
      : setUpdate({ ...update, [e.target.name]: e.target.value });
  }

  async function handleDelete(id) {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this Book?"
      );
      if (confirm) {
        await axios.delete(`http://localhost:3001/books/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        <Snackbar open={true} autoHideDuration={2000} message="Book deleted" />;
        handleClose();
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleIds(author, category) {
    console.log(author, category)
    let newAuthor, newCategory;
    let bookObj = isNew ? {...newBook} : {...update}
    if(author && !authors.name) {
        newAuthor = authors.find(auth => auth.name === author)
        if(newAuthor) bookObj = {...bookObj, author: newAuthor._id}
    };
    if(category && !categories.name) {
        newCategory = categories.data.find(categ => categ.name === category)
        if(newCategory) bookObj = {...bookObj, category: newCategory._id}  
    };
    console.log(bookObj)
    return bookObj
  }

  async function handleUpdate(e) {
    try {
      e.preventDefault();
      const body = handleIds(update.author, update.category);
      await axios.put(`http://localhost:3001/books/${update._id}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      handleClose();
      refetch();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAdd(e) {
    try {
      e.preventDefault();
      const body = handleIds(newBook.author, newBook.category);
      console.log(newBook);
      await axios.post("http://localhost:3001/books", body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      handleClose();
      refetch();
    } catch (error) {
        alert(error.response.data.message)
      console.log(error);
    }
  }

  const {
    data: authors,
    isLoading: authorLoading,
    isError: authorError,
  } = useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/authors/names", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    },
  });
  const {
    data: categories,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    },
  });
  const {
    data: books,
    isLoading: bookLoading,
    isError: bookError,
    refetch,
  } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/books", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    },
  });
  const columns = [
    { id: "Id", label: "Id", minWidth: 50, align: "left" },
    { id: "Photo", label: "Photo", minWidth: 50, align: "left" },
    {
      id: "Title",
      label: "Title",
      minWidth: 80,
      align: "left",
    },
    {
      id: "Description",
      label: "Description",
      minWidth: 170,
      align: "left",
    },
    {
      id: "Author",
      label: "Author",
      minWidth: 170,
      align: "left",
    },
    {
      id: "Category",
      label: "Category",
      minWidth: 170,
      align: "left",
    },
    {
      id: "Rate",
      label: "Rate",
      minWidth: 170,
      align: "left",
    },
    {
      id: "Edition",
      label: "Edition",
      minWidth: 170,
      align: "left",
    },
    {
      id: "Views",
      label: "Views",
      minWidth: 170,
      align: "left",
    },
    {
      id: "Actions",
      label: "Actions",
      minWidth: 170,
      align: "left",
    },
  ];
  useEffect(() => {
      console.log(newBook)
  }, [newBook])
  useEffect(() => {
      console.log(update)
  }, [update])
  if (authorLoading || categoryLoading || bookLoading) {
    return (
      <div className="App-header" style={{ backgroundColor: "white" }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div>
      {update._id || isNew ? (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ zIndex: 9999 }}
        >
          <div
            className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"
            style={{ backdropFilter: "blur(10px)" }}
          ></div>
          <div
            className="position-relative bg-white p-4 rounded-4 shadow-lg"
            style={{ width: "350px", backdropFilter: "blur(5px)" }}
          >
            <h2 className="text-center mb-3">{isNew ? "Add" : "Edit"} Book</h2>
            <GiCancel
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                scale: 2,
                cursor: "pointer",
                color: "red",
              }}
              onClick={handleClose}
            />
            <form onSubmit={(e) => (isNew ? handleAdd(e) : handleUpdate(e))}>
              <div className="mb-1">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="name"
                  className="form-control"
                  placeholder="Title"
                  name="title"
                  value={update.title || newBook.title || ""}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="mb-1">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  style={{ height: 100 }}
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  value={update.description || newBook.description || ""}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="mb-1">
                <label htmlFor="author" className="form-label">
                  Author
                </label>
                <Autocomplete
                  disablePortal
                  defaultValue={update?.author?.name || ""}
                  options={authors?.map((author) => author.name)}
                  onChange={(e, value) => handleChange({target: {name: 'author', value}})}
                  name="author"
                  required
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Author" />
                  )}
                />
              </div>
              <div className="mb-1">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <Autocomplete
                  disablePortal
                  defaultValue={update?.category?.name || ""}
                  options={categories?.data?.map((category) => category.name)}
                  onChange={(e, value) => handleChange({target: {name: 'category', value}})}
                  name="category"
                  required
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Category" />
                  )}
                />
              </div>
              <div className="mb-1">
                <label htmlFor="edition" className="form-label">
                  Edition
                </label>
                <input
                  type="name"
                  className="form-control"
                  placeholder="Edition"
                  name="edition"
                  value={update.edition || newBook.edition || ""}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <button className="btn btn-primary w-100" type="submit">
                {isNew ? "Add" : "Update"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
      <IoMdAddCircle
        style={{ scale: 2, cursor: "pointer", marginBottom: 20 }}
        onClick={() => setIsNew(true)}
      />
      <Paper sx={{ width: "90%", overflow: "hidden", marginX: 10 }}>
        <TableContainer >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "black",
                      color: "#ffffff",
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {books
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((book, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={book._id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#ececec",
                    }}
                  >
                    <TableCell align="left">
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell align="left">
                      <a href={book.img} target="_blank" rel="noreferrer">
                        Book's Image
                      </a>
                    </TableCell>
                    <TableCell align="left">{book.title}</TableCell>
                    <TableCell align="left">{book.description}</TableCell>
                    <TableCell align="left">
                      {book?.author?.name || "N/A"}
                    </TableCell>
                    <TableCell align="left">
                      {book?.category?.name || "N/A"}
                    </TableCell>
                    <TableCell align="left">
                      {book.totalRate / book.totalRateCount || 0}
                    </TableCell>
                    <TableCell align="left">{book.edition}</TableCell>
                    <TableCell align="left">{book.views}</TableCell>
                    <TableCell align="left">
                      <FaPencilAlt
                        style={{
                          marginRight: 20,
                          cursor: "pointer",
                          scale: 1.5,
                        }}
                        onClick={() => setUpdate(book)}
                      />
                      <RiDeleteBinFill
                        style={{ cursor: "pointer", scale: 1.5 }}
                        onClick={() => handleDelete(book._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={books.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default AdminBooks;
