import React from 'react'
import { useParams } from 'react-router-dom';

const LojaSelecionada = () => {

    let route = useParams();
    console.log(route);

    return (
        <div>
            <p>Teste</p>
            <p>{route.id}</p>
        </div>
    )
}

export default LojaSelecionada
