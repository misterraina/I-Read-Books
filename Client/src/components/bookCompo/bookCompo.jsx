import React from 'react'
import './bookCompo.css';

export default function BookComp(props) {
  return (<>
  
      <div className="book-details">

    <header className='headerOne'><h1>
      {props.bookName}
      </h1>
      </header>

      <header className='headerTwo'>
      
      <img className="book-cover" src={props.bookImage} alt={`cover`} />

      <div className="headerDetails">

      <h2 className="book-title">{props.bookName} ~by {props.bookWriter}</h2>

    <p className="book-author">by{props.bookWriter}</p>

    <p className="book-rating">Rating: {props.bookRating}/10 </p>

    <p className='book-date'>  {props.bookDate}.</p>

    <p className='book-Link'>Go for the <a href={props.bookLink} target="_blank">Amazon Link</a> for this book</p>
      </div>
        
      </header>

      <div className="clearFloat">

        <p className='bookRecomendation'>  {props.bookRecommend}.</p>
        <h3>My Notes</h3>
        <p className="bookReview">{props.bookReview}</p>
    
      </div>

      </div>
      

  </>
  )
}
