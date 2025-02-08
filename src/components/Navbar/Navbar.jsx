import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import TokenContext from "../../context/token";
import { Tabs, Tab, Box, IconButton, TextField, InputAdornment, Typography } from "@mui/material";
import { Logout, Search as SearchIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled Navbar Container
const NavbarContainer = styled("div")(({ theme }) => ({
  background: `#2C3E50`,
  color: "white", 
  textShadow: "1px 1px 4px rgba(0,0,0,0.3)", // Improves visibility  
  height: 90,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  color: "rgb(242, 233, 240)",
  fontSize: "1.5rem",
  fontWeight: "bold",
  textShadow: "1px 1px 8px rgba(0,0,0,0.2)",
  borderBottomLeftRadius: "80px",
  borderBottomRightRadius: "80px",
  position: "sticky",
  top: 0,
  zIndex: 1000,
}));

function Navbar() {
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const [value, setValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    localStorage.removeItem("user");
    navigate("/login");
  }

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Books", path: user === "admin" ? "/adminBooks" : "/books" },
    { label: "Authors", path: user === "admin" ? "/adminAuthors" : "/authors" },
    { label: "Categories", path: user === "admin" ? "/adminCategories" : "/categories" },
    { label: "My Books", path: "/mybooks", condition: user === "user" },
  ];

  return (
    <NavbarContainer>
      {/* Logo */}
      <Link to={user === "admin" ? "/admin" : "/"} style={{ textDecoration: "none", color: "inherit"  ,  marginLeft: "30px"}}>
        <h2 style={{ cursor: "pointer" ,  color: "rgb(225, 226, 234)" }} >GoodReads</h2>
      </Link>

      {/* Navigation Tabs */}
      <Tabs value={value} onChange={(e, newValue) => setValue(newValue)} variant="scrollable" scrollButtons={false}>
        {navLinks
          .filter((link) => link.condition !== false)
          .map((link, index) => (
            <Tab key={index} label={link.label} component={Link} to={link.path} sx={{ color: "white", fontWeight: "bold" , fontsize: "40px" }} />
          ))}
      </Tabs>

      {/* Right Section: Search, User Info, Logout */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Search Box */}
        <TextField
          size="small"
          placeholder="Search..."
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{  backgroundColor: "#fff", borderRadius: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Logout & User Info */}
        {token ? (
          <>
            <Typography variant="body1">UserName</Typography>
            <IconButton onClick={handleLogout} sx={{ color: "white" }}>
              <Logout />
            </IconButton>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
              <Typography variant="body1">Sign-In</Typography>
            </Link>
          </>
        )}
      </Box>
    </NavbarContainer>
  );
}

export default Navbar;
