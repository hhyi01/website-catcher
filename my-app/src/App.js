import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InputURL from './InputURL';
import InputJob from './InputJob';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Fetch a URL!</h1>
        </header>
          <InputURL />
        <br />
          <InputJob />
      </div>
    );
  }
}

export default App;
