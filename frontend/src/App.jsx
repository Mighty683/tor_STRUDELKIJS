import React, { Component } from 'react';
import './App.scss';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Main from './pages/Main';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Main />

          <Route path="/" exact component={Main} />
        </Router>
      </div>
    );
  }
}

export default App;
