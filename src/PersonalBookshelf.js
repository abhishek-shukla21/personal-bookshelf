import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PersonalBookshelf.css';

function PersonalBookshelf() {
  const [personalBookshelf, setPersonalBookshelf] = useState([]);

  useEffect(() => {
    const savedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setPersonalBookshelf(savedBookshelf);
  }, []);

  return (
    <div className="container">
      <h1>My Bookshelf</h1>
      <Link to="/">
        <button className="button-search">Back to Search</button>
      </Link>
      <div className="bookshelf">
        {personalBookshelf.map((book) => (
          <div className="book-card" key={book.key}>
            <h3>{book.title}</h3>
            <p>Edition Count: {book.edition_count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonalBookshelf;
