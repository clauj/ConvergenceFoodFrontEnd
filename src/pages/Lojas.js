import React, { useState, useEffect } from "react";
import api from "../service/api";
import styles from "../pages/Lojas.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AdicionarLoja from "../components/modals/AdicionarLoja";

const Lojas = () => {
  const [lojasResponse, setLojasResponse] = useState([]);
  const [modalAdicionarLoja, setModalAdicionarLoja] = useState(false);

  useEffect(() => {
    async function fetchLojas() {
      const token = window.localStorage.getItem("@convergencefood:token");

      let config = {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.get("user", config);

      setLojasResponse(data.lojas);
    }

    fetchLojas();
  }, []);

  console.log();

  return (
    <div className={`${styles.container} container`}>
      <div className={styles.info}>
        <p className={styles.titulo}>Lojas</p>
        <AddCircleIcon onClick={() => setModalAdicionarLoja(!modalAdicionarLoja)} className={styles.addLoja}/>
      </div>
      <div>
        <ul>
          {lojasResponse.map((item) => (
            <li key={item.id}>
              <p
                onClick={(event) => {
                  console.log(event.target.id);
                }}
                id={item.id}
              >
                {item.corporate_name}
              </p>
              <div className={styles.icons}>
                <EditIcon className={styles.icon}/>
                <DeleteForeverIcon className={styles.icon}/>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {modalAdicionarLoja && <AdicionarLoja closeModal={() => setModalAdicionarLoja(false)} />}
    </div>
  );
};

export default Lojas;
