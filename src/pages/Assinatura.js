import React, { useEffect, useState, useContext} from 'react'
import api from '../service/api'
import { UserContext } from "../context/UserContext";
import styles from '../pages/Assinatura.module.css'

const Assinatura = () => {

    const [planos, setPlanos] = useState([]);

    const { token } = useContext(UserContext);

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
        getAssinaturas();
    }, []);


    return (
        <div className={`container ${styles.container}`}>
            <h1>Planos</h1>
            <div className={styles.planos}>
            {planos.map((plano) => (
                <div className={styles.plano}>
                    <h2>{plano.name}</h2>
                    <h3>Quantidade de lojas: {plano.numbers_lojas}</h3>
                    <p>Duração: {plano.installments} meses</p>
                    <p>Preço: R${plano.price.toFixed(2).replace(".", ",")}</p>
                    <button className={styles.assine}>Assine já!</button>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Assinatura
