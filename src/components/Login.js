// ========================================================================================
import React from 'react'
import { connect } from 'react-redux';
import { login } from '../redux/actions/user_actions';
// ========================================================================================
import '../styles/Login.css';
// ========================================================================================

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { userInfo: '' }

    this.onTextInput = this.onTextInput.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onTextInput(e) {
    this.setState({ userInfo: e.target.value })
  }

  onFormSubmit(e) {
    e.preventDefault()
    this.props.login(this.state.userInfo)
  }

  render() {
    return (
      <div className='login__container'>
        <form onSubmit={this.onFormSubmit} className='login__container'>
          <input onChange={this.onTextInput} className='login__input' placeholder='Enter User Name'/>
          <button className='login__button'>Submit Name</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (userInfo) => dispatch(login(userInfo))
  }
}

export default connect(null, mapDispatchToProps)(Login)