export const sendMessage = (message) => {
  console.log('SEND MESSAGE ACTION: ', message)

  return {
    type: 'WEBSOCKET_MESSAGE_SENT',
    message
  }
}

export const receivedMessage = (message) => {
  console.log('RECEIVED MSG ACTION', message)

  return {
    type: 'WEBSOCKET_MESSAGE_RECEIVED',
    message
  }
}