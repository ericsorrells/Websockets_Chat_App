// ========================================================================================
import React from 'react'
import { connect } from 'react-redux'
import { sendMessage } from '../src/redux/actions/actions'
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

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message) => dispatch(sendMessage(message)),
    socketConnect: () => dispatch(actionCreators.socketConnect())
  }
}

export default connect(null, mapDispatchToProps)(SendMessage);