import { useState } from "react";
import "./App.css";
import LandingPage from "./components/user/LandingPage";
import Books from "./components/user/Books";
import Footer from "./components/user/Footer";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import AdminDashboard from "./components/admin/AdminDashboard";
import AddBook from "./components/admin/AddBook";
import BookListAdmin from "./components/admin/BookListAdmin";
import EditBook from "./components/admin/EditBook";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Login from "./components/admin/Login";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <>
              <LandingPage />
              <Books />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
                    <Route path="admin" element={<AdminDashboard />}>
                        <Route path="add-book" element={<AddBook />} />
                        <Route path="manage-books" element={<BookListAdmin />} />
                        <Route path="edit-book/:id" element={<EditBook />} />
                    </Route>
                </Route>
      </>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
