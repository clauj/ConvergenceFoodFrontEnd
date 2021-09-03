import React, {useState, useContext} from 'react'
import { BrowserRouter } from 'react-router-dom';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import Header from '../components/Header';
import { UserContext } from '../context/UserContext';

const GlobalRoutes = () => {
    const { login } = useContext(UserContext);

    return (
        <BrowserRouter>
            <Header />
            {login ? <AppRoutes/> : <AuthRoutes/>}
        </BrowserRouter>
    )
}

export default GlobalRoutes;
