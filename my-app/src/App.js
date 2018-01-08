import React, { Component } from 'react';
import './App.css';
import InputURL from './InputURL';
import InputJob from './InputJob';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Website Catcher</h1>
        </header>
          <InputURL />
        <br />
          <InputJob />
      </div>
    );
  }
}

export default App;
