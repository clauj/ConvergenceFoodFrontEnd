import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../service/api";
import { UserContext } from "../context/UserContext";
import styles from "../pages/PedidosLojas.module.css"

const PedidosLojas = () => {

  const [pedidos, setPedidos] = useState([]);
  const [update, setUpdate] = useState(true);
    const params = useParams();
    console.log(params);

    const {token} = useContext(UserContext);

    // useEffect(() => {
    //     async function getPedidos() {
            
    //         let config = {
    //             method: "get",
    //             headers: {
    //               Accept: "application/json",
    //               Authorization: `Bearer ${token}`,
    //             },
    //           };

    //           const { data} = await api.get(`pedidos/loja/${params.id}`, config);
    //           console.log(data.pedidos);
    //           setPedidos(data.pedidos);
    //     }
    //     getPedidos();
    //     setInterval(getPedidos, 20000);
    // }, []);

    useEffect(() => {
      async function getPedidos() {
          
          let config = {
              method: "get",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            };

            const { data} = await api.get(`pedidos/loja/${params.id}`, config);
            console.log(data.pedidos);
            setPedidos(data.pedidos);
      }
      getPedidos();
  }, [[...pedidos], update]);

    async function aceitarPedido(id_pedido) {
      let config = {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let dataAxios = {
        status: "Aceito"
      }
      const { dataAceita } = await api.put(`pedido/${id_pedido}`, dataAxios, config);
      setUpdate(!update);
    }

    
    async function recusarPedido(id_pedido) {
      let config = {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let dataAxios = {
        status: "Cancelado"
      }
      const { dataRecusa } = await api.put(`pedido/${id_pedido}`, dataAxios, config);
      setUpdate(!update);
    }

    async function entregaPedido(id_pedido) {
      let config = {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let dataAxios = {
        status: "Entrega"
      }
      const { dataRecusa } = await api.put(`pedido/${id_pedido}`, dataAxios, config);
      setUpdate(!update);
    }

  return (
    <div className={styles.pedidos}>
      <h1>Pedidos</h1>
      {pedidos.length === 0 ? <p>Não existem pedidos nesta loja.</p> :
        pedidos.map((pedido) => (
          pedido.status != "Pagamento_Pendente" &&
          <div key={pedido.id} className={styles.pedido}>
            <p>ID do Pedido: {pedido.id}</p>
            <p>Preço: R${pedido.price.toFixed(2).replace(".", ",")}</p>
            <p>Status: {pedido.status === "Pagamento_Pendente" ? "Pagamento Pendente" : pedido.status}</p>
            {pedido.status === 'Pendente' ? 
              <>
                <button onClick={() => aceitarPedido(pedido.id)} >Aceitar Pedido</button>
                <button onClick={() => recusarPedido(pedido.id)} >Recusar Pedido</button>
              </>
              :
                pedido.status != 'Cancelado' && pedido.status == 'Aceito' &&
                <>
                  <button onClick={() => recusarPedido(pedido.id)} >Cancelar Pedido</button>
                  <button onClick={() => entregaPedido(pedido.id)} >Informar Envio</button>
                </>
            }
          </div>
        ))
      }
    </div>
  );
};

export default PedidosLojas;
