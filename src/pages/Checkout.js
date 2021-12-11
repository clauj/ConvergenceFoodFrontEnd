import React, { useContext, useState, useEffect } from "react";
import styles from "./Checkout.module.css";
import { CartContext } from "../context/CartContext";
import api from "../service/api";
import { useMercadopago } from "react-sdk-mercadopago";
import { UserContext } from "../context/UserContext";
import { useHistory } from 'react-router-dom';

const Checkout = () => {
  const [metodosPagamento, setMetodosPagamento] = useState([]);
  const [carrinho, setCarrinho] = useState({});
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState(null);
  const [cardholderName, setCardHolderName] = useState(null);
  const [cardExpirationMonth, setCardExpirationMonth] = useState(null);
  const [cardExpirationYear, setCardExpirationYear] = useState(null);
  const [securityCode, setSecurityCode] = useState(null);
  const [identificationType, setIdentificationType] = useState("CPF");
  const [identificationNumber, setIdentificationNumber] = useState("");

  const { cart, zerarCarrinho } = useContext(CartContext);
  const { enderecos, token } = useContext(UserContext);

  const history = useHistory();

  let config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const mp = useMercadopago.v2("TEST-45d242ff-5e8a-493d-bc94-9ee6853d7922", {
    locale: "pt-BR",
  });

  const handleCheckout = async () => {

    setErro("");
    setLoading(true);

    try {

      const cardTokenMp = await mp.createCardToken({
        cardNumber: cardNumber,
        cardholderName: cardholderName,
        cardExpirationMonth: cardExpirationMonth,
        cardExpirationYear: cardExpirationYear,
        securityCode: securityCode,
        identificationType: identificationType,
        identificationNumber: identificationNumber,
      });
      handleCreateCart(cardTokenMp);
    }
    catch (error) {
      console.log(error.response);
    }
  };

  const handleCreateCart = async (cardTokenMp) => {
    let valores = {
      loja_id: cart.loja_id,
      endereco_id: JSON.parse(enderecos[0].id),
    };
    try {
      const { data } = await api.post("carrinho", valores, config);
      handleAddProductOnCart(data, cardTokenMp);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProductOnCart = (carrinho, cardTokenMp) => {
    cart.items.map((produto) => {
      const dados = {
        amount: produto.quantidade,
        produto_id: produto.id,
        note: "",
      };
      api
        .post(`carrinho/${carrinho.carrinho.id}`, dados, config)
        .catch((error) => console.log(error));
    });
    setTimeout(() => handlePedido(carrinho, cardTokenMp), 3000);
  };

  const handlePedido = async (carrinho, cardTokenMp) => {
    console.log(carrinho);

    try {
      const { data } = await api.post(
        `pedido/carrinho/${carrinho.carrinho.id}`,
        {},
        config
      );
      setTimeout(() => handlePagamento(cardTokenMp, data), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePagamento = async (cardTokenMp, pedido) => {
    let dados = {
      token: cardTokenMp.id,
      metodo_pagamento: metodoPagamento,
      tipo_documento: "CPF",
      numero_documento: identificationNumber,
    };

    console.log("Dados: ", dados);

    try {
      setErro("");
      const response = await api.post(`pagamento/${pedido.pedido.id}`, dados, config);
      console.log(response);
      history.push({
        pathname: "/pedido",
        state: {
          pedido
        }
      });
      zerarCarrinho()
    }
    catch (error) {
      console.log(error.response.data.message);
      setErro(error.response.data.message);

    }
    finally {
      setLoading(false);
    };

  };

  useEffect(() => {
    async function fetchMetodos() {
      let config = {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.get(`pagamento/metodos`, config);
      setMetodosPagamento(data);
    }
    fetchMetodos();
  }, []);

  const handleMetodo = (metodo) => {
    setMetodoPagamento(metodo.target.value);
  };

  return (
    <div className={`container ${styles.items}`}>
      <div>
        <h1>Checkout</h1>
        {cart.items.map((item) => (
          <div className={styles.item}>
            <div className={styles.info}>
              <p className={styles.name}>{item.name}</p>
              <p className={styles.name}>Quantidade: {item.quantidade}</p>
              <p className={styles.price}>R${item.price.toFixed(2)}</p>
            </div>
            <div>
              <img
                src={item.fotos[0].path}
                alt={item.name}
                className={styles.foto}
              ></img>
            </div>
          </div>
        ))}
        <h2 className={styles.total}>
          Total da Compra: R$
          {cart.total.toFixed(2).toString().replace(".", ",")}
        </h2>
      </div>
      <form className={styles.form}>
        <div>
          <label htmlFor="metodos">Bandeira do Cartão:</label>
          <select name="metodos" id="metodos" onChange={(id) => handleMetodo(id)}>
            {metodosPagamento
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((metodo) => (
                <option value={metodo.id}>{metodo.name}</option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="cardNumber">Numero do Cartão:</label>
          <input
            type="number"
            id="cardNumber"
            name="cardNumber"
            onChange={(event) => setCardNumber(event.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="cardholderName">Nome do Titular:</label>
          <input
            type="text"
            id="cardholderName"
            name="cardholderName"
            onChange={(event) => setCardHolderName(event.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="cardExpirationMonth">Mês de expiração:</label>
          <input
            type="number"
            id="cardExpirationMonth"
            name="cardExpirationMonth"
            min="1"
            max="12"
            maxLength="2"
            onChange={(event) => setCardExpirationMonth(event.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="cardExpirationYear">Ano de expiração:</label>
          <input
            type="number"
            id="cardExpirationYear"
            name="cardExpirationYear"
            min="111"
            max="999"
            maxLength="3"
            onChange={(event) => setCardExpirationYear(event.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="securityCode">Código de Segurança (CVV):</label>
          <input
            type="number"
            id="securityCode"
            name="securityCode"
            min="3"
            max="3"
            maxLength="3"
            onChange={(event) => setSecurityCode(event.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="identificationNumber">CPF:</label>
          <input
            type="number"
            id="identificationNumber"
            name="identificationNumber"
            maxLength="11"
            onChange={(event) => setIdentificationNumber(event.target.value)}
          ></input>
        </div>
        <div>
          <button type="button" disabled={loading} className={styles.pagamento} onClick={() => handleCheckout()}>
            {loading ? "Realizando pagamento..." : "Realizar Pagamento"}
          </button>
          <p>{erro}</p>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
