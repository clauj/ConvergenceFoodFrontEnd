import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import api from "../service/api";
import styles from "../pages/Lojas.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AdicionarLoja from "../components/modals/AdicionarLoja";
import EditarLoja from "../components/modals/EditarLoja";

const Lojas = () => {
  const [lojasResponse, setLojasResponse] = useState([]);
  const [modalAdicionarLoja, setModalAdicionarLoja] = useState(false);
  const [modalEditarLoja, setModalEditarLoja] = useState({});

  const token = window.localStorage.getItem("@convergencefood:token");

  const history = useHistory();

  useEffect(() => {
    async function fetchLojas() {
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
  }, [token]);

  const handleDeleteLoja = async (id) => {
    let config = {
      method: "delete",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      console.log(`Deletou: ${id}`);
      const response = await api.delete(`loja/${id}`, config);
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }

    console.log(id);
  }
  
  const handleLoja = (id) => {
    history.push(`/lojas/${id}`);
  };

  return (
    <div className={`${styles.container} container`}>
      <div className={styles.info}>
        <p className={styles.titulo}>Lojas</p>
        <AddCircleIcon
          onClick={() => setModalAdicionarLoja(!modalAdicionarLoja)}
          className={styles.addLoja}
        />
      </div>
      <div>
        <ul>
          {lojasResponse.map((item) => (
            <li key={item.id}>
              <p
                onClick={() => handleLoja(item.id)}
              >
                {item.corporate_name}
              </p>
              <div className={styles.icons}>
                <EditIcon
                  className={styles.icon}
                  id={item.id}
                  onClick={() => setModalEditarLoja(item)}
                ></EditIcon>
                <DeleteForeverIcon
                  className={styles.icon}
                  id={item.id}
                  onClick={() => handleDeleteLoja(item.id)}
                ></DeleteForeverIcon>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {modalAdicionarLoja && (
        <AdicionarLoja
          closeModal={() => setModalAdicionarLoja(false)}
          setLojasResponse={setLojasResponse}
        />
      )}
      {modalEditarLoja?.id && (
        <EditarLoja
          closeModal={() => setModalEditarLoja({})}
          setLojasResponse={setLojasResponse}
          loja={modalEditarLoja}
        />
      )}
    </div>
  );
};

export default Lojas;
