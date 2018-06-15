import { bindActionCreators } from 'redux'

// Here we write the function for creating our middleware
// Let's break down these arguments...
const createSocketMiddleware = (
  socketURL,          // the url our socket connects to
  subscribeData,      // the handshake data our socket will send once connected (optional)
  shouldInstantiate,  // a predicate function to know when to connect our socket
  eventHandlers       // the actions we want our socket to dispatch
) => store => next => action => {
  console.log('SHOULD_INSTANTIAVTE', shouldInstantiate(action))
  console.log('ACTION', action)
  const SOCKET_STATES = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
  };

  const connect = () => {
    console.log('CONNECT: creating webSocket connection')
    return new Promise((resolve) => {
      const websocket = new WebSocket('ws://localhost:3001/');
      websocket.onopen = () => {
        console.log('RESOLVING CONNECT: ', websocket)
        resolve(websocket)
      }
    });
  }

  const websocket = new WebSocket(socketURL);
  // const websocket = connect();
  console.log('WEBSOCKET NOW ALIVE----------------------', websocket)
  websocket.onopen = function (evt) { onOpen(evt) };
  websocket.onclose = function (evt) { onClose(evt) };
  websocket.onmessage = function (evt) { onMessage(evt) };
  websocket.onerror = function (evt) { onError(evt) };

  function onOpen(evt) {
    if (shouldInstantiate(action)) {
      console.log('ON OPEN EVENT', evt)
      websocket.send(action);
    }
  }

  function onClose(evt) {
    console.log("DISCONNECTED");
  }

  function onMessage(evt) {
    console.log('RECEIVING MESSAGE!', evt)
    // store.dispatch(evt.data)
    // websocket.close();
  }

  function onError(evt) {
    console.log('ON ERROR', evt)
  }

  const handleActions = () => {
    console.log('ACTION META?', action.hasOwnProperty('meta'))
    console.log('READY STATE: ', websocket.readyState === SOCKET_STATES.OPEN)

    setTimeout(function () {
      if (websocket.readyState === SOCKET_STATES.OPEN && action.meta && action.meta.broadcast) {
        console.log('INSIDE META===================')
        console.log('INSIDE READY STATE: ', websocket.readyState === SOCKET_STATES.OPEN)
        const cleanAction = Object.assign({}, action, {
          meta: undefined
        });
        websocket.send(JSON.stringify(cleanAction));
        return {};
      }
      console.log('OUTSIDE META===================')
      console.log('INSIDE READY STATE: ', websocket.readyState === SOCKET_STATES.OPEN)
      next(action)
      // }
    }, 50)
  }

  return handleActions();
}

export default createSocketMiddleware;
