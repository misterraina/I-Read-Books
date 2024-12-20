import React, { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { REACT_APP_API_BACKEND } from "../../const";

const AddBook = () => {
  const [formData, setFormData] = useState({
    name: "",
    published_date: "",
    cover_image: "",
    amazon_link: "",
    author: {
      name: "",
      bio: "",
    },
    review: {
      read_date: "",
      rating: "",
      review_desc: "",
      notes: "",
    },
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split("."); // For nested fields

    if (keys.length === 1) {
      setFormData((prev) => ({ ...prev, [keys[0]]: value }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminToken = Cookies.get("adminToken");
      console.log(adminToken);
      
      // if (!adminToken) throw new Error("Token missing");
        // if (!adminToken) {
        //   setMessage("Authentication token not found. Please log in again.");
        //     return;
        // }

        await axios.post(`${REACT_APP_API_BACKEND}/books`, formData, {
            // headers: { Authorization: `Bearer ${adminToken}` },
            withCredentials: true, // Include cookies
        });

      setMessage("Book added successfully!");
      setFormData({
        name: "",
        published_date: "",
        cover_image: "",
        amazon_link: "",
        author: {
          name: "",
          bio: "",
        },
        review: {
          read_date: "",
          rating: "",
          review_desc: "",
          notes: "",
        },
      });
    } catch (error) {
      if (error.response?.status === 401) {
          setMessage("Your session has expired. Please log in again.");
      } else {
          setMessage("Failed to add book.");
      }
      console.error("Error adding book:", error);
  }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Add New Book</h2>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* General Book Info */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Book Name"
          className="p-2 border rounded"
          required
        />
        <input
          type="date"
          name="published_date"
          value={formData.published_date}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="url"
          name="cover_image"
          value={formData.cover_image}
          onChange={handleChange}
          placeholder="Cover Image URL"
          className="p-2 border rounded"
        />
        <input
          type="url"
          name="amazon_link"
          value={formData.amazon_link}
          onChange={handleChange}
          placeholder="Amazon Link"
          className="p-2 border rounded"
        />

        {/* Author Info */}
        <h3 className="text-xl font-semibold mt-4">Author Details</h3>
        <input
          type="text"
          name="author.name"
          value={formData.author.name}
          onChange={handleChange}
          placeholder="Author Name"
          className="p-2 border rounded"
          required
        />
        <textarea
          name="author.bio"
          value={formData.author.bio}
          onChange={handleChange}
          placeholder="Author Bio"
          className="p-2 border rounded"
          rows="4"
          required
        ></textarea>

        {/* Review Info */}
        <h3 className="text-xl font-semibold mt-4">Review Details</h3>
        <input
          type="date"
          name="review.read_date"
          value={formData.review.read_date}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="review.rating"
          value={formData.review.rating}
          onChange={handleChange}
          placeholder="Rating (1-10)"
          className="p-2 border rounded"
          min="1"
          max="10"
          required
        />
        <textarea
          name="review.review_desc"
          value={formData.review.review_desc}
          onChange={handleChange}
          placeholder="Review Description"
          className="p-2 border rounded"
          rows="4"
        ></textarea>
        <textarea
          name="review.notes"
          value={formData.review.notes}
          onChange={handleChange}
          placeholder="Notes"
          className="p-2 border rounded"
          rows="4"
        ></textarea>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
