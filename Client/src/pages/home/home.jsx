import './home.css';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../data.js';
import BookItems from '../../components/bookItems/bookItems';
import Header from '../../components/header/header';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  return (
    <div className='home'>
      <Header />
      <hr className='bar' />
      <div className="bookElements">
        <div className="bookList">
          {data.map(book => (
            <BookItems
              key={book.book_id}
              bookId={book.book_id}
              bookName={book.book_name}
              bookWriter={book.author_name}
              bookRating={book.rating}
              bookDate={new Date(book.published_date).toLocaleDateString()}
              bookReview={book.review}
              bookRecommend={book.notes}
              bookLink={book.amazon_link}
              bookImage={book.cover_image_api}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
