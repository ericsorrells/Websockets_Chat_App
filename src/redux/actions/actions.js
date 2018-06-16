// Next let's write some action creators for handling socket activity
export const actionCreators = {
  socketConnected: e => ({ type: 'SOCKET_CONNECTED'}),
  socketClose: e => ({ type: 'SOCKET_CLOSE' }),
  socketError: err => ({ type: 'SOCKET_ERROR', payload: err }),
  socketMessage: data  => ({ type: 'SOCKET_MESSAGE', payload: data }),
  socketConnect: e => ({ type: 'SOCKET_CONNECT' })
}

export const messageReceived = (body) => {
  return {
    type: 'WEBSOCKET_MESSAGE_RECEIVED',
    body
  }
}

export const sendMessage = (body) => {
  return {
    type: 'SEND_MESSAGE',
    meta: { broadcast: true },
    body
  }
}

export const sendLocalMessage = () => {
  return {
    type: 'SEND_LOCAL_MESSAGE'
  }
}