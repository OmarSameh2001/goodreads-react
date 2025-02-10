import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaBook, FaBars } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { Logout } from "@mui/icons-material";
import TokenContext from "../../context/token";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background:
    "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  color: "#000",
}));

const NavLink = styled(Typography)(({ theme }) => ({
  margin: "0 20px",
  cursor: "pointer",
  color: "#000",
  position: "relative",
  textDecoration: "none",
  "&:hover": {
    textShadow: "0 0 8px rgba(0,0,0,0.5)",
    "&::after": {
      width: "100%",
    },
  },
  "&:focus": {
    textShadow: "0 0 8px rgba(0,0,0,0.5)",
    "&::after": {
      width: "100%",
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -5,
    left: 0,
    width: 0,
    height: 2,
    backgroundColor: "#000",
    transition: "width 0.3s ease",
  },
}));

const MyBooksLink = styled(NavLink)(({ theme }) => ({
  backgroundColor: "rgba(0,0,0,0.1)",
  padding: "8px 16px",
  borderRadius: 20,
  display: "flex",
  alignItems: "center",
  gap: 8,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.2)",
    transform: "translateY(-2px)",
  },
  "&:focus": {
    backgroundColor: "rgba(0,0,0,0.2)",
    transform: "translateY(-2px)",
  },
}));

const Navbar = ({ setToken, setUserBooks }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { subscription } = useContext(TokenContext);
  
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const endDate = localStorage.getItem("endDate");
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    token ? navigate("/") : navigate("/login");
  }, [subscription, token]);

  const handleLogout = () => {
      localStorage.clear();
      setToken(null);
      setUserBooks([]);
      navigate("/login");
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const navItems = [
    { label: "Home", path: user === "admin" ? "/admin" : "/" },
    { label: "Books", path: user === "admin" ? "/adminBooks" : "/books" },
    { label: "Authors", path: user === "admin" ? "/adminAuthors" : "/authors" },
    { label: "Categories", path: user === "admin" ? "/adminCategories" : "/categories" },
    user === "admin" && { label: "Content", path: "/content" },
  ].filter(Boolean);

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        {isMobile && (
          <IconButton color="inherit" onClick={handleDrawerToggle}>
            <FaBars />
          </IconButton>
        )}

        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <FaBook size={32} color="black" style={{ marginRight: 16 }} />
          <Typography variant="h6" component="div">
            GoodReads
          </Typography>
        </Box>

        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {navItems.map((item) => (
              <NavLink key={item.label} component={Link} to={item.path}>
                {item.label}
              </NavLink>
            ))}
            {user === "user" && (
              <MyBooksLink component={Link} to="/mybooks">
                <IoBookSharp />
                My Books
              </MyBooksLink>
            )}
          </Box>
        )}

        {token ? (
          <Box sx={{ ml: 2 }}>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar sx={{ bgcolor: "#fff", color: "#000" }}>
                {userName ? userName[0].toUpperCase() : "U"}
              </Avatar>
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
            <Typography variant="body1">Sign-In</Typography>
          </Link>
        )}

        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
              backgroundColor: "rgba(148,187,233,0.95)",
            },
          }}
        >
          <List>
            {navItems.map((item) => (
              <ListItem button key={item.label} component={Link} to={item.path}>
                <ListItemText primary={<Typography variant="h6">{item.label}</Typography>} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
