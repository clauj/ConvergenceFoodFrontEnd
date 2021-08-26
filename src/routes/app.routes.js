import React from 'react'
import { Route , Switch } from 'react-router-dom';
import Painel from '../components/Painel'

const AppRoutes = () => {
  return (
    <Switch>
        <Route path="/painel" component={<Painel />} />
    </Switch>
  )
}

export default AppRoutes;
