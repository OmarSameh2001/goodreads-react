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

function AdminAuthors() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [update, setUpdate] = useState({});
  const [isNew, setIsNew] = useState(false);
  const [newAuthor, setNewAuthor] = useState({});
  const token = localStorage.getItem("token");
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  console.log(token);

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
    setNewAuthor({});
    setImage(null);
  }

  function handleChange(e) {
    isNew
      ? setNewAuthor({ ...newAuthor, [e.target.name]: e.target.value })
      : setUpdate({ ...update, [e.target.name]: e.target.value });
    console.log(newAuthor);
  }


  function handleImage(e) {
    setImageLoading(true);
    const file = e.target.files[0];
    if (!file) {
      setImageLoading(false);
      return;
    }

    const maxSize = 4 * 1024 * 1024; // 4MB
    if (file.size > maxSize) {
      alert("Image size should be less than 4MB");
      setImageLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1]; // Extract Base64 content
      setImage(base64String);
      setImageLoading(false);

      handleChange({
        target: {
          name: e.target.name,
          value: base64String,
        },
      });
    };

    reader.onerror = () => {
      alert("Error loading image. Please try again.");
      setImageLoading(false);
    };

    reader.readAsDataURL(file);
  }

  
  async function handleDelete(id) {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this author?"
      );
      if (confirm) {
        await axios.delete(`http://localhost:3001/authors/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        <Snackbar
          open={true}
          autoHideDuration={2000}
          message="Author deleted"
        />;
        handleClose();
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEdit(e) {
    try {
      e.preventDefault();
      console.log(update);
      await axios.put(`http://localhost:3001/authors/${update._id}`, update, {
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
      console.log(newAuthor);
      const res = await axios.post("http://localhost:3001/authors", newAuthor, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res);
      handleClose();
      refetch();
    } catch (error) {
      console.log(error);
    }
  }

   
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/authors/paginated", {
        
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.data.items);
      return res.data.data.items;
    },
  });
  const columns = [
    { id: "Id", label: "Id", minWidth: 50, align: "left" },
    { id: "Photo", label: "Photo", minWidth: 50, align: "left" },
    {
      id: "Name",
      label: "Name",
      minWidth: 80,
      align: "left",
    },
    {
      id: "About",
      label: "About",
      minWidth: 170,
      align: "left",
    },
    {
      id: "Date of Birth",
      label: "Date of Birth",
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
    console.log(update);
  }, [update]);
  if (isLoading) {
    return (
      <div className="App-header" style={{ backgroundColor: "white" }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
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
            <h2 className="text-center mb-3">
              {isNew ? "Add" : "Edit"} {!isNew && update.name.split(" ")[0]}
            </h2>
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
            <form onSubmit={(e) => (isNew ? handleAdd(e) : handleEdit(e))}>
              <div className="mb-3">
                <input
                  type="name"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  value={update.name || newAuthor.name || ""}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  style={{ height: 100 }}
                  className="form-control"
                  placeholder="About"
                  name="about"
                  value={update.about || newAuthor.about || ""}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="date"
                  className="form-control"
                  placeholder="About"
                  name="DOB"
                  value={update.DOB?.split("T")[0] || newAuthor.DOB || ""}
                  onChange={(e) => handleChange(e)}
                  required
                />
                <input type="file" 
                className="form-control mb-3"
                 accept="image/*"
                  name="img" 
                  onChange={handleImage} />
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
              {data &&
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((author, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={author._id}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#ffffff" : "#ececec",
                      }}
                    >
                      <TableCell align="left">
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell align="left">
                        <a href={author.img || "https://via.placeholder.com/150"}
                           target="_blank"
                           rel="noreferrer">
                          {author.name.split(" ")[0]} Image
                        </a>
                      </TableCell>
                      <TableCell align="left">{author.name}</TableCell>
                      <TableCell align="left">{author.about}</TableCell>
                      <TableCell align="left">
                        {author?.DOB?.split("T")[0]}
                      </TableCell>
                      <TableCell align="left">
                        <FaPencilAlt
                          style={{
                            marginRight: 20,
                            cursor: "pointer",
                            scale: 1.5,
                          }}
                          onClick={() => setUpdate(author)}
                        />
                        <RiDeleteBinFill
                          style={{ cursor: "pointer", scale: 1.5 }}
                          onClick={() => handleDelete(author._id)}
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
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default AdminAuthors;
