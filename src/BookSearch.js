import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BookSearch.css'; 

function BookSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [personalBookshelf, setPersonalBookshelf] = useState([]);
  const [bookAdded, setBookAdded] = useState({});

  useEffect(() => {
    const savedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setPersonalBookshelf(savedBookshelf);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (query.trim() !== '') {
        fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`)
          .then((response) => response.json())
          .then((data) => {
            setSearchResults(data.docs);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      } else {
        setSearchResults([]); 
      }
    }, 300); 
  };

  const handleAddToBookshelf = (book) => {
    const updatedBookshelf = [...personalBookshelf, book];
    setPersonalBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
    
    
    setBookAdded((prev) => ({
      ...prev,
      [book.key]: true,
    }));
  };

  let searchTimeout;

  return (
    <div className="container">
      <h1>Search by Book Name</h1>
      <div className="search-input">
        <input
          type="text"
          placeholder="Search for a book"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <Link to="/bookshelf">
        <button className="button-bookshelf">My Bookshelf</button>
      </Link>
      <p> <button className='button-bookshelf'><a href='/bookshelf'> My BookShelf</a></button> </p>
      <div className="search-results">
        {searchResults.map((book) => (
          <div className="card" key={book.key}>
            <h3>{book.title}</h3>
            <p>Edition Count: {book.edition_count}</p>
            {!bookAdded[book.key] && ( 
              <button onClick={() => handleAddToBookshelf(book)}>Add to Bookshelf</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSearch;
