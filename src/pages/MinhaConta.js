import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import styles from "../pages/MinhaConta.module.css";
import PedidoUser from "../components/PedidoUser";
import Lojas from '../pages/Lojas';
import api from '../service/api';

const MinhaConta = () => {
    const { user, token } = useContext(UserContext);
    const [pedidosAndamento, setPedidosAndamento] = useState([]);
    const [pedidosFinalizados, setPedidosFinalizados] = useState([]);
    const [pedidos,setPedidos] = useState([]);

    const [update, setUpdate] = useState(false);

    useEffect(() => {
        async function getPedidos() {
            let pedidosEmAndamento, pedidosFinalizados; 
            let config = {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
              };
    
            try {
                const { data: dataAndamento } = await api.get("pedidos/andamento/user", config);
                pedidosEmAndamento = dataAndamento.pedidos;
            } catch (error) {
                
            }

            try {
                const { data: dataFinalizados} = await api.get("pedidos/finalizados/user", config);
                pedidosFinalizados = dataFinalizados.pedidos;
            } catch (error) {
                
            }
            setPedidos([...pedidosEmAndamento, ...pedidosFinalizados])
        }
        if(user.admin === 0) getPedidos();
    },[user]);

    const getPedidos = async () => {
        let pedidosEmAndamento, pedidosFinalizados; 
            let config = {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
              };
    
            try {
                const { data: dataAndamento } = await api.get("pedidos/andamento/user", config);
                pedidosEmAndamento = dataAndamento.pedidos;
                const { data: dataFinalizados} = await api.get("pedidos/finalizados/user", config);
                pedidosFinalizados = dataFinalizados.pedidos;
                setPedidos([...pedidosEmAndamento, ...pedidosFinalizados])
            } catch (error) {
                console.log(error)
            }
    };

    console.log(pedidos);

    const updatePedido = (pedido) => {
        const updatedPedidos = pedidos.map(item => item.id === pedido.id ? pedido : item);
        setPedidos(updatedPedidos);
    }

    return (
        <div className={`container ${styles.container}`}>
            <h1>Minha Conta</h1>
            {user?.admin === 1 ? (
                <Lojas />
            ) : (
                <div>
                    <h2>Pedidos em andamento</h2>
                    <button onClick={() => getPedidos()} className={styles.atualizar}>Atualizar</button>
                    <div className={styles.pedidos}>
                        {pedidos.map(pedido =>  (pedido.status !== 'Finalizado' && pedido.status !== 'Cancelado') &&  (
                            <PedidoUser 
                                key={`${pedido.id}`}  
                                id={pedido.id} 
                                status={pedido.status} 
                                setPedidos={setPedidos}
                                updatePedido={updatePedido}
                            />
                        ))}
                    </div>
                    <h2>Meus Pedidos</h2>
                    <div className={styles.pedidos}>
                        {pedidos.map((pedido) => (pedido.status === 'Finalizado' || pedido.status === ' Cancelado') &&   (
                            <PedidoUser 
                                key={`${pedido.id}`} 
                                id={pedido.id} 
                                status={pedido.status} 
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MinhaConta
