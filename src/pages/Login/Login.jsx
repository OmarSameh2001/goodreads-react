import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import UserBooks from "../../context/userBooks";
import axiosInstance from "../../apis/config";
import { set } from "react-hook-form";
import TokenContext from "../../context/token";
import { toast } from "react-toastify";
function Login() {
  const { token, setToken } = useContext(TokenContext);
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
      if(res.data.user.otp){
        alert("Please check your email for otp");
        await axios.post(`http://localhost:3001/auth/send-otp?email=${email}`);
        navigate("/otp", { state: {email} });
        return
      }
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.user.role);
      localStorage.setItem("userId", res.data.user._id);
      if (res.data.user.role === "admin") {
        console.log("admin");
        navigate("/admin");
      } else {
        setToken(res.data.token);
        // async function handleUserBooks() {
        //   try {
        //     const token = localStorage.getItem("token");
        //     if (!token) return;

        //     const res1 = await axiosInstance.post("/auth/verify");
        //     if (res1.status !== 200) return;
        //     const response = await axiosInstance.get(
        //       `/userBook/${res1.data.decodedUser.id}`
        //     );
        //     setUserBooks(response.data);
        //   } catch (error) {
        //     console.log(error);
        //   }
        // }
        // handleUserBooks();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
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
          width: "fit-content",
        }}
      >
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
