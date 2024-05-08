import React, { useEffect, useState } from 'react'
import { BookCards } from '../Pages/BookCards'

function OtherBooks() {
    const [books,setBooks] = useState([])

    useEffect(()=>{
        fetch("http://localhost:3000/api/product/").then(res=>res.json()).then(data=>setBooks(data.slice(5,10)))
    },[])

  return (
    <BookCards books={books} headline={"Other Books"}/>
  )
}

export default OtherBooks