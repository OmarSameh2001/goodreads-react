import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

function ForgetPassword() {
  const location = useLocation();
  const { email: changeEmail, type } = location.state || {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    emailError: type === "forget" ? "" : "error",
    passwordError: type === "forget" ? "error" : "",
    confirmPasswordError: type === "forget" ? "error" : "",
  });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const body = {};
      if (type === "forget") {
        body.email = changeEmail;
        body.password = password;
      } else {
        body.email = email;
      }
      const link =
        type === "forget"
          ? "http://localhost:3001/auth/forget-password"
          : `http://localhost:3001/auth/send-otp?email=${email}`;

      const res = await axios.post(link, body);
      toast("Please check your email for password reset link", {
        theme: "colored",
        type: "success",
      });
      if (type === "forget") {
        navigate("/login");
      } else {
        navigate("/otp", { state: { email, type: "forget" } });
      }
    } catch (error) {
      toast(error.response.data.message, {
        theme: "colored",
        type: "error",
      });
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
      setFormErrors({
        ...formErrors,
        emailError: value.length === 0 ? "Email is required" : null,
      });
      setFormErrors({
        ...formErrors,
        emailError: value.match(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        )
          ? null
          : "Email is not valid",
      });
    }
    if (name === "password") {
      setPassword(value);
      setFormErrors({
        ...formErrors,
        passwordError: value.length === 0 ? "Password is required" : null,
      });
      setFormErrors({
        ...formErrors,
        passwordError: value.match(
          /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[@%$#]))[A-Za-z\d@%$#]{8,}$/
        )
          ? null
          : "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
      });
    }
    if (name === "confirmPassword") {
      setConfirmPassword(value);
      setFormErrors({
        ...formErrors,
        confirmPasswordError:
          value.length === 0 ? "Confirm Password is required" : null,
      });
      setFormErrors({
        ...formErrors,
        confirmPasswordError:
          value === password ? null : "Passwords do not match",
      });
    }
  }

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ height: "50vh" }}
    >
      <h1>Forget Password</h1>
      <form onSubmit={handleSubmit} style={{ width: "20%" }}>
        {type !== "forget" && (
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              {type === "forget" ? "New Password" : "Email address"}
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={type === "forget" ? password : email}
              name={type === "forget" ? "password" : "email"}
              onChange={handleChange}
            />
            {formErrors.emailError && (
              <div className="text-danger">
                {formErrors.emailError === "error"
                  ? null
                  : formErrors.emailError}
              </div>
            )}
          </div>
        )}
        {type === "forget" && (
          <>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                name="password"
                onChange={handleChange}
              />
              {formErrors.passwordError && (
                <div className="text-danger">
                  {formErrors.passwordError === "error"
                    ? null
                    : formErrors.passwordError}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
              />
              {formErrors.confirmPasswordError && (
                <div className="text-danger">
                  {formErrors.confirmPasswordError === "error"
                    ? null
                    : formErrors.confirmPasswordError}
                </div>
              )}
            </div>
          </>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            formErrors.emailError ||
            formErrors.passwordError ||
            formErrors.confirmPasswordError
          }
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ForgetPassword;
