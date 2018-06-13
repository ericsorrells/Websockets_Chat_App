// Next let's write some action creators for handling socket activity
export const actionCreators = {
  socketOpen: e => ({ type: 'SOCKET_OPEN'}),
  socketClose: e => ({ type: 'SOCKET_CLOSE' }),
  socketError: err => ({ type: 'SOCKET_ERROR', payload: err }),
  socketMessage: data  => ({ type: 'SOCKET_MESSAGE', payload: data }),
  socketConnect: e => ({ type: 'SOCKET_CONNECT' })
}

export const sendMessage = () => {
  return {
    type: 'SEND_WEBSOCKET_MESSAGE'
  }
}