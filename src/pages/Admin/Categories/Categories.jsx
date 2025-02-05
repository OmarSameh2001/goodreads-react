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
} from "@mui/material";
import { Edit, Delete, Add, Close } from "@mui/icons-material";
import axios from "axios";
import React, { useState, useEffect } from "react";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
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
  const itemsPerPage = 6;
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/categories/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(response.data.data.items || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  // add w update
  const handleSave = async () => {
    if (!formData.name || !formData.description || !formData.image) {
      setError("All fields are required");
      return;
    }
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:3001/categories/${editId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post("http://localhost:3001/categories", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchCategories();
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
        await axios.delete(`http://localhost:3001/categories/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchCategories();
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
    setPage(value);
  };
  const paginatedCategories = categories.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div style={{ padding: "20px", position: "relative" }}>
      <Fab
        size="small"
        style={{ backgroundColor: "black", color: "white" }}
        aria-label="add"
        onClick={() => handleOpen()}
      >
        <Add />
      </Fab>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead style={{ backgroundColor: "#111", color: "#fff" }}>
            <TableRow>
              <TableCell style={{ color: "#fff" }}>ID</TableCell>
              <TableCell style={{ color: "#fff" }}>Name</TableCell>
              <TableCell style={{ color: "#fff" }}>Description</TableCell>
              <TableCell style={{ color: "#fff" }}>Image</TableCell>
              <TableCell style={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCategories &&
              paginatedCategories.map((category, index) => (
                <TableRow key={category._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <img
                      src={category.image}
                      alt={category.name}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </TableCell>
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
      <Pagination
        count={Math.ceil(categories.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
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
          <TextField
            label="Image URL"
            fullWidth
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
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
