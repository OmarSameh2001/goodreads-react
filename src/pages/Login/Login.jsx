import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import UserBooks from "../../context/userBooks";
import axiosInstance from "../../apis/config";
import { set } from "react-hook-form";
import TokenContext from "../../context/token";
function Login() {
  const { token, setToken } = useContext(TokenContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userBooks, setUserBooks } = useContext(UserBooks);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  async function handleLogin() {
    const res = await axios.post("http://localhost:3001/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", res.data.user.role);
    localStorage.setItem("userName", res.data.user.username);
    localStorage.setItem("userId", res.data.user._id);
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={!email || password.length < 8}
          type="submit"
          className="btn btn-success"
        >
          Login
        </button>
        <p>
          New to the website? <Link to={"/register"}>Create Account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
