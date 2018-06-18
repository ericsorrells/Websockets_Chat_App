// ========================================================================================
import React from 'react'
// ========================================================================================
import { connect } from 'react-redux';
import { broadcastBid } from '../redux/actions/bid_actions';
// ========================================================================================
import '../styles/Bid.css';
// ========================================================================================

class Bid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bidAmount: 0,
      error: ''
    }

    this.handleBid = this.handleBid.bind(this)
    this.clearBid = this.clearBid.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  handleBid(bidIncrement) {
    const currentBidAmount = this.state.bidAmount
    const newBidAmount = currentBidAmount + bidIncrement
    this.setState({ bidAmount: newBidAmount })
    this.setState({ error: '' })
  }

  clearBid() {
    this.setState({ bidAmount: 0 })
  }

  onFormSubmit(e) {
    e.preventDefault()
    if (isHighBid(this.state.bidAmount, this.props.currentBid)) {
      this.props.broadcastBid(this.state.bidAmount, this.props.userName)
      this.setState({ bidAmount: 0 })
    } else {
      this.setState({ error: 'Your Bid Is Less Than The Current High Bid!' })
    }
  }

  render() {
    return (
      <div>
        {shouldShowError(this.state.bidAmount, this.state.error) && <div className='bid__error'>{this.state.error} </div>}
        <div className='bid__user-bid'>
          ${this.state.bidAmount}
        </div>
        <form onSubmit={this.onFormSubmit}>
          <div>
            <button onClick={() => this.handleBid(50)} type='button' className='bid__button'>50</button>
            <button onClick={() => this.handleBid(-50)} type='button' className='bid__button'>-50</button>
          </div>
          <div>
            <button onClick={() => this.handleBid(100)} type='button' className='bid__button'>100</button>
            <button onClick={() => this.handleBid(-100)} type='button' className='bid__button'>-100</button>
          </div>
          <div>
            <button onClick={() => this.handleBid(500)} type='button' className='bid__button'>500</button>
            <button onClick={() => this.handleBid(-500)} type='button' className='bid__button'>-500</button>
          </div>
          <button onClick={() => this.clearBid()} type='button' className='bid__button full_width'>Clear Bid</button>
          <button type='submit' className='bid__button full_width'>Submit Bid</button>
        </form>
      </div>
    )
  }
}

const shouldShowError = (bidAmount, error) => {
  // console.log('ERROR: bidAmount', bidAmount > 0)
  // console.log('ERROR: error', error)
  // console.log('ERROR: bool', (bidAmount > 0 && error))
  return (bidAmount > 0 && error)
}

const isHighBid = (userBid, currentBid) => {
  // console.log('HIGH BID: userBid', userBid)
  // console.log('HIGH BID: currentBid', currentBid)
  // console.log('HIGH BID: bool', userBid > currentBid)
  return userBid > currentBid
}

const isHighBidder = (bidder, currentUser) => {
  return bidder === currentUser
}

const mapStateToProps = (state) => {
  return {
    currentBid: state.bid.currentBid,
    userName: state.user.name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    broadcastBid: (bidAmount, userName) => dispatch(broadcastBid(bidAmount, userName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bid);
