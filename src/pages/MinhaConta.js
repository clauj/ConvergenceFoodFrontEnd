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
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        async function getPedidos() {
    
            let config = {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
              };
    
            try {
                const { data: dataAndamento } = await api.get("pedidos/andamento/user", config);
                setPedidosAndamento(dataAndamento.pedidos);
            } catch (error) {
                
            }

            try {
                const { data: dataFinalizados} = await api.get("pedidos/finalizados/user", config);
                setPedidosFinalizados(dataFinalizados.pedidos);
            } catch (error) {
                
            }
        }
        getPedidos();
    },[user.admin === 1]);


    return (
        <div className={`container ${styles.container}`}>
            <h1>Minha Conta</h1>
            {user?.admin === 1 ? (
                <Lojas />
            ) : (
                <div>
                    <h2>Pedidos em andamento</h2>
                    <div className={styles.pedidos}>
                        {pedidosAndamento.length > 0 && 
                            pedidosAndamento.map((pedido) => (
                                <PedidoUser key={`${pedido.id}`} pendente id={pedido.id}/>
                            ))
                        }
                    </div>
                    <h2>Meus Pedidos</h2>
                    <div className={styles.pedidos}>
                        {pedidosFinalizados.length > 0 && 
                            pedidosFinalizados.map((pedido) => (
                                <PedidoUser key={`${pedido.id}`} status={pedido.status} id={pedido.id} />
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default MinhaConta
