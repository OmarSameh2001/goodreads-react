import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
import Otp from "./components/Otp/Otp";
import BookDetails from "./pages/User/Books/BookDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BooksContext from "./context/books";
import WtrBooksContext from "./context/wtrBooks"; // Import WtrBooksContext
import { useState } from "react";
import Profile from "./pages/User/Profile/Profile";
import Success from "./components/Payment/Success";
import Cancel from "./components/Payment/Cancel";

function App() {
  const [books, setBooks] = useState([]);
  const [wtrBooks, setWtrBooks] = useState([]); // Add state to store user's want to read books

  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <BooksContext.Provider value={{ books, setBooks }}>
            <WtrBooksContext.Provider value={{ wtrBooks, setWtrBooks }}>
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
                  path="/books"
                  element={
                    <UserRoute>
                      <Books />
                    </UserRoute>
                  }
                />
                <Route
                  path="/bookDetails"
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
                <Route path="/profile" element={<UserRoute><Profile /></UserRoute>} />
                <Route path="/success" element={<UserRoute><Success /></UserRoute>} />
                <Route path="/cancel" element={<UserRoute><Cancel /></UserRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </WtrBooksContext.Provider>
          </BooksContext.Provider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
