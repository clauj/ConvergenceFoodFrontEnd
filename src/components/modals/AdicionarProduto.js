import React, { useState, useEffect } from "react";
import styles from "../modals/AdicionarProduto.module.css";
import CloseIcon from "@material-ui/icons/Close";
import api from "../../service/api";
import { useHistory, useParams } from "react-router-dom";

const AdicionarProduto = ({
  closeModal,
  setProdutosResponse,
  produtosResponse,
  id,
}) => {
  console.log(produtosResponse);
  const history = useHistory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [categoria, setCategoria] = useState("");
  const [quantidade, setQuantidade] = useState(null);
  const [image, setImage] = useState(null);
  const [responseCriacaoProduto, setResponseCriacaoProduto] = useState("");
  const [responseError, setResponseError] = useState(null);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function fetchCategorias() {
      let config = {
        method: "get",
        url: "http://localhost:8000/api/categorias",
        headers: {
          Accept: "application/json",
        },
      };

      const { data } = await api.get("categorias", config);
      console.log(data);
      setCategorias(data.categorias);
    }

    fetchCategorias();
  }, []);

  const handleFile = (event) => {
    console.log(event.target.files);

    setImage(Object.entries(event.target.files));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let data = new FormData();

    data.append("name", name);
    data.append("description", description);
    data.append("price", price);
    data.append("categoria_id", categoria);
    data.append("quantidade", quantidade);
    data.append("loja_id", id);
    image.map((item) => {
      data.append("images[]", item[1]);
    });

    const token = localStorage.getItem("@convergencefood:token");

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.post("produto/", data, config);
      console.log(response);
      setResponseCriacaoProduto(response.data.message);
      history.go(0);
    } catch (error) {
      setResponseError(Object.values(error.response.data.errors));
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.titleBar}>
          <p>Novo produto</p>
          <CloseIcon onClick={() => closeModal()} />
        </div>
        <form className={styles.form}>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="description">Descrição</label>
          <input
            type="text"
            id="description"
            name="description"
            maxLength="50"
            onChange={(event) => setDescription(event.target.value)}
          />
          <label htmlFor="price">Preço</label>
          <input
            type="number"
            id="price"
            name="price"
            maxLength="5"
            onChange={(event) => setPrice(event.target.value)}
          />
          <label htmlFor="categoria_id">Categoria</label>
          <select
            name="categoria_id"
            id="categoria_id"
            onChange={(event) => setCategoria(event.target.value)}
          >
            {categorias.map((categoria) => (
              <option value={categoria.id}>{categoria.name}</option>
            ))}
          </select>
          <label htmlFor="quantidade">Quantidade</label>
          <input
            type="text"
            id="quantidade"
            name="quantidade"
            onChange={(event) => setQuantidade(event.target.value)}
          />
          <label htmlFor="photo">Foto</label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleFile}
            multiple
          />
          <button type="submit" className={styles.botao} onClick={handleSubmit}>
            Criar
          </button>
          {responseCriacaoProduto && <p>{responseCriacaoProduto}</p>}
          {responseError && <p>{responseError}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdicionarProduto;
