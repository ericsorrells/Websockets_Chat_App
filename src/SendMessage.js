// ========================================================================================
import React, { Component } from 'react'
// ========================================================================================

class SendMessage extends React.Component {
  onSubmit() {

  }

  render() {
    return (
      <div>
        <t4>Send A Message</t4>
        <form className='form'>
          <textarea></textarea>
          <button type='submit'>Send Message</button>
        </form>
      </div>
    )
  }
}

export default SendMessage;