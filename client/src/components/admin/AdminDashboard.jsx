import { useAuth } from "../../AuthContext";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // Remove token and update state
};
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <button
                onClick={handleLogout}
                className="px-4 py-2 my-2 bg-red-500 text-white rounded"
            >
                Logout
            </button>
      <div className="flex gap-4 mb-6">
        <Link to="add-book" className="px-4 py-2 bg-green-500 text-white rounded">
          Add New Book
        </Link>
        <Link to="manage-books" className="px-4 py-2 bg-blue-500 text-white rounded">
          Manage Books
        </Link>
      </div>
      {/* Render the nested routes here */}
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
