import React, { useState, useEffect } from "react";
import styles from "../modals/AdicionarProduto.module.css";
import CloseIcon from "@material-ui/icons/Close";
import api from "../../service/api";
import { useHistory, useParams } from "react-router-dom";

const EditarProduto = ({ closeModal, setProdutosResponse, produtosResponse, produto }) => {

  console.log(produto);
  const history = useHistory();

  const [name, setName] = useState(produto?.name);
  const [description, setDescription] = useState(produto?.description);
  const [price, setPrice] = useState(produto?.price);
  const [categoria, setCategoria] = useState(produto?.categoria_id);
  const [responseCriacaoProduto, setResponseCriacaoProduto] = useState("");
  const [responseError, setResponseError] = useState(null);
  const [categorias, setCategorias] = useState([]);

  console.log("Categoria inicial: " + categoria);

  useEffect(() => {
    async function fetchCategorias() {

      let config = {
        method: 'get',
        url: 'http://localhost:8000/api/categorias',
        headers: { 
          'Accept': 'application/json'
        }
      };

      const { data } = await api.get("categorias", config);
      console.log(data);
      setCategorias(data.categorias);
    }

    fetchCategorias();
  }, [])

    const handleSubmit = async (event) => {
    event.preventDefault();

    let data = JSON.stringify({
      "name": name,
      "price": price,
      "description": description,
      "categoria_id": categoria
    });

    const token = localStorage.getItem("@convergencefood:token");

    const config = {
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    try {
      const response = await api.put(`produto/${produto.id}`, data, config);
      console.log(response);
      setResponseCriacaoProduto(response.data.message);
      history.go(0);
    } catch (error) {
      setResponseError("Erro");
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.titleBar}>
          <p>{produto?.name}</p>
          <CloseIcon onClick={() => closeModal()} />
        </div>
        <form className={styles.form}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={produto?.name}
              onChange={(event) => setName(event.target.value)}
            />
            <label htmlFor="description">Descrição</label>
            <input
              type="text"
              id="description"
              name="description"
              maxLength="50"
              defaultValue={produto?.description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <label htmlFor="price">Preço</label>
            <input
              type="number"
              id="price"
              name="price"
              maxLength="5"
              defaultValue={produto?.price}
              onChange={(event) => setPrice(event.target.value)}
            />
            <label htmlFor="categoria_id">Categoria</label>
            <select name="categoria_id" id="categoria_id" onChange={(event) => setCategoria(event.target.value)} value={categoria}>
              {categorias.map((categoria) => (
                <option value={categoria.id} key={categoria.id}>{categoria.name}</option>
              ))}
            </select>
            <button
              type="submit"
              className={styles.botao}
              onClick={handleSubmit}
            >
              Salvar
            </button>
          {responseCriacaoProduto && <p>{responseCriacaoProduto}</p>}
          {responseError && <p>{responseError}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditarProduto;
