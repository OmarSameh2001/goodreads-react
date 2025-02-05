import { Link, useNavigate } from "react-router";
import Search from "../Search/Search";
import { use } from "react";
import { Avatar } from "@mui/material";
import { FaBook } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const userName = localStorage.getItem("userName");
  const endDate = localStorage.getItem("endDate");
  const subscription = new Date(endDate).getTime() > new Date().getTime();
  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        margin: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 20,
        }}
      >
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={user === "admin" ? "/admin" : "/"}
        >
          <h1>GoodReads</h1>
        </Link>
        {user === "user" && (
          <>
            <Link style={{ textDecoration: "none", color: "black" }} to={"/"}>
              <h5>Home</h5>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/mybooks"}
            >
              <h5>My Books</h5>
            </Link>
          </>
        )}
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={user === "admin" ? "/adminBooks" : "/books"}
        >
          <h5>Books</h5>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={user === "admin" ? "/adminAuthors" : "/authors"}
        >
          <h5>Authors</h5>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={user === "admin" ? "/adminCategories" : "/categories"}
        >
          <h5>Categories</h5>
        </Link>
        {user === "user" && <Search />}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        {token ? (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/profile"}
            >
              <h5 style={{ cursor: "pointer" }}>
                {userName || user || "UserName"}
              </h5>
            </Link>
            <h5 style={{ display: "flex", alignItems: "center" }}>
              <Avatar style={{ backgroundColor: subscription ? "gold" : "red", scale: 0.8 }}>
                <FaBook />
              </Avatar>
              {subscription ? (
                <span>
                  {Math.ceil(
                    Math.abs(
                      new Date(endDate).getTime() - new Date().getTime()
                    ) /
                      (1000 * 60 * 60 * 24)
                  )}
                  {" "}
                  Days Left
                </span>
              ) : (
                "Subscription expired"
              )}
            </h5>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/login"}
            >
              <h5>Sign-In</h5>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/register"}
            >
              <h5>Sign-Up</h5>
            </Link>
            {/* <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/admin"}
            >
              <h5>Admin-Login</h5>
            </Link> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
