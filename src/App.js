// ========================================================================================
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from '../src/redux/store';
import Messages from '../src/components/Messages';
import SendMessage from '../src/components/SendMessage';
import HighBid from '../src/components/HighBid';
import Bid from '../src/components/Bid';
// ========================================================================================

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to Bidder</h1>
          </header>
          <div className='message_container'>
            <div>
              <HighBid/>
              <Bid />
              <SendMessage />
            </div>
            <Messages />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
