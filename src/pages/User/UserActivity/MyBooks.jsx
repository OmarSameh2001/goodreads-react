import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/config";
import { Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Delete";
import UserRating from "../../../components/Rating/UserRating";
import ReviewLink from "../../../components/Reviews/ReviewLink";
import UserBooks from "../../../context/userBooks";
import BookState from "../../../components/Userbook/BookState";

const columns = [
  { _id: 1, label: "Book", align: "left", minWidth: 100 },
  { _id: 2, label: "Cover", align: "center", minWidth: 100 },
  { _id: 3, label: "Author", align: "left", minWidth: 100 },
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

  useEffect(() => {
    setUserBooks([...userBooks]);
  }, [userBooks.length]);
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
    <Box sx={{ margin: "20px" }}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column._id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <h4 className="b612-regular">{column.label}</h4>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userBooks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <h6 className="b612-regular">{row.book.title}</h6>
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src={row.book.img}
                        alt={row.book.title}
                        style={{ width: 50, height: 75 }}
                      />
                    </TableCell>
                    <TableCell>
                      {" "}
                      <h6
                        style={{ fontSize: "12px" }}
                        className="b612-regular-italic"
                      >
                        {row.book.author.name}{" "}
                      </h6>
                    </TableCell>
                    <TableCell align="center">
                      <UserRating
                        userId={id}
                        bookId={row.book._id}
                        rating={row.rating}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <ReviewLink
                        bookId={row.book._id}
                        review={row.review}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <BookState
                        userId={id}
                        bookId={row.book._id}
                        state={row.state}
                      />
                    </TableCell>
                    {/* Delete Button */}
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
                      ></ClearIcon>
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
        />
      </Paper>
    </Box>
  );
}
