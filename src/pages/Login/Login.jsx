import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import UserBooks from "../../context/userBooks";
import axiosInstance from "../../apis/config";
import { set } from "react-hook-form";
import TokenContext from "../../context/token";
import { ToastContainer, toast } from "react-toastify";
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
    } catch (error) {
      console.log(error);
        toast(error.response.data.message, {
          theme: "colored",
          type: "error",
        });
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
        height: "50vh"
      }}
    >
      <ToastContainer />
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "fit-content",
        }}
      >
        <h1>Login</h1>
        <input
          type="email"
          placeholder="email"
          value={email}
          style={{ width: "100%" }}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3"
        />
        <div className="d-flex" style={{ flexDirection: "row", width: "100%" }}>
          <p className="m-0 p-0" style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }} onClick={() => navigate("/forget")}>
            Forgot Password?
          </p>
        </div>
        <input
          type="password"
          placeholder="password"
          value={password}
          style={{ width: "100%" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={!email || password.length < 8}
          type="submit"
          className="btn btn-success my-3"
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
