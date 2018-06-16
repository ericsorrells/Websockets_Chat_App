const defaultState = [];

const messageReducer = (state = defaultState, action) => {
  if(action.meta) { return state }

  switch (action.type) {
    case 'SEND_MESSAGE':
      return [
        ...state,
        {body: action.body}
      ]
    case 'SEND_LOCAL_MESSAGE':
      return state
    default:
      return state;
  }
}

export default messageReducer;