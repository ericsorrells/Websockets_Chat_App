// ========================================================================================
import React from 'react'
import { actionCreators } from '../redux/actions/actions';
import { connect } from 'react-redux';
import Messages from './Messages';
import SendMessage from './SendMessage';
import HighBid from './HighBid';
import Login from './Login'
import Bid from './Bid'
// ========================================================================================

const Main = (props) => {
  const component = Object.keys(props.user).length > 0 ? <BidApp /> : <Login />
  return (
    <div>
      { component }
    </div>
  )
}

const BidApp = () => {
  return (
    <div className='app_container'>
      <div className='main__bid-container'>
        <HighBid />
        <Bid />
        <SendMessage />
      </div>
      <div className='main__messages-container'>
        <Messages />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Main)