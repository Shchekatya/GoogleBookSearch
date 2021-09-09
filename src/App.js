import { useState } from 'react';
import axios from 'axios';


function App() {
//  const filter=''
 // const orderBy='relevance'
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState("AIzaSyB4tvSiOZMKOtXQNGUjPnMqtUr4MpuULm0")
 

  function handleChange(event){
    const book = event.target.value;
    setBook(book);
  }

  function handleSubmit(event){
    event.preventDefault();  
   axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+"&key="+apiKey+"&maxResult=30")
   .then(data => {
     console.log(data.data.items)
      setResult(data.data.items)
    })
  }

  return (
    <div className="App">
      <div className="search">
      <h1>Search for books</h1>
     <form onSubmit={handleSubmit}>
       <input 
       onChange={handleChange}
       type="text" 
       className="inputBook" 
       placeholder="Search for books" />
       <button type="submit">Search</button>
     </form>
     </div>

     <div className="books">
     {result.map(book => (
       <div className="book">
       <a href={book.volumeInfo.previewLink}>            
      <img src={
      book.volumeInfo.imageLinks === undefined
        ? ""
        : `${book.volumeInfo.imageLinks.thumbnail}`
        } alt={book.title} />
      <h2>{book.volumeInfo.title}</h2>   
      <span>{book.volumeInfo.authors}</span>

       </a>
       </div>
     ))}
      </div>
    </div>
  );
}

export default App;
