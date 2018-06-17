const defaultState = [];

const messageReducer = (state = defaultState, action) => {
  console.log('MSG RED', action)

  if(action.meta) { return state }

  switch (action.type) {
    case 'SEND_MESSAGE':
      return [
        ...state,
        {
          body: action.body,
          userName: action.userName
        }
      ]
    case 'SEND_LOCAL_MESSAGE':
      return state
    default:
      return state;
  }
}

export default messageReducer;