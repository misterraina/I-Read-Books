import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const BookListAdmin = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/books");
      setBooks(response.data);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to load books. Please try again later.");
    }
  };

 const deleteBook = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (confirmed) {
        try {
            const adminToken = Cookies.get('adminToken');
            if (!adminToken) {
                setError("Authentication token not found. Please log in again.");
                return;
            }
            await axios.delete(`http://localhost:3000/books/${id}`, {
                headers: { Authorization: `Bearer ${adminToken}` },
                withCredentials: true, 
            });
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        } catch (err) {
            console.error("Error deleting book:", err);
            setError("Failed to delete book. Please try again later.");
        }
    }
};

  

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Manage Books</h2>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <div className="grid gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex justify-between items-center p-4 border rounded"
          >
            <p>{book.name}</p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/admin/edit-book/${book.id}`)}
                className="px-4 py-2 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteBook(book.id)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookListAdmin;
