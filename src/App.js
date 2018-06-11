// ========================================================================================
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import store from '../src/redux/store';
import Messages from '../src/Messages';
import SendMessage from '../src/SendMessage';
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
          <div className='message_container'>
            <SendMessage />
            <Messages />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
