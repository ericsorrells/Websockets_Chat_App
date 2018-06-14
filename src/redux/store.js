// ========================================================================================
import { createStore, combineReducers, applyMiddleware, compose, dispatch } from 'redux';
import createSagaMiddleware from 'redux-saga';
import websocketReducer from './reducers/websocketReducer';
import { websocketSaga }    from './sagas/websocketSaga';
import createSocketMiddleware from '../redux/middleware/middleware';
import { actionCreators } from '../redux/actions/actions';
// ========================================================================================


const mySocketURL = 'ws://localhost:3001/'
const mySubscribeData = { rotationalAxisIds: ['x', 'y', 'z'] }
const mySocketPredicate = (action) => action.type === 'SOCKET_CONNECT' // boolean
const myEventHandlers = {
  onopen: actionCreators.socketOpen,
  onclose: actionCreators.socketClose,
  onerror: actionCreators.socketError,
  onmessage: actionCreators.socketMessage
}

// const mySocketMiddleware = createSocketMiddleware()
const mySocketMiddleware = createSocketMiddleware(
  mySocketURL,
  mySubscribeData,
  mySocketPredicate,
  myEventHandlers
)

console.log('STORE: middleware', mySocketMiddleware)

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [sagaMiddleware, mySocketMiddleware];

const mainReducer = combineReducers({
  messages: websocketReducer
})

const store = createStore(
  mainReducer,
  composeEnhancers(applyMiddleware(...middlewares))
)

sagaMiddleware.run(websocketSaga);

export default store;