const websocketReducerDefaultState = [
  { body: 'I am text message 1!' },
  { body: 'I am text message 2!' },
  { body: 'I am text message 3!' },
];

const websocketReducer = (state = websocketReducerDefaultState, action) => {
  console.log('REDUCER: ', action)

  switch (action.type) {
    case 'WEBSOCKET_MESSAGE_RECEIVED':
      return [
        ...state,
        {body: action.body}
      ]
    default:
      return state;
  }
}

export default websocketReducer;