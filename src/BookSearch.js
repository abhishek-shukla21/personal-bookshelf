import React, { useState } from 'react';

function BookSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    fetch(`https://openlibrary.org/search.json?q=${searchQuery}&limit=10&page=1`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.docs);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleAddToBookshelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    bookshelf.push(book);
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
  };

  return (
    <div>
      <h1>Book Search Page</h1>
      <p>View your <a href="/bookshelf">personal bookshelf</a></p>
      <input
        type="text"
        placeholder="Search for a book"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((book) => (
          <li key={book.key}>
            <div>
              <h3>{book.title}</h3>
              <p>Author: {book.author_name}</p>
              <p>Published: {book.first_publish_year}</p>
              <button onClick={() => handleAddToBookshelf(book)}>Add to Bookshelf</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookSearch;
