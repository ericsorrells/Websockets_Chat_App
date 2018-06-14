import { bindActionCreators } from 'redux'

// Here we write the function for creating our middleware
// Let's break down these arguments...
const createSocketMiddleware = (
  socketURL,          // the url our socket connects to
  subscribeData,      // the handshake data our socket will send once connected (optional)
  shouldInstantiate,  // a predicate function to know when to connect our socket
  eventHandlers       // the actions we want our socket to dispatch
) => store => next => action => {
  // console.log('SHOULD_INSTANTIAVTE', shouldInstantiate(action))
  // console.log('ACTION', action)
  // const SOCKET_STATES = {
  //   CONNECTING: 0,
  //   OPEN: 1,
  //   CLOSING: 2,
  //   CLOSED: 3
  // };

  let websocket = new WebSocket(socketURL);
  websocket.onopen    = function (evt) { onOpen(evt)    };
  websocket.onclose   = function (evt) { onClose(evt)   };
  websocket.onmessage = function (evt) { onMessage(evt) };
  websocket.onerror   = function (evt) { onError(evt)   };

  function onOpen(evt) {
    websocket.send(action);
  }

  function onClose(evt) {
    console.log("DISCONNECTED");
  }

  function onMessage(evt) {
    console.log('RECEIVING MESSAGE!', evt)
    // websocket.close();
  }

  function onError(evt) {
    console.log('ON ERROR', evt)

  }

  // if (shouldInstantiate(action)) {
  // instantiate the web socket
  // const ws = new window.WebSocket(socketURL)
  // console.log('WEBSOCKET INSTANTIATINGi: websocket', ws)
  // console.log('WEBSOCKET INSTANTIATINGi: readyState', ws.readyState)

  // bind eventHandlers to dispatch
  // const boundEventHandlers = bindActionCreators(eventHandlers, store.dispatch)
  // fire onopen event, and fire off a subscribe message with our handshake data
  // ws.onopen = e => {
  //   boundEventHandlers.onopen(e)
  //   ws.send(JSON.stringify({ type: 'subscribe', ...subscribeData }))
  // }
  // assign remaining event handlers
  //   ws.onclose = boundEventHandlers.onclose
  //   ws.onerror = boundEventHandlers.onerror
  //   ws.onmessage = boundEventHandlers.onmessage
  // } else {
  //   console.log('INSIDE ELSE STMT: sending', action)
  //   console.log('INSIDE ELSE STMT: socket', ws)
  //   if (ws.readyState === SOCKET_STATES.OPEN) {
  //     ws.send(action)
  //   } else {
  //     console.log('NOT IN READY STATE: ', ws.readyState)
  //   }
  //   return next(action)
  // }
}



// import { wsConnected, wsDisconnected } from 'actions';
// import { WS_ROOT } from 'const/global';
// import { actionCreators } from '../actions/actions'
// import store from '../store';

// const SOCKET_STATES = {
//   CONNECTING: 0,
//   OPEN: 1,
//   CLOSING: 2,
//   CLOSED: 3
// };

// const createSocketMiddleware = ({ dispatch }) => next => {
// const createSocketMiddleware = () => store => next => action => {
// console.log('CREATE SOCKET MIDDLEWARE!!!')
// console.log('MIDDLEWARE HAS STORE?:', store)

//   const websocket = new WebSocket('ws://localhost:3001/');

//   let active;

//   Object.assign(websocket, {
//     onopen() {
//       active = true;
//       websocket.send('We Are Connected!');
//       store.dispatch(actionCreators.socketConnect())
//     },
//     onclose() {
//       active = false;
//       store.dispatch(actionCreators.socketClose())
//     },
//     onerror(error) {
//       console.log(`WS Error: ${error.data}`);
//     },
//     onmessage(event) {
//       console.log('ON MESSAGE')
//       store.dispatch(event.data);
//     }
//   });

//   return action => {
//     if (websocket.readyState === SOCKET_STATES.OPEN &&
//       action.meta &&
//       action.meta.websocket) {

//       // Remove action metadata before sending
//       const cleanAction = Object.assign({}, action, {
//         meta: undefined
//       });
//       websocket.send(JSON.stringify(cleanAction));
//     }

//     next(action);
//   };
// }

export default createSocketMiddleware;
