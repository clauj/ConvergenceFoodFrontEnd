import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import api from "../../service/api";
import styles from "./styles.module.css";
import InputMask from "react-input-mask";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function PagamentoForm({ handleSubmit }) {
  const [metodosPagamento, setMetodosPagamento] = useState([]);
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState(null);
  const [cardholderName, setCardHolderName] = useState(null);
  const [cardExpirationMonth, setCardExpirationMonth] = useState(null);
  const [cardExpirationYear, setCardExpirationYear] = useState(null);
  const [securityCode, setSecurityCode] = useState(null);
  const [identificationType, setIdentificationType] = useState("CPF");
  const [identificationNumber, setIdentificationNumber] = useState(null);

  const { enderecos, token } = useContext(UserContext);

  useEffect(() => {
    async function fetchMetodos() {
      let config = {
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

  const handleMaskCardNumber = (target) => {
      const number = target
    if (number.length === 19) {
        const tratado = number.replace(/\s/g, '');
        setCardNumber(tratado);
    }
  }

  const handleMaskIdentificationNumber = (target) => {
      const idnumber = target
      if (idnumber.length === 14) {
          const tratado = idnumber.replace(/[-.]/g, '');
          setIdentificationNumber(tratado);
      }
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit({
      metodoPagamento,
      cardNumber,
      cardholderName,
      cardExpirationMonth,
      cardExpirationYear,
      securityCode,
      identificationType,
      identificationNumber,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmitForm}>
      <div className={styles.bandeira}>
        <Select 
        label="Bandeira do Cartão"
        id="metodos"
        onChange={(id) => handleMetodo(id)}
        selected="selected"
        >
        {metodosPagamento
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((metodo) => (
            <MenuItem value={metodo.id} key={metodo.id}>{metodo.name}</MenuItem>
        ))
        }
        </Select>
      </div>
      <div>
        <InputMask
          mask="9999 9999 9999 9999"
          maskChar=" "
          value={cardNumber}
          onChange={({ target }) => {
            handleMaskCardNumber(target.value);
          }}
        >
          {(props) => (
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
          )}
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
            setCardExpirationMonth(target.value);
          }}
        >
          {(props) => (
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
          )}
        </InputMask>
      </div>
      <div>
        <InputMask
          mask="99"
          maskChar=" "
          value={cardExpirationYear}
          onChange={({ target }) => {
            setCardExpirationYear(target.value);
          }}
        >
          {(inputProps) => (
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
          )}
        </InputMask>
      </div>
      <div>
        <InputMask
          mask="999"
          maskChar=" "
          value={securityCode}
          onChange={({ target }) => {
            setSecurityCode(target.value);
          }}
        >
          {(props) => (
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
          )}
        </InputMask>
      </div>
      <div>
        <InputMask
          mask="999.999.999-99"
          maskChar=" "
          value={identificationNumber}
          onChange={({ target }) => {
            handleMaskIdentificationNumber(target.value);
          }}
        >
          {(props) => (
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
          )}
        </InputMask>
      </div>
      <div>
        <button disabled={loading} className={styles.pagamento}>
          {loading ? "Realizando pagamento..." : "Realizar Pagamento"}
        </button>
        <p>{erro}</p>
      </div>
    </form>
  );
}

export default PagamentoForm;
