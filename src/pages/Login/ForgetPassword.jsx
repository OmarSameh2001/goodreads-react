import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";

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
          ? "https://goodreads-node-production.up.railway.app/auth/forget-password"
          : `https://goodreads-node-production.up.railway.app/auth/send-otp?email=${email}`;

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Full viewport height
        background:
          "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backdropFilter: "blur(10px)", // Softens background
          border: "1px solid rgba(78, 78, 78, 0.34)", // Subtle border
        }}
      >

        <h2 align="center" className="b612-bold" style={{ fontWeight: "bold" }}>
  {type === "forget" ? "Reset Password" : "Forgot Password"}
</h2>
        <Divider sx={{ mb: 4 }} />

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {type !== "forget" ? (
            <TextField
              fullWidth
              label="Email Address"
              placeholder="john.doe@example.com"
              variant="outlined"
              type="email"
              value={email}
              onChange={handleChange}
              name="email"
              error={!!formErrors.emailError}
              helperText={
                formErrors.emailError &&
                formErrors.emailError !== "error" &&
                formErrors.emailError
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: "action.active" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
          ) : (
            <>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
                placeholder="••••••••"
                value={password}
                onChange={handleChange}
                name="password"
                error={!!formErrors.passwordError}
                helperText={
                  formErrors.passwordError &&
                  formErrors.passwordError !== "error" &&
                  formErrors.passwordError
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "action.active" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                variant="outlined"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                error={!!formErrors.confirmPasswordError}
                helperText={
                  formErrors.confirmPasswordError &&
                  formErrors.confirmPasswordError !== "error" &&
                  formErrors.confirmPasswordError
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "action.active" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
            </>
          )}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={
              formErrors.emailError ||
              formErrors.passwordError ||
              formErrors.confirmPasswordError
            }
            sx={{
              background: "rgba(148,187,233)",
              borderRadius: 1,
              mt: 2,
              "&:hover": {
                background: "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
              },
            }}
          >
            {type === "forget" ? "Reset Password" : "Send Reset Link"}
          </Button>
        </Box>

        <ToastContainer />
      </Container>
    </Box>
  );
}

export default ForgetPassword;
