const defaultState = {
  currentBid: 0
};

const bidReducer = (state = defaultState, action) => {
  console.log('RED', action)

  if(action.meta) { return state }

  switch (action.type) {
    case 'BROADCAST_BID':
      return {
        ...state,
        currentBid: action.bidAmount,
        userName: action.userName
      }
    default:
      return state
  }
}

export default bidReducer;