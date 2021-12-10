import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import Lojas from '../pages/Lojas'
import api from '../service/api'

const MinhaConta = () => {
    const { user, token } = useContext(UserContext);

    useEffect(() => {
        async function getPedidos() {
    
            let config = {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
              };
    
            try {
                const {data} = api.get("/pedidos", config);
                console.log(data);
            } catch (error) {
                
            }
        }
        getPedidos();
    },[user.admin === 1]);


    return (
        <div className={`container`}>
            <h1>Minha Conta</h1>
            {user?.admin === 1 ? (
                <Lojas />
            ) : (
                <p>Dados da conta.</p>
            )}
        </div>
    )
}

export default MinhaConta
