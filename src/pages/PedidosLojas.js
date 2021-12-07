import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../service/api";
import { UserContext } from "../context/UserContext";
import styles from "../pages/PedidosLojas.module.css"

const PedidosLojas = () => {

  const [pedidos, setPedidos] = useState([]);

    const params = useParams();
    console.log(params);

    const {token} = useContext(UserContext);

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
              setPedidos(data.pedidos);
        }
        getPedidos();
    }, []);

    console.log(pedidos);
  return (
    <div className={styles.pedidos}>
      <h1>Pedidos</h1>
      {pedidos.map((pedido) => (
        <div key={pedido.pedido.id} className={styles.pedido}>
          <p>ID do Pedido: {pedido.pedido.id}</p>
          <p>Preço: R${pedido.pedido.price.toFixed(2).replace(".", ",")}</p>
          <p>Status: {pedido.pedido.status === "Pagamento_Pendente" ? "Pagamento Pendente" : pedido.pedido.status}</p>
        </div>
      ))}
    </div>
  );
};

export default PedidosLojas;
