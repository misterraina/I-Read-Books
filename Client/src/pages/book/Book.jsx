import React, { useEffect, useState } from 'react';
import BookComp from '../../components/bookCompo/bookCompo.jsx';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../data'; // Assuming fetchData is your API call function

export default function Book() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const booksData = await fetchData(); // Assuming fetchData fetches all books
        const foundBook = booksData.find(book => book.book_id === parseInt(id, 10)); // Find book by id
        setBook(foundBook); // Set found book to state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBookData();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book">
      <BookComp
        bookName={book.book_name}
        bookImage={book.cover_image_api}
        bookWriter={book.author_name}
        bookRating={book.rating}
        bookDate={new Date(book.published_date).toLocaleDateString()}
        bookRecommend={book.notes}
        bookReview={book.review}
        bookLink={book.amazon_link}
      />
    </div>
  );
}
