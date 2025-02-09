import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router";
import UserBooks from "../../context/userBooks";
import axiosInstance from "../../apis/config";
import { set } from "react-hook-form";
import TokenContext from "../../context/token";
import { ToastContainer, toast } from "react-toastify";
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  InputAdornment,
  Divider,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import OAuthSignInPage from "./SignWithGoogle";
function Login() {
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { userBooks, setUserBooks } = useContext(UserBooks);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  const navigate = useNavigate();
  async function handleLogin() {
    try {
      const res = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      if (res.status === 200) {
        toast.onChange((payload) => {
          if (
            payload.status === "removed" &&
            payload.content === "Login successful"
          ) {
            res.data.user.role === "admin" ? navigate("/admin") : navigate("/");
          }
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.user.role);
        localStorage.setItem("userName", res.data.user.username);
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem(
          "sType",
          res.data.user.subscription.subscriptionType
        );
        localStorage.setItem("endDate", res.data.user.subscription.endDate);
        toast("Login successful", { type: "success", theme: "colored" });
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.message, { type: "error", theme: "colored" });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    handleLogin();
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold" }}
      >
        Welcome Back
      </Typography>
      <ToastContainer />
      <Divider sx={{ mb: 4 }} />

      <Box
        component="form"
        onSubmit={(e) => handleSubmit(e)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 3,
        }}
      >
        <TextField
          fullWidth
          label="Email Address"
          placeholder="john.doe@example.com"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{ color: "action.active" }} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: "action.active" }} />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Link
            component="button"
            type="button"
            onClick={() => navigate("/forget")}
            underline="hover"
            color="primary"
            sx={{
              fontSize: "0.875rem",
              ":hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            Forgot Password?
          </Link>
        </Box>

        <Button
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          disabled={!email || password.length < 8}
          sx={{
            backgroundColor: "rgb(44, 62, 80)",
            borderRadius: 1,
            mt: 2,
            "&:hover": {
              backgroundColor: "rgb(32, 45, 58)",
            },
          }}
        >
          Sign In
        </Button>
        <OAuthSignInPage />
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          New to the website?{" "}
          <Link
            component={RouterLink}
            to="/register"
            underline="hover"
            color="primary"
          >
            Create Account
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
