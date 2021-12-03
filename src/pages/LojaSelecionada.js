import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "../pages/LojaSelecionada.module.css";
import api from "../service/api";
import { CartContext } from "../context/CartContext";


const LojaSelecionada = () => {
  const [produtosResponse, setProdutosResponse] = useState([]);
  const [lojaResponse, setLojaResponse] = useState([]);
  const {handleAddToCart} = useContext(CartContext);

  let params = useParams();

  useEffect(() => {
    async function fetchProdutos() {
      let config = {
        method: "get",
        headers: {},
      };

      const { data } = await api.get(`produtos/${params.id}`, config);
      setLojaResponse(data.loja);
      setProdutosResponse(data.produtos);
    }

    fetchProdutos();
  }, []);

  return (
    <>
      <div className={`${styles.section} container`}>
        <p className={styles.titulo}>{lojaResponse.corporate_name}</p>
        <div className={styles.lojas}>
          {produtosResponse.map((item) => (
            <div className={styles.loja} key={item.id} id={item.id}>
              <p>{item.name}</p>
              <p className={styles.price}>R${(item.price).toFixed(2).replace(".", ",")}</p>
              <p className={styles.description}>{item.description}</p>
              <img src={item.fotos[0].aws} alt={item.name}></img>
              <button type="button" onClick={() => handleAddToCart(item)}>Adicionar ao carrinho</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LojaSelecionada;
