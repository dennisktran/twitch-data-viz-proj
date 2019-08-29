import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Navigation from '../Navigation'
import Landing from '../Landing'
import SignUp from '../Signup'
import SignIn from '../SignIn'
import PasswordForget from '../PasswordForget'
import Home from '../Home'
import Account from '../Account'
import Admin from '../Admin'

import * as ROUTES from '../../constants/routes'

console.log(process.env);

const App = () => (
  <div>
    <Navigation />
    <hr />
    <Switch>
      <Route exact path ={ROUTES.LANDING} component= {Landing}/>
      <Route exact path ={ROUTES.SIGN_UP} component= {SignUp}/>
      <Route exact path ={ROUTES.SIGN_IN} component= {SignIn}/>
      <Route exact path ={ROUTES.ACCOUNT} component= {Account}/>
      <Route exact path ={ROUTES.PASSWORD_FORGET} component= {PasswordForget}/>
      <Route exact path ={ROUTES.HOME} component= {Home}/>
      <Route exact path ={ROUTES.ADMIN} component= {Admin}/>
    </Switch>
  </div>
)

export default App
