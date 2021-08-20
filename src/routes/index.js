import React, {useState} from 'react'
import { BrowserRouter } from 'react-router-dom';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const GlobalRoutes = () => {
    const [logado, setLogado] = useState(false);
    return (
        <BrowserRouter>
            {logado ? <AppRoutes/> : <AuthRoutes/>}
        </BrowserRouter>
    )
}

export default GlobalRoutes;
