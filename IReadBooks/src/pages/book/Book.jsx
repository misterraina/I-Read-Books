import React, {useEffect, useState} from 'react'
import BookComp from '../../components/bookCompo/bookCompo.jsx'
import {fetchReturnData} from '../../data'
import { useParams } from 'react-router-dom'

export default function Book() {

  const {id} = useParams()
  const numId = parseInt(id, 10)

  
  const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await fetchReturnData();
                setData(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

  const book = data.find((b) => b.id === numId);


  if (!book){
    return <div>Book not</div>
  }
  return (
    <div className="book" >
      <BookComp
      bookName = {book.book}
      bookImage = {book.Bimage}
      bookWriter = {book.writer}
      bookRating = {book.rating}
      bookDate = {book.Bdate}
      bookRecommend = {book.recommend}
      bookReview = {book.review}
      bookLink = {book.amazon}
      />
      {/* <h1>{typeof(numId)}</h1> */}
    </div>
  )
}
