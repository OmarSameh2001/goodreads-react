import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router";
import UserBooks from "../../context/userBooks";
import axiosInstance from "../../apis/config";
import { set } from "react-hook-form";
import TokenContext from "../../context/token";
import { toast } from "react-toastify";
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
  const { token, setToken } = useContext(TokenContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { userBooks, setUserBooks } = useContext(UserBooks);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  const navigate = useNavigate();
  async function handleLogin() {
    const res = await axios.post("http://localhost:3001/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);  
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", res.data.user.role);
    localStorage.setItem("userName", res.data.user.username);
    localStorage.setItem("userId", res.data.user._id);
    localStorage.setItem("sType", res.data.user.subscription.subscriptionType);
    localStorage.setItem("endDate", res.data.user.subscription.endDate);
    console.log(res);
    if (res.data.user.role === "admin") {
      console.log("admin");
      navigate("/admin");
    } else {
      navigate("/");
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
      <Divider sx={{ mb: 4 }} />

      <Box
        component="form"
        onSubmit={handleSubmit}
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
            sx={{ fontSize: "0.875rem" }}
          >
            Forgot Password?
          </Link>
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          disabled={!email || password.length < 8}
          sx={{
            py: 1.5,
            borderRadius: 1,
            mt: 2,
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
