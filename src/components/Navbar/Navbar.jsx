import { Link, useNavigate } from "react-router";
import Search from "../Search/Search";

function Navbar() {
    const navigate = useNavigate()
  const token = localStorage.getItem("token");
  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
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
        <Link style={{ textDecoration: "none", color: "black" }} to={"/"}>
          <h1>GoodReads</h1>
        </Link>
        <Link style={{ textDecoration: "none", color: "black" }} to={"/"}>
          <h5>Home</h5>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={"/mybooks"}
        >
          <h5>My Books</h5>
        </Link>
        <Link style={{ textDecoration: "none", color: "black" }} to={"/books"}>
          <h5>Books</h5>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={"/authors"}
        >
          <h5>Authors</h5>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={"/categories"}
        >
          <h5>Categories</h5>
        </Link>
        <Search />
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
            <h5>
                UserName
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
              <h5>Sign In</h5>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/register"}
            >
              <h5>Sign Up</h5>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
