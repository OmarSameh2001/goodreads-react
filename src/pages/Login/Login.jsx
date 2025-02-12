import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router";
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
import UserBooks from "../../context/userBooks.js";
import fetchAndSetUserBooks from "../../../utils.jsx";

function Login() {
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setSubscription} = useContext(TokenContext);
  const { setUserBooks } = useContext(UserBooks);

  async function handleLogin() {
    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.user.role);
        localStorage.setItem("userName", res.data.user.username);
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem(
          "sType",
          res.data.user.subscription.subscriptionType
        );
        localStorage.setItem("endDate", res.data.user.subscription.endDate);
        setSubscription(res.data.user.subscription.subscriptionType === "premium");
        res.data.user.role === "admin" ? navigate("/admin") : navigate("/");
        await fetchAndSetUserBooks(setUserBooks);

      }
    } catch (error) {
      console.log(error);
      setUserBooks([]);
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
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh", // Full viewport height
      background: "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
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
        <h2 align="center" className="b612-bold" style={{ fontWeight: "bold" }}>Welcome back</h2>
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
              background: "rgba(148,187,233)",
              borderRadius: 1,
              mt: 2,
              "&:hover": {
                background: "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
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
    </Box>
  );
  
}

export default Login;
