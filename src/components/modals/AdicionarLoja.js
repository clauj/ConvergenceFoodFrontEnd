import React, { useState } from "react";
import styles from "../modals/AdicionarLoja.module.css";
import CloseIcon from "@material-ui/icons/Close";
import api from "../../service/api";
import { useHistory } from "react-router-dom";

const AdicionarLoja = ({ closeModal, setLojasResponse }) => {

  const [corporateName, setCorporateName] = useState("");
  const [tradingName, setTradingName] = useState("");
  const [cnpj, setCnpj] = useState(null);
  const [addressName, setAddressName] = useState("");
  const [cep, setCep] = useState(null);
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [number, setNumber] = useState(null);
  const [complement, setComplement] = useState("");
  const [cidadeId, setCidadeId] = useState(null);
  const [estadoId, setEstadoId] = useState(null);
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState(null);
  const [celPhone, setCelPhone] = useState(null);
  const [emailLoja, setEmailLoja] = useState(null);
  const [representanteLegal, setRepresentanteLegal] = useState("");
  const [representanteLegalEmail, setRepresentanteLegalEmail] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [responseCriacaoLoja, setResponseCriacaoLoja] = useState("");
  const [responseError, setResponseError] = useState([]);

  const handleFile = (event) => {
    console.log(event.target.files[0]);

    setPhoto(event.target.files[0]);
  };

    const handleSubmit = async (event) => {
    event.preventDefault();

    let data = new FormData();

    data.append("corporate_name", corporateName);
    data.append("trading_name", tradingName);
    data.append("cnpj", cnpj);
    data.append("address_name", addressName);
    data.append("cep", cep);
    data.append("address", address);
    data.append("district", district);
    data.append("number", number);
    data.append("complement", complement);
    data.append("cidade_id", cidadeId);
    data.append("estado_id", estadoId);
    data.append("web_site", website);
    data.append("phone", phone);
    data.append("cel_phone", celPhone);
    data.append("email_loja", emailLoja);
    data.append("email_loja", emailLoja);
    data.append("representante_legal", representanteLegal);
    data.append("representante_legal_email", representanteLegalEmail);

    data.append("photo", photo);

    const token = localStorage.getItem("@convergencefood:token");

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.post("loja/create", data, config);
      setResponseCriacaoLoja(response.data.message);
      setLojasResponse(response.data.lojas);
      closeModal();

    } catch (error) {
      setResponseError(Object.values(error.response.data.errors));
      console.log(responseError);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.titleBar}>
          <p>Nova loja</p>
          <CloseIcon onClick={() => closeModal()} />
        </div>
        <form className={styles.form}>
            <label htmlFor="corporate_name">Nome Comercial</label>
            <input
              type="text"
              id="corporate_name"
              name="corporate_name"
              onChange={(event) => setCorporateName(event.target.value)}
            />
            <label htmlFor="trading_name">Nome Fantasia</label>
            <input
              type="text"
              id="trading_name"
              name="trading_name"
              onChange={(event) => setTradingName(event.target.value)}
            />
            <label htmlFor="cnpj">CNPJ</label>
            <input
              type="number"
              id="cnpj"
              name="cnpj"
              maxLength="14"
              onChange={(event) => setCnpj(event.target.value)}
            />
            <label htmlFor="representante_legal">Representante Legal</label>
            <input
              type="text"
              id="representante_legal"
              name="representante_legal"
              onChange={(event) => setRepresentanteLegal(event.target.value)}
            />
            <label htmlFor="representante_legal_email">
              Email do Representante Legal
            </label>
            <input
              type="email"
              id="representante_legal_email"
              name="representante_legal_email"
              onChange={(event) =>
                setRepresentanteLegalEmail(event.target.value)
              }
            />
            <label htmlFor="address_name">Nome do Endereço</label>
            <input
              type="text"
              id="address_name"
              name="address_name"
              onChange={(event) => setAddressName(event.target.value)}
            />
            <label htmlFor="CEP">CEP</label>
            <input
              type="number"
              id="CEP"
              name="CEP"
              onChange={(event) => setCep(event.target.value)}
            />
            <label htmlFor="address">Logradouro</label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={(event) => setAddress(event.target.value)}
            />
            <label htmlFor="district">Bairro</label>
            <input
              type="text"
              id="district"
              name="district"
              onChange={(event) => setDistrict(event.target.value)}
            />
            <label htmlFor="number">Numero</label>
            <input
              type="number"
              id="number"
              name="number"
              onChange={(event) => setNumber(event.target.value)}
            />
            <label htmlFor="complement">Complemento</label>
            <input
              type="text"
              id="complement"
              name="complement"
              onChange={(event) => setComplement(event.target.value)}
            />
            <label htmlFor="cidade_id">Cidade</label>
            <input
              type="text"
              id="cidade_id"
              name="cidade_id"
              onChange={(event) => setCidadeId(event.target.value)}
            />
            <label htmlFor="estado_id">Estado</label>
            <input
              type="text"
              id="estado_id"
              name="estado_id"
              onChange={(event) => setEstadoId(event.target.value)}
            />
            <label htmlFor="phone">Telefone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              onChange={(event) => setPhone(event.target.value)}
            />
            <label htmlFor="cel_phone">Celular</label>
            <input
              type="text"
              id="cel_phone"
              name="cel_phone"
              onChange={(event) => setCelPhone(event.target.value)}
            />
            <label htmlFor="email_loja">Email da Loja</label>
            <input
              type="email"
              id="email_loja"
              name="email_loja"
              onChange={(event) => setEmailLoja(event.target.value)}
            />
            <label htmlFor="web_link">Website</label>
            <input
              type="text"
              id="web_link"
              name="web_link"
              onChange={(event) => setWebsite(event.target.value)}
            />
            <label htmlFor="photo">Logomarca</label>
            <input type="file" id="photo" name="photo" onChange={handleFile} />
            <button
              type="submit"
              className={styles.botao}
              onClick={handleSubmit}
            >
              Criar
            </button>
          {responseCriacaoLoja && <p>{responseCriacaoLoja}</p>}
          {responseError && responseError.map((item) => <p className={styles.error}>{item}</p>)}
        </form>
      </div>
    </div>
  );
};

export default AdicionarLoja;
