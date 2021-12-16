import React, { useContext, useDebugValue, useEffect, useRef, useState } from "react";
import styles from "../modals/EditarLoja.module.css";
import CloseIcon from "@material-ui/icons/Close";
import api from "../../service/api";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const EditarLoja = ({ closeModal, setLojasResponse, loja }) => {
  const [corporateName, setCorporateName] = useState(loja?.corporate_name || "");
  const [tradingName, setTradingName] = useState(loja?.trading_name || "");
  const [cnpj, setCnpj] = useState(loja?.cnpj || "");
  const [addressName, setAddressName] = useState("");
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [number, setNumber] = useState(null);
  const [complement, setComplement] = useState("");
  const [cidadeId, setCidadeId] = useState(null);
  const [estadoId, setEstadoId] = useState(null);
  const [website, setWebsite] = useState(loja?.website || "");
  const [phone, setPhone] = useState(loja?.phone || "");
  const [celPhone, setCelPhone] = useState(loja?.cel_phone || "");
  const [emailLoja, setEmailLoja] = useState(loja?.email_loja || "");
  const [representanteLegal, setRepresentanteLegal] = useState(loja?.representante_legal || "");
  const [representanteLegalEmail, setRepresentanteLegalEmail] = useState(loja?.representante_legal_email || "");
  const [photo, setPhoto] = useState(null);
  const [responseCriacaoLoja, setResponseCriacaoLoja] = useState("");
  const [responseError, setResponseError] = useState(null);
  const [ufs, setUfs] = useState([])
  const [cities, setCities] = useState([]);

  const photoRef = useRef();
  const { token } = useContext(UserContext);

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleFile = (event) => {
    var src = URL.createObjectURL(event.target.files[0]);
    photoRef.current.src = src;
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

    try {
      const response = await api.post(`loja/${loja.id}`, data, config);
      setResponseCriacaoLoja(response.data.message);
      setLojasResponse(response);
      closeModal();
    } catch (error) {
      console.log(error)
    }
  };


  useEffect(() => {
    async function loadAddress() {
      try {
        const { data: { endereco } } = await api.get(`/loja/${loja.id}}`, config)
        setCep(endereco?.cep)
        setAddress(endereco?.address);
        setNumber(endereco?.number)
        setComplement(endereco?.complement)
        setDistrict(endereco?.district)
        setAddressName(endereco?.name)
        setComplement(endereco?.complement)
        setEstadoId(endereco?.estado_id);
        setCidadeId(endereco?.cidade_id)
        const response = await api.get(`cep/estados`)
        setUfs(response?.data);
      } catch (error) {
        console.log(`Erro ao carregar o endereço.`)
      }
    }
    loadAddress();
  }, []);


  useEffect(() => {
    async function loadCity() {
      try {
        const { data } = await api.get(`cep/cidade/${estadoId}`)
        setCities(data);
      } catch (error) {
        console.log('erro ao carregar as cidades.')
      }
    }
    loadCity()
  }, [estadoId])


  //cep
  useEffect(() => {
    async function getCep() {
      const cepString = cep.toString();
      if (cep.length === 8) {
        const { data } = await api.post('cep', { cep: cepString });
        setAddress(data?.viaCep?.logradouro);
        setDistrict(data?.viaCep?.bairro);
        setEstadoId(data?.estado?.id);
        setCidadeId(data?.cidade_id);
      }
    }
    getCep();
  }, [cep, cities, ufs]);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.titleBar}>
          <p>{loja?.corporate_name}</p>
          <CloseIcon onClick={() => closeModal()} />
        </div>
        <form className={styles.form}>
          <div>
            <label htmlFor="corporate_name">Nome Comercial</label>
            <label htmlFor="trading_name">Nome Fantasia</label>
            <label htmlFor="cnpj">CNPJ</label>
            <label htmlFor="representante_legal">Representante Legal</label>
            <label htmlFor="representante_legal_email">
              Email do Representante Legal
            </label>
            <label htmlFor="address_name">Nome do Endereço</label>
            <label htmlFor="CEP">CEP</label>
            <label htmlFor="address">Logradouro</label>
            <label htmlFor="estado_id">Estado</label>
            <label htmlFor="cidade_id">Cidade</label>
            <label htmlFor="district">Bairro</label>
            <label htmlFor="number">Numero</label>
            <label htmlFor="complement">Complemento</label>

            <label htmlFor="phone">Telefone</label>
            <label htmlFor="cel_phone">Celular</label>
            <label htmlFor="email_loja">Email da Loja</label>
            <label htmlFor="web_link">Website</label>
          </div>
          <div>
            <input
              required
              type="text"
              id="corporate_name"
              name="corporate_name"
              defaultValue={loja?.corporate_name}
              onChange={(event) => setCorporateName(event.target.value)}
            />
            <input
              required
              type="text"
              id="trading_name"
              name="trading_name"
              defaultValue={loja?.trading_name}
              onChange={(event) => setTradingName(event.target.value)}
            />
            <input
              required
              type="number"
              id="cnpj"
              name="cnpj"
              defaultValue={loja?.cnpj}
              maxLength="14"
              onChange={(event) => setCnpj(event.target.value)}
            />
            <input
              required
              type="text"
              id="representante_legal"
              name="representante_legal"
              defaultValue={loja?.representante_legal}
              onChange={(event) => setRepresentanteLegal(event.target.value)}
            />
            <input
              required
              type="email"
              id="representante_legal_email"
              name="representante_legal_email"
              defaultValue={loja?.representante_legal_email}
              onChange={(event) =>
                setRepresentanteLegalEmail(event.target.value)
              }
            />
            <input
              required
              type="text"
              id="address_name"
              name="address_name"
              value={addressName}
              defaultValue={loja?.address_name}
              onChange={(event) => setAddressName(event.target.value)}
            />
            <input
              required
              type="number"
              id="CEP"
              name="CEP"
              value={cep}
              defaultValue={loja?.address_name}
              onChange={(event) => setCep(event.target.value)}
            />
            <input
              required
              type="text"
              id="address"
              value={address}
              name="address"
              disabled
              onChange={(event) => setAddress(event.target.value)}
            />
            <select disabled name="estado_id" id="" onChange={e => setEstadoId(e.target.value)}>
              {ufs.map(uf => (
                <option selected={uf.id === estadoId} value={uf.id} key={uf.id}>{uf?.name}</option>
              ))}
            </select>
            <select disabled name="cidade_id" id="" onChange={e => setCidadeId(e.target.value)}>
              {cities.map(city => (
                <option selected={city.id === cidadeId} value={city.id}>{city?.name}</option>
              ))}
            </select>
            <input
              required
              disabled
              type="text"
              id="district"
              value={district}
              name="district"
              onChange={(event) => setDistrict(event.target.value)}
            />
            <input
              required
              type="number"
              id="number"
              value={number}
              name="number"
              onChange={(event) => setNumber(event.target.value)}
            />
            <input
              type="text"
              id="complement"
              name="complement"
              value={complement}
              onChange={(event) => setComplement(event.target.value)}
            />
            <input
              required
              type="text"
              id="phone"
              name="phone"
              defaultValue={loja?.phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <input
              type="text"
              id="cel_phone"
              name="cel_phone"
              onChange={(event) => setCelPhone(event.target.value)}
            />
            <input
              required
              type="email"
              id="email_loja"
              name="email_loja"
              value={emailLoja}
              onChange={(event) => setEmailLoja(event.target.value)}
            />
            <input
              type="text"
              id="web_link"
              name="web_link"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
            {/* <img ref={photoRef} src={loja.photo} alt={loja.corporate_name}></img>
            <input
              required type="file" id="photo" name="photo" onChange={handleFile} /> */}
            <button
              type="submit"
              className={styles.botao}
              onClick={handleSubmit}
            >
              Salvar
            </button>
            {responseCriacaoLoja && <p>{responseCriacaoLoja}</p>}
            {responseError && <p>{responseError}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarLoja;
