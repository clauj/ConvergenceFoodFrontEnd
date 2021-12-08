import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../pages/Home'
import Login from '../pages/Login'
import Registro from '../pages/Registro'
import RegistroAdmin from '../pages/RegistroAdmin'
import Painel from '../pages/Painel'
import MinhaConta from '../pages/MinhaConta'
import ProtectedRoute from './ProtectedRoute';
import Footer from '../components/Footer';
import Termos from '../pages/Termos';
import Carrinho from '../pages/Carrinho';
import Produtos from '../pages/Produtos';
import Lojas from '../pages/Lojas';
import LojaSelecionada from '../pages/LojaSelecionada';
import Checkout from '../pages/Checkout';
import Pedido from '../pages/Pedido';
import Assinatura from '../pages/Assinatura';

const GlobalRoutes = () => {
    return ( 
        <BrowserRouter>
            <Header />
            <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/registrar" component={Registro} />
                    <Route path="/registrar/plano" component={RegistroAdmin} />
                    <Route  path="/termos" component={Termos} />
                    <Route  path="/assine" component={Assinatura} />
                    <ProtectedRoute exact path="/loja/:id" component={LojaSelecionada} />
                    <ProtectedRoute path="/produtos" component={Produtos} />
                    <ProtectedRoute exact path="/lojas" component={Lojas} />
                    <ProtectedRoute path="/lojas/:id" component={Produtos} />
                    <ProtectedRoute path="/painel" component={Painel} />
                    <ProtectedRoute path="/minhaconta" component={MinhaConta} />
                    <ProtectedRoute path="/carrinho" component={Carrinho} />
                    <ProtectedRoute path="/checkout" component={Checkout} />
                    <ProtectedRoute path="/pedido" component={Pedido} />
            </Switch>
            <Footer />
        </BrowserRouter>
    )
}

export default GlobalRoutes;
