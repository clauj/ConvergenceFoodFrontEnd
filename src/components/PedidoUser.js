import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../service/api';
import styles from './PedidoUser.module.css'
import { UserContext } from '../context/UserContext';

const PedidoUser = (props) => {

    const [loja, setLoja] = useState(null);
    const [pedido, setPedido] = useState(null);
    const { token } = useContext(UserContext);

    async function finalizarPedido(pedido_id) {
        let config = {
            method: "get",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        let dataAxios = {
        status: "Finalizado"
        }
        const { data } = await api.put(`pedido/${pedido_id}`, dataAxios, config);
    }

    useEffect(() => {

        const getLoja = async (loja_id) => {
            let config = {
                headers: {
                  Accept: "application/json"
                },
            };
        
            const { data: lojaData } = await api.get(`loja/${loja_id}`, config);
            console.log(lojaData);
            setLoja(lojaData);
        }

        const getPedido = async () => {
            let config = {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
            };
        
            const { data: pedidoData } = await api.get(`pedido/${props.id}`, config);
            setPedido(pedidoData);
            getLoja(pedidoData.pedido.loja_id);
        }
        getLoja();
        getPedido();

    }, []);

    return(
        pedido && loja ? 
            <div className={styles.pedidoAnimation}>
                <div className={styles.container}>
                    <div className={styles.lojaImage}>
                        <img className={styles.image} src={loja.loja.photo} />
                        <h3>{loja.loja.trading_name}</h3>
                    </div>
                    {props.status === 'Cancelado' &&
                        <span className={styles.broCancelado}/>
                    }
                    {props.status === 'Finalizado' &&
                        <span className={styles.broFinalizado}/>
                    }
                    {props.pendente && 
                        pedido.pedido.status === 'Entrega' ? 
                            <button className={styles.btnFinalizar} onClick={() => finalizarPedido(pedido.pedido.id)}>
                                Confirmar Entrega
                            </button>
                        :
                            props.pendente &&
                                <span className={styles.bro}/>

                    }
                    <div className={styles.statusPedido}>
                        <h4>Pedido {pedido.pedido.status}</h4>
                    </div>
                </div>
                
            </div>
        :
        null
    );

}

export default PedidoUser