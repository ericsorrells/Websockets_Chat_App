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
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentBid: state.bid.currentBid
  }
}

export default connect(mapStateToProps)(HighBid)