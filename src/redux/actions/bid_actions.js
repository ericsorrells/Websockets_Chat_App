export const broadcastBid = (bidAmount, userName) => {
  return {
    type: 'BROADCAST_BID',
    bidAmount,
    userName,
    meta: {
      broadcast: true
    }
  }
}