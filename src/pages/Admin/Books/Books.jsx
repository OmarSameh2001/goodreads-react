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
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { IoMdAddCircle } from "react-icons/io";
import { RiDeleteBinFill } from "react-icons/ri";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axiosInstance from "../../../apis/config";

function AdminBooks() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(1);
  const [update, setUpdate] = useState({});
  const [isNew, setIsNew] = useState(false);
  const [newBook, setNewBook] = useState({});
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  function handleClose() {
    setUpdate({});
    setIsNew(false);
    setNewBook({});
    setImage(null);
  }

  function handleImage(e) {
    setImageLoading(true);
    const file = e.target.files[0];
    const maxSize = 4 * 1024 * 1024; // 4MB
    if (file.size > maxSize) {
      alert("Image size should be less than 4MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
      setImage(base64String);
      setImageLoading(false);
      const event = {
        target: {
          name: e.target.name,
          value: base64String,
        },
      };
      handleChange(event);
    };

    reader.readAsDataURL(file);
  }
  function handleChange(e) {
    console.log(e.target.name, e.target.value);
    isNew
      ? setNewBook({
          ...newBook,
          [e.target.name]: e.target.value,
        })
      : setUpdate({
          ...update,
          [e.target.name]: e.target.value,
        });
  }

  async function handleDelete(id) {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this Book?"
      );
      if (confirm) {
        await axiosInstance.delete(`/books/${id}`
        );
        <Snackbar open={true} autoHideDuration={2000} message="Book deleted" />;
        handleClose();
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleIds(author, category) {
    console.log(author, category);
    let newAuthor, newCategory;
    let bookObj = isNew ? { ...newBook } : { ...update };
    if (author && !authors.name) {
      newAuthor = authors.find((auth) => auth.name === author);
      if (newAuthor) bookObj = { ...bookObj, author: newAuthor._id };
    }
    if (category && !categories.name) {
      newCategory = categories.data.find((categ) => categ.name === category);
      if (newCategory) bookObj = { ...bookObj, category: newCategory._id };
    }
    console.log(bookObj);
    return bookObj;
  }

  async function handleUpdate(e) {
    try {
      setUploadLoading(true);
      e.preventDefault();
      const body = handleIds(update.author, update.category);
      await axiosInstance.put(`/books/${update._id}`, body);
      handleClose();
      setUploadLoading(false);
      refetch();
    } catch (error) {
      setUploadLoading(false);
      console.log(error);
    }
  }

  async function handleAdd(e) {
    try {
      setUploadLoading(true);
      e.preventDefault();
      const body = handleIds(newBook.author, newBook.category);
      await axiosInstance.post("/books", body);
      handleClose();
      setUploadLoading(false);
      refetch();
    } catch (error) {
      setUploadLoading(false);
      alert(error.response.data.message);
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
      const res = await axiosInstance.get("/authors/names");
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
      const res = await axiosInstance.get("/categories/names");
      return res.data;
    },
  });
  const {
    data: books,
    isLoading: bookLoading,
    isError: bookError,
    refetch,
  } = useQuery({
    queryKey: ["books", page, rowsPerPage],
    queryFn: async () => {
      const res = await axiosInstance.get(`/books/paginated?page=${page}&limit=${rowsPerPage}`);
      setTotal(res.data.data.pagination.total);
      return res.data.data.items;
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
  

  console.log(total);
  if (authorLoading || categoryLoading || bookLoading) {
    return (
      <div className="App-header" style={{ backgroundColor: "white" }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div  className="d-flex flex-column align-items-center justify-content-center">
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
                <label htmlFor="photo" className="form-label">
                  Photo
                </label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Photo"
                  name="img"
                  accept="image/*"
                  onChange={(e) => handleImage(e)}
                  max={1}
                />
                {imageLoading ? (
                  <CircularProgress />
                ) : image || update.img ? (
                  <img
                    src={image ? `data:image/png;base64,${image}` : update.img}
                    alt="Uploaded"
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      maxHeight: 200,
                      marginTop: 5,
                      borderRadius: 3,
                    }}
                  />
                ) : null}
                {/* <button
                  className="btn btn-primary mt-2"
                  disabled={!image}
                >
                  {imageLoading ? <CircularProgress /> : "Upload"}
                </button> */}
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
                  onChange={(e, value) =>
                    handleChange({ target: { name: "author", value } })
                  }
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
                  onChange={(e, value) =>
                    handleChange({ target: { name: "category", value } })
                  }
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
              <button className="btn btn-primary w-100" type="submit" disabled={uploadLoading}>
                {isNew ? "Add" : "Update"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
      <IoMdAddCircle
        style={{ scale: 2, cursor: "pointer", margin: 20 }}
        onClick={() => setIsNew(true)}
      />
      <Paper sx={{ width: "90%", overflow: "hidden", marginX: 10 }}>
        <TableContainer>
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
              {books &&
                books
                  .map((book, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={book._id}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#ffffff" : "#ececec",
                      }}
                    >
                      <TableCell align="left">
                        {(page-1) * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell align="left">
                        <a
                          href={book.img || "https://via.placeholder.com/150"}
                          target="_blank"
                          rel="noreferrer"
                        >
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
          rowsPerPageOptions={
            total > 25 ? [10, 25, 100] : total > 10 ? [10, 25] : [10]
          }
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default AdminBooks;
