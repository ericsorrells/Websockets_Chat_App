// ========================================================================================
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import websocketReducer from './reducers/websocketReducer';
import { websocketSaga }    from './sagas/websocketSaga';
// ========================================================================================

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [sagaMiddleware];

const mainReducer = combineReducers({
  messages: websocketReducer
})

const store = createStore(
  mainReducer,
  composeEnhancers(applyMiddleware(...middlewares))
)

sagaMiddleware.run(websocketSaga);

export default store;