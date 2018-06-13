export const sendMessage = (message) => {
  console.log('SEND_MESSAGE_ACTION', message)

  return {
    type: 'WEBSOCKET_MESSAGE_SENT',
    message
  }
}