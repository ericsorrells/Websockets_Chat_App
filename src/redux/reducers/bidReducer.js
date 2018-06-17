const defaultState = {
  currentBid: 0
};

const bidReducer = (state = defaultState, action) => {
  if(action.meta) { return state }

  switch (action.type) {
    case 'RECEIVED_BID':
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