import React, { useEffect, useState, useContext } from 'react'
import api from '../service/api'
import { UserContext } from "../context/UserContext";
import styles from '../pages/Assinatura.module.css'
import { useHistory } from 'react-router';
import PagamentoForm from '../components/PagamentoForm';
import { useMercadopago } from 'react-sdk-mercadopago/lib';

const Assinatura = () => {
    const [paymentModal, setPaymentModal] = useState(false);
    const [planos, setPlanos] = useState([]);
    const [planoEscolhido, setPlanoEscolhido] = useState({});
    const { token, user, setAssinatura, getUser, assinatura } = useContext(UserContext);
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
    useEffect(() => {
        async function getAssinaturas() {
            let config = {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await api.get("assinaturas", config);
            setPlanos(data.assinaturas)
            console.log(data.assinaturas)
        }

        if (user?.admin === 1) {
            getAssinaturas();
        }
        return user?.admin === 0 ? getAssinaturas() : history.push('/minhaconta')
    }, [token, user, history]);

    const handleSubmit = async (data) => {


        const token = await mp.createCardToken(data);

        try {
            await api.post(`assinatura/pagamento/${planoEscolhido.id}`, {
                token: token.id,
                metodo_pagamento: data.metodoPagamento,
                tipo_documento: 'CPF',
                numero_documento: data.identificationNumber
            }, config);
            getUser();
            localStorage.setItem("@convergencefood:assinatura", JSON.stringify(assinatura));
            history.push('/minhaconta')
        } catch (error) {
            alert('Erro no pagamento.')
        }
    }

    const handleSubscribe = (plano) => {
        setPlanoEscolhido(plano)
        setPaymentModal(true);
    }
    return (
        <>
            <div className={`container ${styles.container}`}>
                <h1>Planos</h1>
                <div className={styles.planos}>
                    {planos.map((plano) => (
                        <div className={styles.plano}>
                            <h2>{plano.name}</h2>
                            <h3>Quantidade de lojas: {plano.numbers_lojas}</h3>
                            <p>Duração: {plano.installments} meses</p>
                            <p>Preço: R${plano.price.toFixed(2).replace(".", ",")}</p>
                            <button onClick={() => handleSubscribe(plano)} className={styles.assine}>Assine já!</button>
                        </div>
                    ))}
                </div>
            </div>
            {paymentModal && (
                <>
                    <div onClick={() => setPaymentModal(false)} style={{ zIndex: 199, top: 0, position: 'fixed', width: '100%', height: '100vh', background: 'black', opacity: 0.6 }} />
                    <div style={{
                        zIndex: 200,
                        overflow: 'auto',
                        borderRadius: '12px',
                        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                        width: '80%',
                        height: '80%',
                        background: '#fff',
                        position: 'fixed',
                        bottom: 0,
                        top: 0,
                        left: 0,
                        right: 0,
                        margin: 'auto'
                    }}>
                        <PagamentoForm handleSubmit={(event) => handleSubmit(event)} />
                    </div>
                </>
            )}
        </>
    )
}

export default Assinatura
