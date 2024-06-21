import axios from 'axios'

const apiEndpoint = 'http://localhost:5000/';

async function fetchData(table) {
    try {
        const response = await axios.get(apiEndpoint+table);
        // console.log('Data fetched from API:', response.data);
        return response.data

    } catch (error) {
    
        console.error('Error fetching data from API:', error);
    }
}

export async function fetchReturnData(){
  try{
    const books = await fetchData("books");
    const author = await fetchData("author"); 
    const amaz_Link = await fetchData("amazon_links"); 
    const reviews = await fetchData("reviews");

    const data = [
        {
          id:1,
          book: books[0].title,
          writer: author[0].name,
          rating: reviews[3].myrating,
          recommend: reviews[3].review_text,
          Bdate: reviews[3].date_read.substring(0, 10),
          review: reviews[3].notes,
          amazon: amaz_Link[0].link,
          Bimage: `https://covers.openlibrary.org/b/isbn/${books[0].isbn}-L.jpg`
          },
      
          {
          id:2,
          book: books[1].title,
          writer: author[0].name,
          rating: reviews[2].myrating,
          recommend: reviews[2].review_text,
          Bdate: reviews[2].date_read.substring(0, 10),
          review: reviews[2].notes,
          amazon: amaz_Link[2].link,
          Bimage: `https://covers.openlibrary.org/b/isbn/${books[1].isbn}-L.jpg`
          },
      
          {
          id:3,
          book: books[2].title,
          writer: author[1].name,
          rating: reviews[0].myrating,
          recommend: reviews[0].review_text,
          Bdate: reviews[0].date_read.substring(0, 10),
          review: reviews[0].notes,
          amazon: amaz_Link[3].link,
          Bimage: `https://covers.openlibrary.org/b/isbn/${books[2].isbn}-L.jpg`
          },
      
          {
          id:4,
          book: books[3].title,
          writer: author[2].name,
          rating: reviews[1].myrating,
          recommend: reviews[1].review_text,
          Bdate: reviews[1].date_read.substring(0, 10),
          review: reviews[1].notes,
          amazon: amaz_Link[1].link,
          Bimage: `https://covers.openlibrary.org/b/isbn/${books[3].isbn}-L.jpg`
        }
      ];

    return data
  }
  catch (error){
    console.error('error hai ayush', error)
    throw error;  

  }
}

