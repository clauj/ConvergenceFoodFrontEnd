import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../components/Home'
import Login from '../components/Login'
import Registro from '../components/Registro'
import Painel from '../components/Painel'
import MinhaConta from '../components/MinhaConta'
import ProtectedRoute from './ProtectedRoute';
import Footer from '../components/Footer';
import Termos from '../components/Termos';
import Carrinho from '../components/Carrinho';

const GlobalRoutes = () => {
    return ( 
        <BrowserRouter>
            <Header />
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/registrar" component={Registro} />
                <Route path="/termos" component={Termos} />
                <ProtectedRoute path="/painel" component={Painel} />
                <ProtectedRoute path="/minhaconta" component={MinhaConta} />
                <ProtectedRoute path="/carrinho" component={Carrinho} />
            <Footer />
        </BrowserRouter>
    )
}

export default GlobalRoutes;
