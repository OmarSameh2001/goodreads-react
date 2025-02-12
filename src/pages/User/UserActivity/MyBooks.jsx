import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import axiosInstance from "../../../apis/config";
import { Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Delete";
import UserRating from "../../../components/Rating/UserRating";
import ReviewLink from "../../../components/Reviews/ReviewLink";
import UserBooks from "../../../context/userBooks";
import BookState from "../../../components/Userbook/BookState";
import { useNavigate } from "react-router";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import "./MyBooks.css";

const columns = [
  { _id: 1, label: "Book", align: "left", minWidth: 100 },
  { _id: 2, label: "Cover", align: "center", minWidth: 100 },
  // { _id: 3, label: "Author", align: "left", minWidth: 100 },
  { _id: 4, label: "Rating", align: "center", minWidth: 100 },
  { _id: 5, label: "Review", align: "center", minWidth: 50, maxWidth: 50 },
  { _id: 6, label: "Status", align: "center", minWidth: 100 },
  { _id: 7, label: "Actions", align: "center", minWidth: 100 },
];

export default function MyBooks() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const id = localStorage.getItem("userId");
  const { userBooks, setUserBooks } = React.useContext(UserBooks);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setUserBooks([...userBooks]);
  // }, [userBooks?.length]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleDelete(UserBookId) {
    axiosInstance
      .delete(`/userbook/${UserBookId}`)
      .then((response) => {
        // Remove the deleted userbook from the local state
        setUserBooks((prevUserBooks) =>
          prevUserBooks.filter((userbook) => userbook._id !== UserBookId)
        );
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  }

  return (
    <div className="MyBooks-Wrapper">
      {/* Hero Section */}
      <Box
        sx={{
          padding: "20px",
          textAlign: "center",
          marginBottom: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <h2
          className="b612-regular"
          style={{ color: "#000", fontSize: "24px" }}
        >
          My Books Library
        </h2>
        <h4 className="b612-regular-italic" style={{ color: "gray" }}>
          Explore and manage your favorite books.
        </h4>
        <Box sx={{ mt: 2 }}>
          <LocalLibraryIcon sx={{ fontSize: 90, color: "rgba(148,187,233)" }} />
        </Box>
      </Box>

      {/* Table Section */}
      <Box sx={{ margin: "20px" }}>
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            borderRadius: 2,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow
                  sx={{
                    background:
                      // "linear-gradient(90deg, rgba(238,174,202,1) 0% 100%)",
                      "rgba(14dd8,187,233)",
                    "& th": { backgroundColor: "transparent" },
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column._id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <h4
                        className="b612-regular"
                        style={{ color: "#000", margin: 0 }}
                      >
                        {column.label}
                      </h4>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>

                {/* handle null value in table */}
                {(Array.isArray(userBooks) ? userBooks : [])
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      key={row._id}
                      sx={{
                        backgroundColor: index % 2 === 0 ? "#f7f7f7" : "#fff",
                        "&:hover": {
                          backgroundColor: "#e0e0e0",
                        },
                      }}
                    >
                      <TableCell
                        onClick={() => navigate(`/bookDetails/${row.book._id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <h6
                          className="b612-regular"
                          style={{ color: "#000", margin: 0, fontSize: "14px" }}
                        >
                          {row.book.title}
                        </h6>
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => navigate(`/bookDetails/${row.book._id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={row.book.img}
                          alt={row.book.title}
                          style={{ width: 50, height: 75 }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <UserRating
                          userId={id}
                          bookId={row.book._id}
                          rating={row.rating}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <ReviewLink bookId={row.book._id} review={row.review} />
                      </TableCell>
                      <TableCell align="center">
                        <BookState
                          userId={id}
                          bookId={row.book._id}
                          state={row.state}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <ClearIcon
                          sx={{
                            cursor: "pointer",
                            fontSize: 25,
                            transition: "0.3s",
                            "&:hover": {
                              transform: "scale(1.2)",
                              color: "gray",
                            },
                            "&:active": {
                              transform: "scale(0.9)",
                              color: "secondary.main",
                            },
                          }}
                          onClick={() => handleDelete(row._id)}
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
            count={userBooks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ color: "#000" }}
          />
        </Paper>
      </Box>
    </div>
  );
}
