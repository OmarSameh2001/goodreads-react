import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Register() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [fname, setFname] = useState("");
  // const [lname, setLname] = useState("");
  // const [username, setUsername] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [formValues, setFormValues] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    fnameError: null,
    lnameError: null,
    emailError: null,
    usernameError: null,
    passwordError: null,
    confirmPasswordError: null,
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister();
  }
  async function handleRegister() {
    try {
      const res = await axios.post("http://localhost:3001/auth/register", {
        fName: formValues.fname,
        lName: formValues.lname,
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      });
      navigate("/otp", { state: formValues });
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "colored",
        type: "error",
      });
    }
  }
  function handleChange(e) {
    if (e.target.name === "fname") {
      setFormValues({ ...formValues, fname: e.target.value });
      setFormErrors({
        ...formErrors,
        fnameError:
          e.target.value.length === 0 ? "First Name is required" : null,
      });
    }
    if (e.target.name === "lname") {
      setFormValues({ ...formValues, lname: e.target.value });
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
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container form-box">
      <h2>Registeration Page</h2>
      <hr />

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label text-start d-block"
            >
              First Name
            </label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Please type your name..."
              value={formValues.fname}
              name="fname"
              onChange={handleChange}
            />
          </div>
          {formErrors.fnameError && (
            <div id="emailHelp" className="form-text text-danger">
              {formErrors.fnameError}
            </div>
          )}
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label text-start d-block"
            >
              Last Name
            </label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Please type your name..."
              value={formValues.lname}
              name="lname"
              onChange={handleChange}
            />
          </div>
          {formErrors.lnameError && (
            <div id="emailHelp" className="form-text text-danger">
              {formErrors.lnameError}
            </div>
          )}
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label text-start d-block"
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            value={formValues.email}
            name="email"
            onChange={handleChange}
          />
          {formErrors.emailError && (
            <div id="emailHelp" className="form-text text-danger">
              {formErrors.emailError}
            </div>
          )}
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label text-start d-block"
            >
              User Name
            </label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Please type your name..."
              value={formValues.username}
              name="username"
              onChange={handleChange}
            />
            {formErrors.usernameError && (
              <div id="emailHelp" className="form-text text-danger">
                {formErrors.usernameError}
              </div>
            )}
          </div>
          <label
            htmlFor="inputPassword5"
            className="form-label text-start d-block"
          >
            Password
          </label>
          <input
            type="password"
            id="inputPassword5"
            className="form-control"
            aria-describedby="passwordHelpBlock"
            placeholder="Please type your password..."
            value={formValues.password}
            name="password"
            onChange={handleChange}
          />
          {formErrors.passwordError && (
            <div id="emailHelp" className="form-text text-danger">
              {formErrors.passwordError}
            </div>
          )}
          <div id="passwordHelpBlock" className="form-text">
            Your password length not less than 8 characters, contains at least
            one lowercase letter, one uppercase letter, at least one digit, and
            a special character
          </div>
          <label
            htmlFor="inputPassword5"
            className="form-label mt-3 text-start d-block"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="inputPassword5"
            className="form-control"
            aria-describedby="passwordHelpBlock"
            placeholder="Please retype your password..."
            value={formValues.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
          {formErrors.confirmPasswordError && (
            <div id="emailHelp" className="form-text text-danger">
              {formErrors.confirmPasswordError}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-success mt-4"
            disabled={
              Object.values(formErrors).some((error) => error !== null) ||
              formValues.fname.length === 0 ||
              formValues.lname.length === 0 ||
              formValues.username.length === 0 ||
              formValues.email.length === 0 ||
              formValues.password.length === 0 ||
              formValues.confirmPassword.length === 0
            }
          >
            Register
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
