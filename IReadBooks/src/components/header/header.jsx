import React from 'react'
import './header.css'

const title = 'title'
const newest = 'newest'
const best = 'best'
const faq = 'faq'
const contact = 'contact'

// baad pe inpe kaam karunga agar aur page banane hue to 


export default function Header() {
  return (
    <div className='header'>
      <h1>Ayush Raina</h1>
      <h2>I Read Books</h2>
      <p>I am a web Devloper i am into programming my intrests are in creative work i started reading books a while ago Tiny summary but detailed notes for each. Use the ISBN number to find it from your local library or anywhere else. This page will constantly update as I read more, so bookmark it if you want to check back in a few months.</p>

      <p>Sorted with my top recommendations up top. Sort by {title}, {newest}, or {best}.</p>

      <p>And please read {faq} about these notes, if you have any questions. You can also {contact}.</p>
    </div>
  )
}
