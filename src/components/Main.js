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
    <div className='message_container'>
      <div>
        <HighBid />
        <Bid />
        <SendMessage />
      </div>
      <Messages />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Main)