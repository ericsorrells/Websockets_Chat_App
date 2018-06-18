// ========================================================================================
import { actionCreators } from '../actions/actions';
// ========================================================================================

class WS {
  constructor(store) {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen    = this.onOpen(store)
    this.socket.onclose   = this.onClose(store)
    this.socket.onmessage = this.onMessage(store)
    this.socket.onerror   = this.onError(store)
  }

  onOpen = (store) => evt => {
    store.dispatch(actionCreators.socketConnected());
  }

  onClose = (store) => evt => {
    store.dispatch(actionCreators.socketClose());
  }

  onMessage = (store) => evt => {
    if(!action.meta) {
      const action = JSON.parse(evt.data)
      const newActionType = action.type.replace("BROADCAST", "RECEIVED")
      action.type = newActionType;
      store.dispatch(action)
    } else {
      throw 'Error Receiving Message Over Websocket Connection'
    }
  }

  onError = (store) => evt => {
    const error = Error('Websocket Error')
    console.error('ERROR:', error)
    store.dispatch(actionCreators.socketError(error))
  }
}

export default WS