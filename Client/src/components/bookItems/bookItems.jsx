import React from 'react'
import './bookItems.css';
import { Link } from 'react-router-dom';

export default function BookItems(props) {
  return (<>
  

      <div className="book-details">

      
      <img className="book-cover" src={props.bookImage} alt={`cover`} />

      <div className="headerDetails">

      <h2 className="book-title">{props.bookName} ~by {props.bookWriter}</h2>

      <p className='spanElements'>


    <span className="book-author">by{props.bookWriter}  </span>

    <span className="book-rating">.Rating: {props.bookRating}/10  </span>

    <span className='book-date'>.{props.bookDate}.</span>

      </p>
    

    <p className='book-Link'>Go for the <a href={props.bookLink} target="_blank">Amazon Link</a> for this book</p>
      </div>
        
        <div className="clearFloat">

        <p className='book-recomendation'>  {props.bookRecommend}.</p>

        <h3 className='bookNotes'> <Link className='link' to = {`/book/${props.bookId}`}>My Notes</Link></h3>
        
        <p className="book-review">{props.bookReview}</p>
    
        </div>
      </div>
      

  </>
  )
}
