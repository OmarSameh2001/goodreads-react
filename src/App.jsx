import { Route, Routes } from "react-router-dom";
import "./App.css";
import axiosInstance from "./apis/config";
import "bootstrap/dist/css/bootstrap.min.css";
import UserRoute from "./components/ProtectedRoute/UserRoute";
import AdminRoute from "./components/ProtectedRoute/AdminRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import TokenContext from "./context/token";
import BooksContext from "./context/books";
import UserBooks from "./context/userBooks";
import { ToastContainer } from "react-toastify";
import Layout from "./Layout"; // Import the Layout component
import React, { Suspense } from "react";
import { CircularProgress, Box } from "@mui/material";
function App() {
  const Home = React.lazy(() => import("./pages/User/Home/Home"));
  const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));
  const AdminHome = React.lazy(() => import("./pages/Admin/Home/Home"));
  const Login = React.lazy(() => import("./pages/Login/Login"));
  const Register = React.lazy(() => import("./pages/Register/Register"));
  const AdminAuthors = React.lazy(
    () => import("./pages/Admin/Authors/Authors")
  );
  const AdminBooks = React.lazy(() => import("./pages/Admin/Books/Books"));
  const AdminCategories = React.lazy(
    () => import("./pages/Admin/Categories/Categories")
  );
  const Authors = React.lazy(() => import("./pages/User/Authors/Authors"));
  const Books = React.lazy(() => import("./pages/User/Books/Books"));
  const Categories = React.lazy(
    () => import("./pages/User/Categories/Categories")
  );
  const BookDetails = React.lazy(
    () => import("./pages/User/Books/BookDetails")
  );
  const AuthorDetails = React.lazy(
    () => import("./pages/User/Authors/AuthorDetails")
  );
  const MyBooks = React.lazy(() => import("./pages/User/UserActivity/MyBooks"));
  const Reviews = React.lazy(() => import("./pages/User/UserActivity/Reviews"));
  const Profile = React.lazy(() => import("./pages/User/Profile/Profile"));
  const ForgetPassword = React.lazy(
    () => import("./pages/Login/ForgetPassword")
  );
  const AdminContentEditor = React.lazy(
    () => import("./pages/Admin/SiteContent/AdminContentEditor")
  );
  const About = React.lazy(() => import("./pages/User/SiteContent/About"));
  const Terms = React.lazy(() => import("./pages/User/SiteContent/Terms"));
  const BookViewer = React.lazy(() => import("./pages/User/Books/BookViewer"));
  const Success = React.lazy(() => import("./components/Payment/Success"));
  const Cancel = React.lazy(() => import("./components/Payment/Cancel"));
  const Otp = React.lazy(() => import("./components/Otp/Otp"));

  const [books, setBooks] = useState([]);
  const [readingBook, setReadingBook] = useState("not subscribed");
  const queryClient = new QueryClient();
  const [userBooks, setUserBooks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const endDate = localStorage.getItem("endDate");
  const sType = localStorage.getItem("sType");
  const [subscription, setSubscription] = useState(
    new Date(endDate).getTime() > new Date().getTime() && sType === "premium"
  );

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
        <BooksContext.Provider
          value={{ books, setBooks, readingBook, setReadingBook }}
        >
          <UserBooks.Provider value={{ userBooks, setUserBooks }}>
            <TokenContext.Provider
              value={{ token, setToken, subscription, setSubscription }}
            >
              <Layout setToken={setToken} setUserBooks={setUserBooks}>
                <Suspense
                  fallback={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                        width: "100vw",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  }
                >
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
                    <Route
                      path="/content"
                      element={
                        <AdminRoute>
                          <AdminContentEditor />
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
                      path="/bookViewer/:bookName"
                      element={
                        <UserRoute>
                          <BookViewer />
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
                    <Route
                      path="/about"
                      element={
                        <UserRoute>
                          <About />
                        </UserRoute>
                      }
                    />
                    <Route
                      path="/terms"
                      element={
                        <UserRoute>
                          <Terms />
                        </UserRoute>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Layout>

              <ToastContainer />
            </TokenContext.Provider>
          </UserBooks.Provider>
        </BooksContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
