import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/User/Home/Home";
import UserRoute from "./components/ProtectedRoute/UserRoute";
import NotFound from "./pages/NotFound/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AdminRoute from "./components/ProtectedRoute/AdminRoute";
import AdminHome from "./pages/Admin/Home/Home";
import AdminAuthors from "./pages/Admin/Authors/Authors";
import AdminBooks from "./pages/Admin/Books/Books";
import AdminCategories from "./pages/Admin/Categories/Categories";
import Authors from "./pages/User/Authors/Authors";
import Books from "./pages/User/Books/Books";
import Categories from "./pages/User/Categories/Categories";
 import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

 const queryClient = new QueryClient(); 


function App() {
  return (
    <QueryClientProvider client={queryClient}> {/* Wrap the entire app */}
    <div className="App">

      
       <BrowserRouter>
        <Navbar />
        {/* <Authors></Authors> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminHome />
              </AdminRoute>
            }
          />
          <Route
            path="/adminAuthors"
            element={
              <AdminRoute>
                <AdminAuthors />
              </AdminRoute>
            }
          />
          <Route
            path="/adminBooks"
            element={
              <AdminRoute>
                <AdminBooks />
              </AdminRoute>
            }
          />
          <Route
            path="/adminCategories"
            element={
              <AdminRoute>
                <AdminCategories />
              </AdminRoute>
            }
          />
          <Route
            path="/"
            element={
              <UserRoute>
                <Home />
              </UserRoute>
            }
          />
          <Route
            path="/authors"
            element={
              <UserRoute>
                <Authors />
              </UserRoute>
            }
          />
          <Route
            path="/books"
            element={
              <UserRoute>
                <Books />
              </UserRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <UserRoute>
                <Categories />
              </UserRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter> 
    </div>
    </QueryClientProvider>
  );
}

export default App;
