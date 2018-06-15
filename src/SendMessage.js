// ========================================================================================
import React from 'react'
import { connect } from 'react-redux'
import { sendMessage, sendLocalMessage } from '../src/redux/actions/actions'
import { actionCreators } from '../src/redux/actions/actions'
// ========================================================================================

class SendMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messageText: ''
    }
    this.onTextEntry = this.onTextEntry.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.socketConnect();
  }

  onTextEntry(e) {
    this.setState({ messageText: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.sendMessage(this.state.messageText)
  }

  handleClick() {
    console.log('HANDLING CLICK')
    this.props.sendLocalMessage()
  }

  render() {
    return (
      <div>
        <h1>Send A Message</h1>
        <form className='form' onSubmit={this.handleSubmit}>
          <textarea onChange={this.onTextEntry} />
          <button type='submit' value={this.state.messageText}>Send Message</button>
        </form>
        <button onClick={this.handleClick}>Fire Local Action</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message) => dispatch(sendMessage(message)),
    sendLocalMessage: () => dispatch(sendLocalMessage()),
    socketConnect: () => dispatch(actionCreators.socketConnect())
  }
}

export default connect(null, mapDispatchToProps)(SendMessage);