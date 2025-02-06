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
import {  MenuItem, Select, Box } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Delete';
import UserRating from "../../../components/Rating/UserRating";

const columns = [
  { _id: 1, label: "Book", align: "left", minWidth: 100 },
  { _id: 2, label: "Image", align: "center", minWidth: 100 },
  { _id: 3, label: "Author", align: "left", minWidth: 100 },
  { _id: 4, label: "Rating", align: "center", minWidth: 100 },
  { _id: 5, label: "Review", align: "center", minWidth: 150 },
  { _id: 6, label: "Status", align: "center", minWidth: 100 },
  { _id: 7, label: "Actions", align: "center", minWidth: 100 },
];

export default function UserBooks() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userbooks, setUserbooks] = useState([]);
  const id = localStorage.getItem("userId");
  useEffect(() => {
    async function fetchUserBooks() {
      const response = await axiosInstance.get(`/userbook/${id}`);
      console.log(response.data);
      setUserbooks(response.data);
    }
    fetchUserBooks();
  }, []);


  function handleReviewClick(bookId) {
    const book = userbooks.find((book) => book._id === bookId);
    if (book) {
      console.log("Review for book", book);
    }
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  function handleStatusChange(event, bookId) {
    const updatedStatus = event.target.value;
    axiosInstance
      .put(`/userbook/${bookId}`, { state: updatedStatus })
      .then((response) => {
        console.log("Status updated successfully", response.data);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  }

  function handleDelete(bookId) {
    axiosInstance
      .delete(`/userbook/${bookId}`)
      .then((response) => {
        console.log("Book deleted successfully", response.data);
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  }
  return (
    <Box sx={{ margin: "20px" }}>


    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column._id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userbooks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.book.title}</TableCell>
                  <TableCell align="center">
                    <img
                      src={row.book.img}
                      alt={row.book.title}
                      style={{ width: 50, height: 75 }}
                    />
                  </TableCell>
                  <TableCell>{row.book.author.name}</TableCell>
                  <TableCell align="center">
                    <UserRating userId={id} bookId={row.book._id} rating={row.rating} />
                  </TableCell>
                  <TableCell align="center">
                    {row.review ? (
                      row.review
                    ) : (

                        <AddCircleOutlineIcon seclassname="fas" className="fa-plus-circle" fontSize="small" 
                        onClick={() => handleReviewClick(row._id)} >
                      </AddCircleOutlineIcon>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Select
                      value={row.state}
                      onChange={(event) => handleStatusChange(event, row._id)}
                      displayEmpty
                    >
                      <MenuItem value="want to read">Want to Read</MenuItem>
                      <MenuItem value="is reading">Is Reading</MenuItem>
                      <MenuItem value="read">Read</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    <ClearIcon onClick={() => handleDelete(row._id)}></ClearIcon>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userbooks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Box>
  );
}
