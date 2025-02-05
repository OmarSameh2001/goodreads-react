import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../../apis/config";
import { GiCancel } from "react-icons/gi";
import { Switch } from "@mui/material";

function EditUser({ user, setIsEditing, fetchUser }) {
  const [formValues, setFormValues] = useState({
    ...user,
  });
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

  function handleClose() {
    setIsEditing(false);
  }
  function handleSwitch() {
    setIsPassword(!isPassword);
    setFormValues({ ...formValues, password: "", confirmPassword: "", oldPassword: "" });
    setFormErrors({
      ...formErrors,
      passwordError: null,
      confirmPasswordError: null,
      oldPasswordError: null,
    });
  }
  async function handleUpdate(e) {
    try {
      e.preventDefault();
      const cleanObject = (obj) => {
        return Object.fromEntries(
          Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined)
        );
      };
      
      const payload = cleanObject({
        fName: formValues.fName === user.fName ? null : formValues.fName,
        lName: formValues.lName === user.lName ? null : formValues.lName,
        username: formValues.username === user.username ? null : formValues.username,
        email: formValues.email === user.email ? null : formValues.email,
        password: formValues.oldPassword === user.password ? null : formValues.oldPassword,
        newPassword: formValues.password === user.password ? null : formValues.password,
        emailVerified: formValues.email === user.email ? null : false,
      });
      
      await axiosInstance.put(`/auth/update-user/${id}`, payload);
      if(user.email !== formValues.email){
        localStorage.clear();
        navigate("/otp", { state: formValues });
      }
      
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "colored",
        type: "error",
      });
    }
  }
  function handleChange(e) {
    if (e.target.name === "fname") {
      setFormValues({ ...formValues, fName: e.target.value });
      setFormErrors({
        ...formErrors,
        fnameError:
          e.target.value.length === 0 ? "First Name is required" : null,
      });
    }
    if (e.target.name === "lname") {
      setFormValues({ ...formValues, lName: e.target.value });
      setFormErrors({
        ...formErrors,
        lnameError:
          e.target.value.length === 0 ? "Last Name is required" : null,
      });
    }
    if (e.target.name === "username") {
      setFormValues({ ...formValues, username: e.target.value });
      setFormErrors({
        ...formErrors,
        usernameError:
          e.target.value.length === 0 ? "Username is required" : null,
      });
    }
    if (e.target.name === "email") {
      setFormValues({ ...formValues, email: e.target.value });
      setFormErrors({
        ...formErrors,
        emailError: e.target.value.length === 0 ? "Email is required" : null,
      });
      setFormErrors({
        ...formErrors,
        emailError: e.target.value.match(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        )
          ? null
          : "Email is not valid",
      });
    }
    if (e.target.name === "oldPassword") {
        setFormValues({ ...formValues, oldPassword: e.target.value });
        setFormErrors({
          ...formErrors,
          passwordError:
            e.target.value.length === 0 ? "Password is required" : null,
        });
        setFormErrors({
          ...formErrors,
          oldPasswordError: e.target.value.match(
            /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[@%$#]))[A-Za-z\d@%$#]{8,}$/
          )
            ? null
            : "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
        });
      }
    if (e.target.name === "password") {
      setFormValues({ ...formValues, password: e.target.value });
      setFormErrors({
        ...formErrors,
        passwordError:
          e.target.value.length === 0 ? "Password is required" : null,
      });
      setFormErrors({
        ...formErrors,
        passwordError: e.target.value.match(
          /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[@%$#]))[A-Za-z\d@%$#]{8,}$/
        )
          ? null
          : "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
      });
    }
    if (e.target.name === "confirmPassword") {
      setFormValues({ ...formValues, confirmPassword: e.target.value });
      setFormErrors({
        ...formErrors,
        confirmPasswordError:
          e.target.value.length === 0 ? "Confirm Password is required" : null,
      });
      setFormErrors({
        ...formErrors,
        confirmPasswordError:
          e.target.value === formValues.password
            ? null
            : "Passwords do not match",
      });
    }
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
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
          style={{ width: "400px", backdropFilter: "blur(5px)", maxHeight: "90vh", overflowY: "auto" }}
        >
          <h2 className="text-center mb-3">Edit {user.username}</h2>
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
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
                <label className="form-label">First Name</label>
              <input
                className="form-control"
                placeholder="First Name"
                value={formValues.fName}
                name="fname"
                onChange={handleChange}
                required
              />
              {formErrors.fnameError && (
                <div className="text-danger">{formErrors.fnameError}</div>
              )}
            </div>
            <div className="mb-3">
            <label className="form-label">Last Name</label>
              <input
                className="form-control"
                placeholder="Last Name"
                value={formValues.lName}
                name="lname"
                onChange={handleChange}
                required
              />
              {formErrors.lnameError && (
                <div className="text-danger">{formErrors.lnameError}</div>
              )}
            </div>
            <div className="mb-3">
            <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                value={formValues.email}
                name="email"
                onChange={handleChange}
              />
              {formErrors.emailError && (
                <div className="text-danger">{formErrors.emailError}</div>
              )}
            </div>
            <div className="mb-1">
            <label className="form-label">User-Name</label>
              <input
                className="form-control"
                placeholder="Username"
                value={formValues.username}
                name="username"
                onChange={handleChange}
              />
              {formErrors.usernameError && (
                <div className="text-danger">{formErrors.usernameError}</div>
              )}
            </div>
            <div>
            <label>Change Password</label>
            <Switch color="warning" onChange={handleSwitch} />
            </div>
            {isPassword && (
              <>
                <div className="mb-3">
                <label className="form-label">Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Old Password"
                    value={formValues.oldPassword}
                    name="oldPassword"
                    onChange={handleChange}
                  />
                  {formErrors.oldPasswordError && (
                    <div className="text-danger">
                      {formErrors.oldPasswordError}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    value={formValues.newPassword}
                    name="password"
                    onChange={handleChange}
                  />
                  {formErrors.passwordError && (
                    <div className="text-danger">
                      {formErrors.passwordError}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={formValues.confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange}
                  />
                  {formErrors.confirmPasswordError && (
                    <div className="text-danger">
                      {formErrors.confirmPasswordError}
                    </div>
                  )}
                </div>
              </>
            )}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={Object.values(formErrors).some(
                (error) => error !== null
              )}
            >
              Update
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditUser;
