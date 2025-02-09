import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import axiosInstance from "./apis/config";
import axiosInstance from "./apis/config";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/User/Home/Home";
import UserRoute from "./components/ProtectedRoute/UserRoute";
import NotFound from "./pages/NotFound/NotFound";
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
import Otp from "./components/Otp/Otp";
import BookDetails from "./pages/User/Books/BookDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import TokenContext from "./context/token";
import AuthorDetails from "./pages/User/Authors/AuthorDetails";
import MyBooks from "./pages/User/UserActivity/MyBooks";
import Reviews from "./pages/User/UserActivity/Reviews";
import BooksContext from "./context/books";
import UserBooks from "./context/userBooks";
import Profile from "./pages/User/Profile/Profile";
import Success from "./components/Payment/Success";
import Cancel from "./components/Payment/Cancel";
import ForgetPassword from "./pages/Login/ForgetPassword";
import { ToastContainer } from "react-toastify";

function App() {
  const [books, setBooks] = useState([]);
  const queryClient = new QueryClient();
  const [userBooks, setUserBooks] = useState([]); // Add state to store user's want to read books
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    async function handleUserBooks() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res1 = await axiosInstance.post("/auth/verify");
        if (res1.status !== 200) return;

        const response = await axiosInstance.get(
          `/userBook/${res1.data.decodedUser.id}`
        );

        //Prevent unnecessary re-renders
        if (JSON.stringify(userBooks) !== JSON.stringify(response.data)) {
          setUserBooks(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    handleUserBooks();
  }, [userBooks, token]);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <BooksContext.Provider value={{ books, setBooks }}>
            <UserBooks.Provider value={{ userBooks, setUserBooks }}>
              <TokenContext.Provider value={{ token, setToken }}>
                <Navbar />
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/otp" element={<Otp />} />
                  <Route path="/forget" element={<ForgetPassword />} />

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
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/authors"
                    element={
                      <UserRoute>
                        <Authors />
                      </UserRoute>
                    }
                  />
                  <Route
                    path="/authors/:id"
                    element={
                      <UserRoute>
                        <AuthorDetails />
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
                    path="/bookDetails/:bookId"
                    element={
                      <UserRoute>
                        <BookDetails />
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
                  <Route
                    path="/mybooks"
                    element={
                      <UserRoute>
                        <MyBooks />
                      </UserRoute>
                    }
                  />
                  <Route
                    path="/reviews/:bookId"
                    element={
                      <UserRoute>
                        <Reviews />
                      </UserRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <UserRoute>
                        <Profile />
                      </UserRoute>
                    }
                  />
                  <Route
                    path="/success"
                    element={
                      <UserRoute>
                        <Success />
                      </UserRoute>
                    }
                  />
                  <Route
                    path="/cancel"
                    element={
                      <UserRoute>
                        <Cancel />
                      </UserRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <ToastContainer />
              </TokenContext.Provider>
            </UserBooks.Provider>
          </BooksContext.Provider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
