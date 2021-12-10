import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Lojas from '../pages/Lojas'

const MinhaConta = () => {
    const { user } = useContext(UserContext);

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
