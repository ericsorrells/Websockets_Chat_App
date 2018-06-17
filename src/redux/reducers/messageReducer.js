const defaultState = [];

const messageReducer = (state = defaultState, action) => {
  if(action.meta) { return state }

  switch (action.type) {
    case 'SEND_LOCAL_MESSAGE':
    case 'SEND_MESSAGE':
      return [
        ...state,
        {
          body: action.body,
          userName: action.userName
        }
      ]
    default:
      return state;
  }
}

export default messageReducer;