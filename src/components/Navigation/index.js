import React from 'react'
import { NavLink } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

const Navigation = () => (
  <div>
    <ul>
      <li>
        <NavLink to={ROUTES.SIGN_IN}>SIGN IN</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.HOME}>HOME</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.LANDING}>LANDING</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.ACCOUNT}>ACCOUNT</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.ADMIN}>ADMIN</NavLink>
      </li>
    </ul>
  </div>
)

export default Navigation
