import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'

import Navigation from '../Navigation'
import TopGames from '../Landing'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import PasswordForget from '../PasswordForget'
import Home from '../Home'
import Account from '../Account'
import Admin from '../Admin'

import * as ROUTES from '../../constants/routes'

const App = (props) => {
  const [ userId, setUserId ] = useState(null)

  console.log(userId);

  return(
  <div>
    <Navigation />
    <hr />
    {props.children}
    <Switch>
      <Route exact path ={ROUTES.LANDING} component= {TopGames}/>
      <Route exact path ={ROUTES.SIGN_UP} component= {SignUp}/>
      <Route exact path ={ROUTES.SIGN_IN} component= {SignIn}/>
      <Route exact path ={ROUTES.ACCOUNT} component= {Account}/>
    </Switch>
  </div>
  )
}

export default App
