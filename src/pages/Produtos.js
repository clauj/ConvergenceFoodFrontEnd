import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import api from "../service/api";
import styles from "../pages/Produtos.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AdicionarProduto from "../components/modals/AdicionarProduto";
import EditarProduto from "../components/modals/EditarProduto";

const Produtos = () => {
  const [produtosResponse, setProdutosResponse] = useState([]);
  const [estoqueResponse, setEstoqueResponse] = useState([]);
  const [modalAdicionarProduto, setModalAdicionarProduto] = useState(false);
  const [modalEditarProduto, setModalEditarProduto] = useState({});

  const history = useHistory();
  const token = window.localStorage.getItem("@convergencefood:token");

  const params = useParams();

  useEffect(() => {
    async function fetchProdutos() {
      let config = {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.get(`produtos/${params.id}`, config);

      setProdutosResponse(data.produtos);
      setEstoqueResponse(data);
    }

    fetchProdutos();
  }, [token]);

  const handleDeleteProduto = async (id) => {
    console.log("ID" + id);
    let config = {
      method: "delete",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      console.log(`Deletou: ${id}`);
      const response = await api.delete(`produto/${id}`, config);
      console.log(response.data.message);
      history.go(0);
    } catch (error) {
      console.log(error);
    }

    console.log(id);
  }
  
  // const handleLoja = (id) => {
  //   history.push(`/lojas/${id}`);
  // };

  return (
    <div className={`${styles.container} container`}>
      <div className={styles.info}>
        <p className={styles.titulo}>Produtos</p>
        <AddCircleIcon
          onClick={() => setModalAdicionarProduto(!modalAdicionarProduto)}
          className={styles.addLoja}
        />
      </div>
      <div>
        <ul>
          {produtosResponse.map((item) => (
            <li key={item.id}>
              <p onClick={() => console.log(item.id)}>
                {item.name}
              </p>
              <div className={styles.icons}>
                <EditIcon
                  className={styles.icon}
                  id={item.id}
                  onClick={() => setModalEditarProduto(item)}
                ></EditIcon>
                <DeleteForeverIcon
                  className={styles.icon}
                  id={item.id}
                  onClick={() => handleDeleteProduto(item.id)}
                ></DeleteForeverIcon>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {modalAdicionarProduto && (
        <AdicionarProduto
          closeModal={() => setModalAdicionarProduto(false)}
          setProdutosResponse={setProdutosResponse}
          id={params.id}
          produtosResponse={produtosResponse}
        />
      )}
      {modalEditarProduto?.id && (
        <EditarProduto
          closeModal={() => setModalEditarProduto({})}
          setProdutosResponse={setProdutosResponse}
          produto={modalEditarProduto}
          id={params.id}
        />
      )}
    </div>
  );
};

export default Produtos;
