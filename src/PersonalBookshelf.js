import React, { useState, useEffect } from 'react';

function PersonalBookshelf() {
  const [personalBookshelf, setPersonalBookshelf] = useState([]);

  useEffect(() => {
    // Load the user's personal bookshelf from localStorage when the component mounts
    const savedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setPersonalBookshelf(savedBookshelf);
  }, []);

  const handleRemoveFromBookshelf = (book) => {
    const updatedBookshelf = personalBookshelf.filter((item) => item.key !== book.key);
    setPersonalBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  return (
    <div>
      <h1>Personal Bookshelf Page</h1>
      <p>View the <a href="/">book search page</a></p>
      <ul>
        {personalBookshelf.map((book) => (
          <li key={book.key}>
            <div>
              <h3>{book.title}</h3>
              <p>Author: {book.author_name}</p>
              <p>Published: {book.first_publish_year}</p>
              <button onClick={() => handleRemoveFromBookshelf(book)}>Remove from Bookshelf</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PersonalBookshelf;
