import './home.css'
import React, {useEffect, useState} from 'react'
import {fetchReturnData} from '../../data'
import BookItems from '../../components/bookItems/bookItems'
import Header from '../../components/header/header' 

export default function Home() {

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
  
  return (
    <div className='home'>
    <Header/>

    <hr className='bar' />

<div className="bookElements">

<div className="bookList">
      {data.map((item, index) => (
        <BookItems
          key={index}
          bookImage={item.Bimage}
          bookName={item.book}
          bookWriter={item.writer}
          bookRating={item.rating}
          bookDate={item.Bdate}
          bookRecommend={item.recommend}
          bookReview={item.review}
          bookLink={item.amazon}
          bookId={item.id}
        />
      ))}
    </div>
      </div>

   
    </div>
  )
}


