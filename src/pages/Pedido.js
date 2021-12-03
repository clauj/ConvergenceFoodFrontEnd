import React from 'react'
import { useHistory } from 'react-router-dom';

const Pedido = () => {

    const history = useHistory();
    const pedido = history?.location?.state?.pedido;
    console.log(pedido);

    return (
        <div className={`container`}>
            <h1>Pedido</h1>
            <h3>{pedido.message}</h3>
            <p>ID do Pedido: {pedido.pedido.id}</p>
            <p>Estabelecimento: {pedido.loja[0].corporate_name}</p>
            <p>Valor: R${pedido.pedido.price.toFixed(2).toString().replace(".", ",")}</p>
            <p></p>
        </div>
    )
}

export default Pedido
