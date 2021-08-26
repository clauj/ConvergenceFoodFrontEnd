import React from 'react'
import { Route , Switch } from 'react-router-dom';
import Registro from '../components/Registro'
import Home from '../components/Home'
import Login from '../components/Login';

const AuthRoutes = () => {
  return (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/registrar" component={Registro} />
        <Route path="/login" component={Login} />
    </Switch>
  )
}

export default AuthRoutes;
