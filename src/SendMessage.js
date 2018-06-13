// ========================================================================================
import React from 'react'
import { sendMessage } from '../src/redux/actions/actions';
// ========================================================================================

class SendMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messageText: ''
    }
    this.onTextEntry = this.onTextEntry.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onTextEntry(e) {
    this.setState({ messageText: e.target.value })
  }

  handleSubmit(e) {
    console.log('EVENT', e.target.value)
    e.preventDefault()
    sendMessage(this.state.messageText)
  }

  render() {
    return (
      <div>
        <h1>Send A Message</h1>
        <form className='form' onSubmit={this.handleSubmit}>
          <textarea onChange={this.onTextEntry} />
          <button type='submit' value={this.state.messageText}>Send Message</button>
        </form>
      </div>
    )
  }
}

export default SendMessage;