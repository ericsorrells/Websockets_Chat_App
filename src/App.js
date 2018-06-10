// ========================================================================================
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import store from '../src/redux/store';
import Messages from '../src/Messages';
// ========================================================================================

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React Chat Messenger</h1>
          </header>
          <Messages />
        </div>
      </Provider>
    );
  }
}

export default App;
