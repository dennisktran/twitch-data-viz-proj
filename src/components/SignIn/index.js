import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'

const SignIn = (props) => (
  <div>
    <h1>Sign In</h1>
     <SignInForm />
    </div>
)

class SignInFormBase extends Component {
  state = {
    email: '',
    password: '',
    error: null
  }

  onSubmit = event => {
      const { email, password } = this.state
      event.preventDefault()
      this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(signedIn => {
          console.log(signedIn)
          this.props.history.push(ROUTES.HOME)
        })
        .catch(error => {
          this.setState({error})
        })
  }

  onChange = event => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  render() {
    console.log(this.props);
    const {
      email,
      password,
      error
    } = this.state

    const isInvalid =
      password !== password ||
      email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name='email'
          value={email}
          onChange={this.onChange}
          type='text'
          placeholder='E-mail'
          />
        <input
          name='password'
          value={password}
          onChange={this.onChange}
          type='password'
          placeholder='Password'
          />

        <button type='submit' disabled={isInvalid}>Sign In</button>
          {error && error.message}
      </form>
    )
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase))

export default SignIn
