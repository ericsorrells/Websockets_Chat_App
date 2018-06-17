// ========================================================================================
import { actionCreators } from '../actions/actions';
// ========================================================================================

const createSocketMiddleware = () => {
  const SOCKET_STATES = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
  }

  var socket = null;

  const onOpen = (ws, store, action) => evt => {
    store.dispatch(actionCreators.socketConnected());
  }

  const onClose = (store) => evt => {
    store.dispatch(actionCreators.socketClose());
  }

  const onMessage = (ws, store) => evt => {
    const action = JSON.parse(evt.data)
    const newActionType = action.type.replace("BROADCAST", "RECEIVED")
    action.type = newActionType;
    store.dispatch(action)
  }

  return store => next => action => {
    switch (action.type) {
      case 'SOCKET_CONNECT':
        if (socket != null) {
          socket.close();
        }
        socket = new WebSocket('ws://localhost:3001');
        socket.onmessage = onMessage(socket, store);
        socket.onclose = onClose(socket, store);
        socket.onopen = onOpen(socket, store, action);
        break;
      case 'SOCKET_CLOSE':
        if (socket != null) {
          socket.close();
        }
        socket = null;
        break;
      default: //handle all other actions
        if (socket.readyState === SOCKET_STATES.OPEN && action.meta && action.meta.broadcast) {
          const sanitizedAction = {
            ...action,
            meta: undefined
          }
          socket.send(JSON.stringify(sanitizedAction));
        }
        return next(action);
    }
  }
}

export default createSocketMiddleware;
