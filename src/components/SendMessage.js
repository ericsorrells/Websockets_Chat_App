// ========================================================================================
import React from 'react'
import { connect } from 'react-redux'
import { sendMessage, sendLocalMessage } from '../../src/redux/actions/actions'
import { actionCreators } from '../../src/redux/actions/actions'
// ========================================================================================
import '../styles/SendMessages.css'
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
    e.preventDefault()
    this.props.sendMessage(this.state.messageText, this.props.userName)
    this.setState({ messageText: '' })
  }

  render() {
    return (
      <div className='send-message__container'>
        <hr/>
        <h3>Send Other Users A Message</h3>
        <form className='form' onSubmit={this.handleSubmit}>
          <textarea onChange={this.onTextEntry} className='send-message__input' value={this.state.messageText}/>
          <button type='submit' value={this.state.messageText} className='send-message__button full_width'>Send Message</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userName: state.user.name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message, userName) => dispatch(sendMessage(message, userName)),
    sendLocalMessage: () => dispatch(sendLocalMessage()),
    socketConnect: () => dispatch(actionCreators.socketConnect())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);