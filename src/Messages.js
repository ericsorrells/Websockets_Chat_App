import React, { Component } from 'react';
import { connect }             from 'react-redux';

const Messages = (props) => {
  const allMessages = props.messages.map((message) => {
    return (
      <p>
        <b>Message {message.id}:</b>
          {message.body}
      </p>
    )
  })
  return(
    <div>
      {allMessages}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages
  }
}


export default connect(mapStateToProps)(Messages);