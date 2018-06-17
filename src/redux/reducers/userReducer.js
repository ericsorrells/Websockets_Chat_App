const defaultState = {};

const userReducer = (state = defaultState, action) => {
  if (action.meta) { return state }

  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        name: action.userInfo
      }
    default:
      return state
  }
}

export default userReducer