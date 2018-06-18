// ========================================================================================
import WS from '../utils/websocket'
// ========================================================================================

const createSocketMiddleware = () => {
  const SOCKET_STATES = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
  }

  let socket = null;

  return store => next => action => {
    switch (action.type) {
      case 'SOCKET_CONNECT':
        if (socket != null) {
          socket.close();
        }
        socket = new WS(store).socket
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
