import './home.css'
import data from '../../data'
import BookItems from '../../components/bookItems/bookItems'
import Header from '../../components/header/header' 

const apiCover = "https://covers.openlibrary.org/b/$key/$value-$size.jpg"

export default function Home() {
  
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


