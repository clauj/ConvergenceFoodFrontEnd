import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../components/Home'
import Login from '../components/Login'
import Registro from '../components/Registro'
import Painel from '../components/Painel'
import MinhaConta from '../components/MinhaConta'
import ProtectedRoute from './ProtectedRoute';

const GlobalRoutes = () => {
    return (
        <BrowserRouter>
            <Header />
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/registrar" component={Registro} />
                <ProtectedRoute path="/painel" component={Painel} />
                <ProtectedRoute path="/minhaconta" component={MinhaConta} />
        </BrowserRouter>
    )
}

export default GlobalRoutes;
