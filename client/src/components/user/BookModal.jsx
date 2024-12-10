import React from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const BookModal = ({ book, isOpen, onClose }) => {
  if (!isOpen) return null;

  const {
    cover_image,
    name,
    Author,
    published_date,
    amazon_link,
    Reviews = [],
  } = book;

  // Assume the first review if present
  const review = Reviews[0] || {};

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-900 text-gray-300 rounded-lg overflow-hidden w-[calc(100vw-40px)] h-[calc(100vh-40px)] relative p-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.3 },
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 transition"
        >
          <FaTimes size={24} />
        </button>

        {/* Modal Content */}
        <div className="overflow-y-auto h-full flex flex-col md:flex-row">
          {/* Book Image */}
          <motion.img
            src={cover_image}
            alt={name}
            className="w-full md:w-1/3 h-auto object-cover rounded-lg mb-4 md:mb-0"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Book Details */}
          <div className="md:ml-6 flex flex-col justify-between">
            <motion.h2
              className="text-3xl text-yellow-400 font-bold mb-4"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {name}
            </motion.h2>
            <motion.p
              className="text-lg text-gray-400 mb-2"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="font-semibold">Author:</span> {Author?.name}
            </motion.p>
            <motion.p
              className="text-lg text-gray-400 mb-2"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <span className="font-semibold">Published:</span>{" "}
              {new Date(published_date).toLocaleDateString()}
            </motion.p>
            <motion.p
              className="text-lg text-gray-400 mb-4"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <span className="font-semibold">Rating:</span>{" "}
              {review.rating || "N/A"} ⭐
            </motion.p>
            <motion.p
              className="mb-4"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {review.review_desc || "No review available."}
            </motion.p>
            <motion.p
              className="italic text-gray-400 mb-4"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              "{review.notes || "No additional notes."}"
            </motion.p>
            <motion.a
              href={amazon_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 underline"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Go to Amazon
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookModal;
