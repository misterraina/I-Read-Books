import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import BookModal from "./BookModal";
import { REACT_APP_API_BACKEND } from "../../const";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [sortOption, setSortOption] = useState(""); // Track the selected sorting option

  useEffect(() => {
    fetchBooks(); // Fetch books on component mount or when sortOption changes
  }, [sortOption]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const endpoint = sortOption
  ? `${REACT_APP_API_BACKEND}/books/sorted?sortBy=${sortOption}`
  : `${REACT_APP_API_BACKEND}/books`;


      const response = await axios.get(endpoint);
      setBooks(response.data);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to load books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-yellow-400">Loading books...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400">{error}</div>;
  }

  return (
    <section className="bg-gray-900 py-12 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-8">
        My Book Reviews
      </h2>

      {/* Sorting Options */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded bg-gray-700 hover:bg-yellow-400 text-white hover:text-black transition ${
            sortOption === "read_date" ? "bg-yellow-500 text-black" : ""
          }`}
          onClick={() => setSortOption("read_date")}
        >
          Sort by Read Date
        </button>
        <button
          className={`px-4 py-2 rounded bg-gray-700 hover:bg-yellow-400 text-white hover:text-black transition ${
            sortOption === "rating" ? "bg-yellow-500 text-black" : ""
          }`}
          onClick={() => setSortOption("rating")}
        >
          Sort by Rating
        </button>
        <button
          className="px-4 py-2 rounded bg-gray-700 hover:bg-yellow-400 text-white hover:text-black transition"
          onClick={() => setSortOption("")}
        >
          Clear Sorting
        </button>
      </div>

      <div className="flex flex-col gap-8 w-full">
        {books.map((book, index) => {
          // Extract review details (assuming one review per book for simplicity)
          const review = book.Reviews[0] || {};
          return (
            <motion.div
              key={book.id}
              onClick={() => setSelectedBook(book)}
              className="flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              {/* Image Section */}

              <img
                src={book.cover_image}
                alt={book.name}
                className="w-full md:w-1/3 h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                />

              {/* Content Section */}
              <div className="p-6 flex flex-col justify-between w-2/3">
                <div>
                  <h3 className="text-2xl font-semibold text-yellow-300 mb-2">
                    {book.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    <span className="font-medium">By:</span> {book.Author.name}
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    <span className="font-medium">Published:</span>{" "}
                    {new Date(book.published_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    <span className="font-medium">My Rating:</span>{" "}
                    {review.rating || "N/A"}
                    {review.rating &&
                      [...Array(review.rating)].map((_, i) => (
                        <span key={i} role="img" aria-label="star">
                          ⭐
                        </span>
                      ))}
                  </p>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {/* //show max 3 lines  */}
                    {review.review_desc || "No review available."}
                  </p>
                  <p className="text-gray-400 italic mb-4 line-clamp-3">
                    {review.notes || ""}
                  </p>
                  {/* show max 3 lines */}
                </div>
                <a
                  href={book.amazon_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 underline"
                >
                  Go to Amazon
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal Component */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </section>
  );
};

export default Books;
