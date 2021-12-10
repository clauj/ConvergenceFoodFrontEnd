import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import api from "../../service/api";
import styles from './styles.module.css'

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
            identificationNumber
        })
    }


    return (
        <form className={styles.form} onSubmit={handleSubmitForm}>
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
                    min="111"
                    max="999"
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
                <button disabled={loading} className={styles.pagamento}>
                    {loading ? "Realizando pagamento..." : "Realizar Pagamento"}
                </button>
                <p>{erro}</p>
            </div>
        </form>
    );
}

export default PagamentoForm;