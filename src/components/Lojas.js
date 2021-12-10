import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../service/api';
import styles from './Lojas.module.css'
import { UserContext } from '../context/UserContext';

const Lojas = () => {
  const [lojasResponse, setLojasResponse] = useState([]);
  const history = useHistory();

  const { token } = useContext(UserContext);

  useEffect(() => {
    async function fetchLojas() {
      let config = {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.get("lojas", config);
      setLojasResponse(response.data.lojas);
    }

    if (token) return fetchLojas();
    return setLojasResponse([]);
  }, [token]);

  const handleLoja = (id) => {
    history.push(`/loja/${id}`);
  }


  return (
    <>
      <div className={`${styles.section} container`}>
        {lojasResponse.map((item) => (
          <>
            < div className={styles.container} key={item.id} id={item.id} onClick={() => handleLoja(item.id)}>
              <p>{item.corporate_name}</p>
              <img src={item.photo} alt={item.corporate_name}></img>
            </div>
          </>
        ))}
      </div>
    </>
  )
}

export default Lojas
