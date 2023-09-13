import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookSearch from './BookSearch';
import PersonalBookshelf from './PersonalBookshelf';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={BookSearch} />
        <Route path="/bookshelf" component={PersonalBookshelf} />
      </Switch>
    </Router>
  );
}

export default App;
