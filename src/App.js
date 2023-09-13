import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BookSearch from './BookSearch';
import PersonalBookshelf from './PersonalBookshelf';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={BookSearch} />
        <Route path="/bookshelf" component={PersonalBookshelf} />
      </Switch>
    </Router>
  );
}

export default App;
