import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import TokenContext from "../../context/token";
import {
  Tabs,
  Tab,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { Logout, Search as SearchIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import { FaBook } from "react-icons/fa";

// Styled Navbar Container
const NavbarContainer = styled("div")(({ theme }) => ({
  background: `#2C3E50`,
  // color: "white",
  textShadow: "1px 1px 4px rgba(0,0,0,0.3)", // Improves visibility
  height: 90,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  color: "rgb(242, 233, 240)",
  fontSize: "1.5rem",
  fontWeight: "bold",
  borderBottomLeftRadius: "80px",
  borderBottomRightRadius: "80px",
  position: "sticky",
  top: 0,
  zIndex: 1000,
}));

function Navbar({ setToken, setUserBooks }) {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const endDate = localStorage.getItem("endDate");
  const { subscription } = useContext(TokenContext);
  const [value, setValue] = useState(0);
  console.log(subscription);

  function handleLogout() {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (!confirm) return;
    localStorage.clear();
    setToken(null);
    setUserBooks([]);
    navigate("/login");
  }
  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [subscription, token]);

  const navLinks = [
    { label: "Home", path: user === "admin" ? "/admin" : "/" },
    { label: "Books", path: user === "admin" ? "/adminBooks" : "/books" },
    { label: "Authors", path: user === "admin" ? "/adminAuthors" : "/authors" },
    {
      label: "Categories",
      path: user === "admin" ? "/adminCategories" : "/categories",
    },
    { label: "My Books", path: "/mybooks", condition: user === "user" },
  ];

  return (
    <NavbarContainer>
      {/* Logo */}
      <Link
        to={user === "admin" ? "/admin" : "/"}
        style={{ textDecoration: "none", color: "inherit", marginLeft: "30px" }}
      >
        <h2 style={{ cursor: "pointer", color: "rgb(225, 226, 234)" }}>
          GoodReads
        </h2>
      </Link>

      {/* Navigation Tabs */}
      <div
      >
        {navLinks
          .filter((link) => link.condition !== false)
          .map((link, index) => (
            <Tab
              key={index}
              label={link.label}
              component={Link}
              to={link.path}
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
                fontFamily: "B612, sans-serif",
                fontStyle: "italic",
              }}
            />
          ))}
      </div>

      {/* Right Section: Search, User Info, Logout */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Logout & User Info */}
        {token ? (
          <>
            <Link style={{ textDecoration: "none" }} to={"/profile"}>
              <h5 style={{ cursor: "pointer", color: "rgb(225, 226, 234)" }}>
                {userName || user || "UserName"}
              </h5>
            </Link>
            {user === "user" && (
              <h5 style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  style={{
                    backgroundColor: subscription ? "gold" : "red",
                    scale: 0.8,
                  }}
                >
                  <FaBook />
                </Avatar>
                {subscription ? (
                  <span>
                    {Math.ceil(
                      Math.abs(
                        new Date(endDate).getTime() - new Date().getTime()
                      ) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    Days Left
                  </span>
                ) : (
                  "Free Plan"
                )}
              </h5>
            )}
            <IconButton onClick={handleLogout} sx={{ color: "white" }}>
              <Logout />
            </IconButton>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Typography variant="body1">Sign-In</Typography>
            </Link>
          </>
        )}
      </Box>
    </NavbarContainer>
  );
}

export default Navbar;
