export const broadcastBid = (bidAmount) => {
  console.log('BROADCAST BID', bidAmount)

  return {
    type: 'BROADCAST_BID',
    bidAmount,
    meta: {
      broadcast: true
    }
  }
}