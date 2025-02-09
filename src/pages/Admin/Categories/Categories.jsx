import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Button,
  TextField,
  Typography,
  Fab,
  Pagination,
  TablePagination,
} from "@mui/material";
import { Edit, Delete, Add, Close } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../apis/config";
import { useQuery } from "@tanstack/react-query";
import { IoMdAddCircle } from "react-icons/io";

function AdminCategories() {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {
    data: categories,
    error: fetchError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories", page, rowsPerPage],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/categories/paginated?page=${page}&limit=${rowsPerPage}`
      );
      console.log(res);
      setTotal(res.data.data.pagination.total);
      return res.data.data.items;
    },
  });

  const handleSave = async () => {
    if (!formData.name || !formData.description ) {
      setError("All fields are required");
      return;
    }
    try {
      if (editMode) {
        await axiosInstance.put(`/categories/${editId}`, formData);
      } else {
        await axiosInstance.post("/categories", formData);
      }
      refetch();
      handleClose();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this category?"
      );
      if (confirm) {
        await axiosInstance.delete(`/categories/${id}`);
        refetch();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleOpen = (category = null) => {
    setEditMode(!!category);
    setEditId(category?._id || null);
    setFormData({
      name: category?.name || "",
      description: category?.description || "",
      image: category?.image || "",
    });
    setError("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ name: "", description: "", image: "" });
    setEditMode(false);
    setEditId(null);
    setError("");
  };

  const handlePageChange = (event, value) => {
    setPage(value + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  return (
    <div style={{ position: "relative" }}  className="d-flex flex-column align-items-center justify-content-center">
      <IoMdAddCircle
        style={{ scale: 2, cursor: "pointer", margin: 20 }}
        onClick={() => handleOpen()}
      />
      <Paper sx={{ width: "90%", overflow: "hidden", marginX: 10 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: "#111", color: "#fff" }}>
              <TableRow>
                <TableCell style={{ color: "#fff" }}>ID</TableCell>
                <TableCell style={{ color: "#fff" }}>Name</TableCell>
                <TableCell style={{ color: "#fff" }}>Description</TableCell>
                <TableCell style={{ color: "#fff" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories &&
                categories.map((category, index) => (
                  <TableRow
                    key={category._id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#ececec",
                    }}
                  >
                    <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>
                      {" "}
                      {/* style={{ display: "flex", gap: "10px" }} */}
                      <IconButton
                        style={{ color: "black" }}
                        onClick={() => handleOpen(category)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        style={{ color: "black" }}
                        onClick={() => handleDelete(category._id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          count={total}
          page={page - 1}
          onPageChange={handlePageChange}
          rowsPerPageOptions={
            total > 25 ? [10, 25, 100] : total > 10 ? [10, 25] : [10]
          }
          component="div"
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h6">
            {editMode ? "Edit Category" : "Add Category"}
          </Typography>
          <IconButton onClick={handleClose} color="error">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Category Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Description"
            fullWidth
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            {editMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminCategories;
