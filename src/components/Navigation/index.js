import React from 'react'
import { NavLink } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

const Navigation = () => (
  <div style={{backgroundColor: 'rgba(128,0,128, 0.3)'}}>
    <ul>
      <li>
        <NavLink to={ROUTES.SIGN_IN}>SIGN IN</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.SIGN_UP}>SIGN UP</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.ACCOUNT}>ACCOUNT</NavLink>
      </li>
    </ul>
  </div>
)

export default Navigation
