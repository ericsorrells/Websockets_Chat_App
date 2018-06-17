// ========================================================================================
import { createStore, combineReducers, applyMiddleware, compose, dispatch } from 'redux';
import createSagaMiddleware from 'redux-saga';
import websocketReducer from './reducers/websocketReducer';
import bidReducer       from './reducers/bidReducer';
import messageReducer   from './reducers/messageReducer';
import userReducer      from './reducers/userReducer';
import { mainSaga }     from './sagas/saga';
import createSocketMiddleware from '../redux/middleware/middleware';
import { actionCreators } from '../redux/actions/actions';
// ========================================================================================


const mySocketPredicate = (action) => action.type === 'SOCKET_CONNECT' // boolean
const myEventHandlers = {
  onopen: actionCreators.socketOpen,
  onclose: actionCreators.socketClose,
  onerror: actionCreators.socketError,
  onmessage: actionCreators.socketMessage
}

//middlewares:
const mySocketMiddleware = createSocketMiddleware()
const sagaMiddleware = createSagaMiddleware();
const middlewares = [mySocketMiddleware, sagaMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const mainReducer = combineReducers({
  messages: messageReducer,
  bid: bidReducer,
  user: userReducer
})

const store = createStore(
  mainReducer,
  composeEnhancers(applyMiddleware(...middlewares))
)

sagaMiddleware.run(mainSaga);

export default store;