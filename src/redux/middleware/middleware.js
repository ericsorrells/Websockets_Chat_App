import { bindActionCreators } from 'redux'

// Here we write the function for creating our middleware
// Let's break down these arguments...
const createSocketMiddleware = (
  socketURL,          // the url our socket connects to
  subscribeData,      // the handshake data our socket will send once connected (optional)
  shouldInstantiate,  // a predicate function to know when to connect our socket
  eventHandlers       // the actions we want our socket to dispatch
) => store => next => action => {
  console.log('SOCKET URL', socketURL);
  console.log('SUBSCRIBE DATA: ', subscribeData)
  console.log('SHOULD_INSTANTIATE', shouldInstantiate)
  console.log('EVENT_HANDLERS', eventHandlers)
  console.log('ACTION', action)

  if (shouldInstantiate(action)) {
    // instantiate the web socket
    const ws = new window.WebSocket(socketURL)
    console.log('WEBSOCKET INSIDE', ws)

    // bind eventHandlers to dispatch
    const boundEventHandlers = bindActionCreators(eventHandlers, store.dispatch)
    // fire onopen event, and fire off a subscribe message with our handshake data
    ws.onopen = e => {
      boundEventHandlers.onopen(e)
      ws.send(JSON.stringify({ type: 'subscribe', ...subscribeData }))
    }
    // assign remaining event handlers
    ws.onclose   = boundEventHandlers.onclose
    ws.onerror   = boundEventHandlers.onerror
    ws.onmessage = boundEventHandlers.onmessage
  } else {
    console.log('INSIDE ELSE STMT: sending', action)
    return next(action)
  }
}

export default createSocketMiddleware;