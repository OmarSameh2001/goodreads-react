import { Link, useNavigate } from "react-router";
import Search from "../Search/Search";
import { use, useContext } from "react";
import TokenContext from "../../context/token";

function Navbar() {
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    localStorage.removeItem("user");
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
            <h5>UserName</h5>
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
