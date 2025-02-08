import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
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
import Otp from "./pages/Register/Otp";
import BookDetails from "./pages/User/Books/BookDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BooksContext from "./context/books";
import UserBooks from "./context/userBooks";
import { useEffect, useState } from "react";
import TokenContext from "./context/token";
import AuthorDetails from "./pages/User/Authors/AuthorDetails";

function App() {
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]); // Add state to store user's want to read books
  const queryClient = new QueryClient();
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
        console.log(response.data);

        //Prevent unnecessary re-renders
        if (JSON.stringify(userBooks) !== JSON.stringify(response.data)) {
          setUserBooks(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    handleUserBooks();
  }, [userBooks, token]); // ✅ Runs when userBooks changes

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
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </TokenContext.Provider>
            </UserBooks.Provider>
          </BooksContext.Provider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
