import React, { Component } from 'react';
import './App.css';
import Star from './components/star';
import Rating from './components/rating';
import data from './data.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Star data={'elo'} />
        <Rating data={data[0]} />
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
