import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const Layout = ({ children, setToken, setUserBooks }) => {
  const location = useLocation();
  const hideNavbarRoutes = [ "/register", "/otp", "/forget"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && (
        <Navbar setToken={setToken} setUserBooks={setUserBooks} />
      )}
      {children}
      <br/>
      {!hideNavbarRoutes.includes(location.pathname) && (
       
         <Footer /> 
      )}
    </>
  );
};

export default Layout;
