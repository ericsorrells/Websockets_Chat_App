export const sendMessage = (message) => {
  return {
    type: 'WEBSOCKET_MESSAGE_SENT',
    message
  }
}