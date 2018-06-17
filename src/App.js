// ========================================================================================
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './redux/store';
import { actionCreators } from './redux/actions/actions';
import Main from './components/Main'
// ========================================================================================

class App extends Component {
  componentDidMount() {
    store.dispatch(actionCreators.socketConnect());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to Bidder</h1>
          </header>
          <Main />
        </div>
      </Provider>
    );
  }
}

export default App
