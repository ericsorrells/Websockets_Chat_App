const defaultState = {
  currentBid: 0
};

const bidReducer = (state = defaultState, action) => {
  if(action.meta) { return state }

  switch (action.type) {
    case 'BROADCAST_BID':
      return {
        ...state,
        currentBid: action.bidAmount
      }
    default:
      return state
  }
}

export default bidReducer;