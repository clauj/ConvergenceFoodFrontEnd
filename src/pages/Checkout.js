import React, { useContext, useState, useEffect } from "react";
import styles from "./Checkout.module.css";
import { CartContext } from "../context/CartContext";
import api from "../service/api";
import { useMercadopago } from "react-sdk-mercadopago";
import { UserContext } from "../context/UserContext";
import { useHistory } from 'react-router-dom';
import InputMask from "react-input-mask";
import TextField from "@material-ui/core/TextField";

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
  const [identificationNumber, setIdentificationNumber] = useState('');

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
        cardNumber: cardNumber.replace(/\s/g, ''),
        cardholderName: cardholderName,
        cardExpirationMonth: cardExpirationMonth,
        cardExpirationYear: cardExpirationYear,
        securityCode: securityCode,
        identificationType: identificationType,
        identificationNumber: identificationNumber.replace(/\.|\-/g, ''),
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
          <InputMask
            mask="9999 9999 9999 9999" 
            maskChar=" " 
            value={cardNumber} 
            onChange={({ target }) => {
              setCardNumber(target.value) 
            }}
          >
            {(props) => 
                <TextField
                  {...props}
                  variant="outlined"
                  required
                  fullWidth
                  name="cardNumber"
                  label="Numero do Cartão"
                  type="text"
                  id="cardNumber"
                  autoComplete="cardNumber"
                />
              }
          </InputMask>
        </div>
        <div>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="cardholderName"
            label="Nome do Titular"
            type="text"
            id="cardholderName"
            autoComplete="cardholderName"
            onChange={({ target }) => setCardHolderName(target.value)}
          />
        </div>
        <div>
          <InputMask
            mask="99" 
            maskChar=" " 
            value={cardExpirationMonth} 
            onChange={({ target }) => {
              setCardExpirationMonth(target.value) 
            }}
          >
            {(props) => 
                <TextField
                  {...props}
                  variant="outlined"
                  required
                  fullWidth
                  name="cardExpirationMonth"
                  label="Mês de expiração"
                  type="text"
                  id="cardExpirationMonth"
                  autoComplete="cardExpirationMonth"
                />
              }
          </InputMask>
        </div>
        <div>
          <InputMask
            mask="99" 
            maskChar=" " 
            value={cardExpirationYear} 
            onChange={({ target }) => {
              setCardExpirationYear(target.value) 
            }}
          >
            {(inputProps) => 
                <TextField
                  {...inputProps}
                  variant="outlined"
                  required
                  fullWidth
                  name="cardExpirationYear"
                  label="Ano de expiração"
                  type="text"
                  id="cardExpirationYear"
                  autoComplete="cardExpirationYear"
              />
              }
          </InputMask>
        </div>
        <div>
          <InputMask
            mask="999" 
            maskChar=" " 
            value={securityCode} 
            onChange={({ target }) => {
              setSecurityCode(target.value) 
            }}
          >
            {(props) => 
                <TextField
                  {...props}
                  variant="outlined"
                  required
                  fullWidth
                  name="securityCode"
                  label="Código de Segurança"
                  type="text"
                  id="securityCode"
                  autoComplete="securityCode"
                />
              }
          </InputMask>
        </div>
        <div>
        <InputMask mask="999.999.999-99" maskChar=" " value={identificationNumber} onChange={({ target }) => {
            setIdentificationNumber(target.value) 
          }}>
            {(props) => 
              <TextField
                {...props}
                type="text"
                variant="outlined"
                required
                id="identificationNumber"
                label="CPF"
                name="identificationNumber"
                autoComplete="identificationNumber"
                fullWidth
                disableUnderline
              />
            }
          </InputMask>
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
