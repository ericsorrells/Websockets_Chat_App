// ========================================================================================
import React from 'react';
import { connect } from 'react-redux';
// ========================================================================================
import '../styles/HighBid.css';
// ========================================================================================

const HighBid = (props) => {
  return (
    <div className='high-bid__container'>
      <h4 className='high-bid__title'> The Current High Bid Is: </h4>
      <span className='high-bid__bid-amount'>${ props.currentBid }</span>
      {isHighBidder(props.highBidder, props.userName)
        && <p className='bid__high-bidder-msg'>You Are The High Bidder!</p>}
    </div>
  )
}

const isHighBidder = (bidder, currentUser) => {
  return bidder === currentUser
}

const mapStateToProps = (state) => {
  return {
    currentBid: state.bid.currentBid,
    highBidder: state.bid.userName,
    userName: state.user.name
  }
}

export default connect(mapStateToProps)(HighBid)