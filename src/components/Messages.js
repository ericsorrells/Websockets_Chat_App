// ========================================================================================
import React, { Component } from 'react';
import { connect } from 'react-redux';
// ========================================================================================
import '../styles/Messages.css';
// ========================================================================================

const Messages = (props) => {
  const currentUser = props.userName;
  const allMessages = props.messages.map((message) => {
    const userClass = message.userName === currentUser ? 'message__user-name-highight' : null
    return (
      <p>
        <b className={userClass}>{message.userName}: </b>
        {message.body}
      </p>
    )
  })

  return (
    <div>
      <h3>User Messages:</h3>
      <div className='message__container'>
        {allMessages}
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages,
    userName: state.user.name
  }
}


export default connect(mapStateToProps)(Messages);