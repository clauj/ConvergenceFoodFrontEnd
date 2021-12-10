import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import api from "../service/api";
import styles from "../pages/Lojas.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AdicionarLoja from "../components/modals/AdicionarLoja";
import EditarLoja from "../components/modals/EditarLoja";
import { UserContext } from "../context/UserContext";

const Lojas = () => {
  const [lojasResponse, setLojasResponse] = useState([]);
  const [modalAdicionarLoja, setModalAdicionarLoja] = useState(false);
  const [modalEditarLoja, setModalEditarLoja] = useState({});
  const { token, user, assinaturas } = useContext(UserContext);

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
    if (assinaturas.length < 1) return alert('Faça uma assinatura para gerenciar as lojas.')
    let config = {
      method: "delete",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.delete(`loja/${id}`, config);
      console.log(response.data.message);
      history.go(0);
    } catch (error) {
      console.log(error);
    }
  }

  const handleOpenLoja = (id) => {
    if (assinaturas.length < 1) return alert('Faça uma assinatura para gerenciar as lojas.')
    history.push(`/lojas/${id}`);
  };

  const handleAddLoja = () => {
    if (assinaturas.length < 1) return alert('Faça uma assinatura para gerenciar as lojas.')
    setModalAdicionarLoja(true)
  }

  const handleEditLoja = (item) => {
    if (assinaturas.length < 1) return alert('Faça uma assinatura para gerenciar as lojas.')
    setModalEditarLoja(item)
  }

  return (
    <div className={`${styles.container} container`}>
      <div className={styles.info}>
        <p className={styles.titulo}>Lojas</p>
        <AddCircleIcon
          onClick={() => handleAddLoja()}
          className={styles.addLoja}
        />
      </div>
      <div>
        <ul>
          {lojasResponse.map((item) => (
            <li key={item.id}>
              <p
                onClick={() => handleOpenLoja(item.id)}
              >
                {item.corporate_name}
              </p>
              <div className={styles.icons}>
                <EditIcon
                  className={styles.icon}
                  id={item.id}
                  onClick={() => handleEditLoja(item)}
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
