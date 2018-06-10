const websocketReducerDefaultState = [
  {id: 1, body: 'I am text message 1!'},
  {id: 2, body: 'I am text message 2!'},
  {id: 3, body: 'I am text message 3!'},
];

const websocketReducer = (state = websocketReducerDefaultState, action) => {
  switch(action.type) {
    default:
      return state;
  }
}

export default websocketReducer;