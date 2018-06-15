import { bindActionCreators } from 'redux'
import { messageReceived } from '../actions/actions';

// Here we write the function for creating our middleware
// Let's break down these arguments...
const createSocketMiddleware = (
  shouldInstantiate,  // a predicate function to know when to connect our socket
  eventHandlers       // the actions we want our socket to dispatch
) => store => next => action => {
  const shouldInstantiate = (action) => action.type === 'SOCKET_CONNECT'
  console.log('SHOULD_INSTANTIAVTE', shouldInstantiate(action))
  console.log('ACTION', action)
  const SOCKET_STATES = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
  };
  
  const websocket = new WebSocket('ws://localhost:3001/');
  // const websocket = connect();
  console.log('WEBSOCKET NOW ALIVE----------------------', websocket)
  websocket.onopen = function (evt) { onOpen(evt) };
  websocket.onclose = function (evt) { onClose(evt) };
  websocket.onmessage = function (evt) { onMessage(evt) };
  websocket.onerror = function (evt) { onError(evt) };

  function onOpen(evt) {
    if (shouldInstantiate(action)) {
      console.log('ON OPEN EVENT', evt)
      // websocket.send(action);
    }
  }

  function onClose(evt) {
    console.log("DISCONNECTED");
  }

  function onMessage(evt) {
    console.log('RECEIVING MESSAGE!', evt)
    // websocket.close();
    // const message = JSON.parse(evt.data);
    // store.dispatch(messageReceived(message.body))
  }

  function onError(evt) {
    console.log('ON ERROR', evt)
  }

  const handleActions = () => {
    console.log('ACTION META?', action.hasOwnProperty('meta'))
    console.log('READY STATE: ', websocket.readyState === SOCKET_STATES.OPEN)

    setTimeout(function () {
      if (websocket.readyState === SOCKET_STATES.OPEN && action.meta && action.meta.broadcast) {
        console.log('BROADCASTING===================')
        console.log('BROADCASTING READY STATE: ', websocket.readyState === SOCKET_STATES.OPEN)
        const cleanAction = Object.assign({}, action, {
          meta: undefined
        });
        websocket.send(JSON.stringify(cleanAction));
        return {};
      }
      console.log('NOT BROADCASTING===================')
      console.log('NOT BROADCASTING READY STATE: ', websocket.readyState === SOCKET_STATES.OPEN)
      next(action)
      // }
    }, 50)
  }

  return handleActions();
}

export default createSocketMiddleware;
