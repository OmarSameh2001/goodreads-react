import { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../../apis/config";
import { GiCancel } from "react-icons/gi";
import {
  Switch,
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";

function EditUser({ user, setIsEditing, fetchUser }) {
  const [formValues, setFormValues] = useState({ ...user });
  const [formErrors, setFormErrors] = useState({
    fnameError: null,
    lnameError: null,
    emailError: null,
    usernameError: null,
    oldPasswordError: null,
    passwordError: null,
    confirmPasswordError: null,
  });
  const [isPassword, setIsPassword] = useState(false);

  const navigate = useNavigate();
  const id = localStorage.getItem("userId");

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleSwitch = () => {
    setIsPassword(!isPassword);
    setFormValues({
      ...formValues,
      password: "",
      confirmPassword: "",
      oldPassword: "",
    });
    setFormErrors({
      ...formErrors,
      passwordError: null,
      confirmPasswordError: null,
      oldPasswordError: null,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const cleanObject = (obj) =>
      Object.fromEntries(
        Object.entries(obj).filter(
          ([, value]) => value !== null && value !== undefined
        )
      );

    const payload = cleanObject({
      fName: formValues.fName === user.fName ? null : formValues.fName,
      lName: formValues.lName === user.lName ? null : formValues.lName,
      username: formValues.username === user.username ? null : formValues.username,
      email: formValues.email === user.email ? null : formValues.email,
      password:
        formValues.oldPassword === user.password ? null : formValues.oldPassword,
      newPassword:
        formValues.password === user.password ? null : formValues.password,
      emailVerified: formValues.email === user.email ? null : false,
    });

    try {
      await axiosInstance.put(`/auth/update-user/${id}`, payload);
      localStorage.setItem("userName", payload.username);
      if (user.email !== formValues.email) {
        localStorage.clear();
        navigate("/otp", { state: formValues });
      }
      handleClose();
      fetchUser();
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "colored",
        type: "error",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "fname":
        setFormValues({ ...formValues, fName: value });
        setFormErrors({
          ...formErrors,
          fnameError: value.length === 0 ? "First Name is required" : null,
        });
        break;
      case "lname":
        setFormValues({ ...formValues, lName: value });
        setFormErrors({
          ...formErrors,
          lnameError: value.length === 0 ? "Last Name is required" : null,
        });
        break;
      case "username":
        setFormValues({ ...formValues, username: value });
        setFormErrors({
          ...formErrors,
          usernameError: value.length === 0 ? "Username is required" : null,
        });
        break;
      case "email":
        setFormValues({ ...formValues, email: value });
        if (value.length === 0) {
          setFormErrors({ ...formErrors, emailError: "Email is required" });
        } else if (
          !value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        ) {
          setFormErrors({ ...formErrors, emailError: "Email is not valid" });
        } else {
          setFormErrors({ ...formErrors, emailError: null });
        }
        break;
      case "oldPassword":
        setFormValues({ ...formValues, oldPassword: value });
        if (value.length === 0) {
          setFormErrors({
            ...formErrors,
            oldPasswordError: "Password is required",
          });
        } else if (
          !value.match(
            /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[@%$#]))[A-Za-z\d@%$#]{8,}$/
          )
        ) {
          setFormErrors({
            ...formErrors,
            oldPasswordError:
              "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
          });
        } else {
          setFormErrors({ ...formErrors, oldPasswordError: null });
        }
        break;
      case "password":
        setFormValues({ ...formValues, password: value });
        if (value.length === 0) {
          setFormErrors({
            ...formErrors,
            passwordError: "Password is required",
          });
        } else if (
          !value.match(
            /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[@%$#]))[A-Za-z\d@%$#]{8,}$/
          )
        ) {
          setFormErrors({
            ...formErrors,
            passwordError:
              "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
          });
        } else {
          setFormErrors({ ...formErrors, passwordError: null });
        }
        break;
      case "confirmPassword":
        setFormValues({ ...formValues, confirmPassword: value });
        if (value.length === 0) {
          setFormErrors({
            ...formErrors,
            confirmPasswordError: "Confirm Password is required",
          });
        } else if (value !== formValues.password) {
          setFormErrors({
            ...formErrors,
            confirmPasswordError: "Passwords do not match",
          });
        } else {
          setFormErrors({ ...formErrors, confirmPasswordError: null });
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Modal open={true} onClose={handleClose} aria-labelledby="edit-user-modal">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            maxHeight: "90vh",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
            backdropFilter: "blur(5px)",
          }}
        >
          <Box sx={{ position: "relative", mb: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Edit {user.username}
            </Typography>
            <IconButton
              onClick={handleClose}
              sx={{ position: "absolute", top: 8, right: 8, color: "red" }}
            >
              <GiCancel size={24} />
            </IconButton>
          </Box>
          <Box component="form" onSubmit={handleUpdate} noValidate>
            <TextField
              label="First Name"
              name="fname"
              value={formValues.fName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={Boolean(formErrors.fnameError)}
              helperText={formErrors.fnameError}
            />
            <TextField
              label="Last Name"
              name="lname"
              value={formValues.lName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={Boolean(formErrors.lnameError)}
              helperText={formErrors.lnameError}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={Boolean(formErrors.emailError)}
              helperText={formErrors.emailError}
            />
            <TextField
              label="Username"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={Boolean(formErrors.usernameError)}
              helperText={formErrors.usernameError}
            />
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Typography>Change Password</Typography>
              <Switch color="warning" onChange={handleSwitch} />
            </Box>
            {isPassword && (
              <>
                <TextField
                  label="Old Password"
                  name="oldPassword"
                  type="password"
                  value={formValues.oldPassword || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={Boolean(formErrors.oldPasswordError)}
                  helperText={formErrors.oldPasswordError}
                />
                <TextField
                  label="New Password"
                  name="password"
                  type="password"
                  value={formValues.password || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={Boolean(formErrors.passwordError)}
                  helperText={formErrors.passwordError}
                />
                <TextField
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  value={formValues.confirmPassword || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={Boolean(formErrors.confirmPasswordError)}
                  helperText={formErrors.confirmPasswordError}
                />
              </>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={Object.values(formErrors).some((error) => error !== null)}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default EditUser;
