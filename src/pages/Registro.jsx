import React from "react";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import api from "../service/api";
import cleanText from "../utils/cleanText";
import { useHistory } from "react-router-dom";
import { LegendToggle } from "@mui/icons-material";
import axios from "axios";
import PagamentoForm from "../components/PagamentoForm";
import { useMercadopago } from "react-sdk-mercadopago";
import InputMask from "react-input-mask";

// import Modal from '@mui/material/Modal';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [selecionaEstado, setSelecionaEstado] = useState("");
  const [cep, setCep] = useState("");

  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estadoParaApiGuilherme, setEstadoParaApiGuilherme] = useState(0);

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPasswordConfirmation, setFormPasswordConfirmation] = useState("");
  const [formCpf, setFormCpf] = useState("");
  const [formGender, setFormGender] = useState("");
  const [formAddressName, setFormAddressName] = useState("");
  const [formCep, setFormCep] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formDistrict, setFormDistrict] = useState("");
  const [formNumber, setFormNumber] = useState("");
  const [formComplement, setFormComplement] = useState("");
  const [cidade_id, setCidade_id] = useState(0);
  const [erroCadastro, setErroCadastro] = useState("");
  const [allow, setAllow] = useState(false);
  const [userType, setUserType] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [erro, setErro] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [lojistaInfo, setLojistaInfo] = useState({
    corporate_name: '',
    cnpj: '',
    web_site: '',
    phone: '',
    cel_phone: '',
    email_loja: '',
    representante_legal: '',
    representante_legal_email: '',
    trading_name: '',
  })

  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    async function consultaEstados() {
      let { data } = await api.get("cep/estados");
      data.sort((a, b) => (a.name > b.name ? 1 : -1));
      setEstados(data);
    }
    consultaEstados();
  }, []);

  const onChangeState = (event) => {
    const estadoid = estados.filter((item) => item.uf === event.target.value);
    setSelecionaEstado(event.target.value);
    setEstadoParaApiGuilherme(estadoid[0].id);
  };

  useEffect(() => {
    async function consultaCidades() {
      let response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selecionaEstado}/distritos`
      );
      let respostaJson = await response.json();
      respostaJson = respostaJson.sort((a, b) => (a.nome > b.nome ? 1 : -1));
      setCidades(respostaJson);
    }
    consultaCidades();
  }, [selecionaEstado]);

  useEffect(() => {
    async function getCep() {
      const cepString = cep.toString();
      if (cep.length === 8) {
        const { data } = await api.post('cep', { cep: cepString });
        setLogradouro(data.viaCep.logradouro);
        setLogradouro(data.viaCep.logradouro);
        setBairro(data.viaCep.bairro);
        setSelecionaEstado(data.viaCep.uf);
        setCidade(data?.cidade_id);
        setEstadoParaApiGuilherme(data.estado.id);
      }
    }
    getCep();
  }, [cep, estados]);

  useEffect(() => {
    async function getCityId() {
      const response = await api.get(`cep/cidade/${estadoParaApiGuilherme}`);
      setCidades(response.data);
    }
    getCityId();
  }, [estadoParaApiGuilherme]);

  console.log(cidade);


  const enviarForm = async (event) => {
    event.preventDefault();

    if (formPassword !== formPasswordConfirmation) return alert('As senhas devem ser iguais.');

    let user = {
      name: formName,
      email: formEmail,
      password: formPassword,
      password_confirmation: formPasswordConfirmation,
      cpf: formCpf,
      gender: formGender,
      address_name: formAddressName,
      cep: formCep,
      address: logradouro,
      district: bairro,
      number: formNumber,
      complement: formComplement,
      estado_id: estadoParaApiGuilherme,
      cidade_id: cidade,
      admin: userType,
    }

    console.log(user);

    let formData = new FormData();
    if (userType === 1) {
      formData.append('name', user.name);
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('password_confirmation', user.password_confirmation);
      formData.append('cpf', user.cpf);
      formData.append('gender', user.gender);
      formData.append('address_name', user.address_name);
      formData.append('address', user.address);
      formData.append('district', user.district);
      formData.append('number', user.number);
      formData.append('complement', user.complement);
      formData.append('cep', cep);
      formData.append('estado_id', user.estado_id);
      formData.append('cidade_id', user.cidade_id);
      formData.append('admin', userType);

      formData.append('corporate_name', lojistaInfo.corporate_name);
      formData.append('trading_name', lojistaInfo.trading_name);
      formData.append('cnpj', lojistaInfo.cnpj);
      formData.append('web_site', lojistaInfo.web_site);
      formData.append('phone', lojistaInfo.phone);
      formData.append('cel_phone', lojistaInfo.cel_phone);
      formData.append('email_loja', lojistaInfo.email_loja);
      formData.append('representante_legal', lojistaInfo.representante_legal);
      formData.append('representante_legal_email', lojistaInfo.representante_legal_email);
      formData.append('photo', photo);
    }

    if (!user.complement) delete user.complement;

    try {
      console.log(formData)
      await api.post(`auth/register${userType === 1 ? '/admin' : ''}`, userType === 1 ? formData : user)
      alert('Cadastrado com sucesso!')
      history.push('/');
    } catch (error) {
      alert('Erro no cadastro.')
    };
  };



  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <form className={classes.form} id="myForm" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ display: 'flex', gap: 10 }}>
                <div>
                  <span>Pessoa Física</span>
                  <input onClick={() => setUserType(0)} style={{ marginLeft: 10 }} type="radio" name='userType' value={0} defaultChecked />
                </div>
                <div>
                  <span>Lojista</span>
                  <input onClick={() => setUserType(1)} style={{ marginLeft: 10 }} type="radio" name='userType' value={1} />
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome completo"
                autoFocus
                onChange={({ target }) => setFormName(target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <InputMask mask="999.999.999-99" value={formCpf} onChange={({ target }) => {
              setFormCpf(target.value) 
            }}>
              {(props) => 
                <TextField
                  {...props}
                  type="text"
                  variant="outlined"
                  required
                  id="cpf"
                  label="CPF"
                  name="cpf"
                  autoComplete="cpf"
                  fullWidth
                  disableUnderline
                />
              }
            </InputMask>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel htmlFor="genero">Gênero</InputLabel>
                <Select
                  required
                  native
                  fullWidth
                  label="Gênero *"
                  inputProps={{
                    name: "genero",
                    id: "genero",
                  }}
                  onChange={({ target }) => setFormGender(target.value)}
                >
                  <option aria-label="Nenhum" value="" />
                  <option value={"f"}>Feminino</option>
                  <option value={"m"}>Masculino</option>
                  <option value={"o"}>Outros</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                onChange={({ target }) => setFormEmail(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={({ target }) => setFormPassword(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password_confirmation"
                label="Confirme a senha"
                type="password"
                id="password_confirmation"
                autoComplete="password_confirmation"
                onChange={({ target }) =>
                  setFormPasswordConfirmation(target.value)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address_name"
                label="Nome do Endereço"
                type="text"
                id="address_name"
                autoComplete="address_name"
                onChange={({ target }) => setFormAddressName(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={{
                  maxLength: 8,
                }}
                onChange={({ target }) => (
                  setCep(target.value), setFormCep(target.value)
                )}
                variant="outlined"
                required
                fullWidth
                name="cep"
                label="CEP"
                type="text"
                id="cep"
                autoComplete="cep"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={logradouro}
                onChange={
                  (({ target }) => setLogradouro(target.value),
                    ({ target }) => setFormAddress(target.value))
                }
                name="address"
                label="Logradouro"
                type="text"
                id="address"
                autoComplete="address"
                disabled={cep && cep.length === 8}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="number"
                label="Número"
                type="number"
                id="number"
                autoComplete="number"
                InputProps={{ inputProps: { min: 1, max: 99999 } }}
                onChange={({ target }) => setFormNumber(target.value)}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="district"
                label="Bairro"
                value={bairro}
                onChange={
                  (({ target }) => setBairro(target.value),
                    ({ target }) => setFormDistrict(target.value))
                }
                type="text"
                id="district"
                autoComplete="district"
                disabled={cep && cep.length === 8}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="complement"
                label="Complemento"
                type="text"
                id="complement"
                autoComplete="complement"
                onChange={({ target }) => setFormComplement(target.value)}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel htmlFor="estado_id">Estado</InputLabel>
                <Select
                  native
                  fullWidth
                  label="Estado"
                  inputProps={{
                    name: "estado_id",
                    id: "estado_id",
                  }}
                  value={selecionaEstado}
                  onChange={(event) => onChangeState(event)}
                  disabled={cep && cep.length === 8}
                >
                  <option aria-label="None" value="" defaultValue hidden />
                  {estados.map((estado) => (
                    <option value={estado.uf} key={estado.id}>
                      {estado.name.toUpperCase()}
                    </option>
                  ))}
                  ;
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel htmlFor="cidade_id">Cidade</InputLabel>
                <Select
                  native
                  fullWidth
                  onChange={(e) => setCidade(e.target.value)}
                  label="Cidade"
                  value={cidade}
                  inputProps={{
                    name: "cidade_id",
                    id: "cidade_id",
                  }}
                  disabled={cep && cep.length === 8}
                >
                  {cidades.map((cidade) => (
                    <option value={cidade.id} key={cidade.id}>
                      {cidade.name}
                    </option>
                  ))}
                  ;
                </Select>
              </FormControl>
            </Grid>
            {userType === 1 && (
              <>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="corporate_name"
                    label="Empresa"
                    type="text"
                    id="corporate_name"
                    autoComplete="corporate_name"
                    onChange={({ target }) => setLojistaInfo({ ...lojistaInfo, corporate_name: target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="trading_name"
                    label="Nome fantasia"
                    type="text"
                    id="trading_name"
                    autoComplete="trading_name"
                    onChange={({ target }) => setLojistaInfo({ ...lojistaInfo, trading_name: target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="cnpj"
                    label="CNPJ"
                    type="text"
                    id="cnpj"
                    autoComplete="cnpj"
                    onChange={({ target }) => setLojistaInfo({ ...lojistaInfo, cnpj: target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="web_site"
                    label="Web site"
                    type="text"
                    id="web_site"
                    autoComplete="web_site"
                    onChange={({ target }) => setLojistaInfo({ ...lojistaInfo, web_site: target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="phone"
                    label="Telefone"
                    type="text"
                    id="phone"
                    autoComplete="phone"
                    onChange={({ target }) => setLojistaInfo({ ...lojistaInfo, phone: target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="cel_phone"
                    label="Celular"
                    type="text"
                    id="cel_phone"
                    autoComplete="cel_phone"
                    onChange={({ target }) => setLojistaInfo({ ...lojistaInfo, cel_phone: target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="email_loja"
                    label="E-mail da loja"
                    type="text"
                    id="email_loja"
                    autoComplete="email_loja"
                    onChange={({ target }) => setLojistaInfo({ ...lojistaInfo, email_loja: target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="representante_legal"
                    label="Representante Legal"
                    type="text"
                    id="representante_legal"
                    autoComplete="representante_legal"
                    onChange={({ target }) => setLojistaInfo({ ...lojistaInfo, representante_legal: target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="representante_legal_email"
                    label="E-mail do Representante Legal"
                    type="text"
                    id="representante_legal_email"
                    autoComplete="representante_legal_email"
                    onChange={({ target }) => setLojistaInfo({ ...lojistaInfo, representante_legal_email: target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  Logotipo:
                  <input type="file" onChange={e => setPhoto(e.target.files[0])} />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox onClick={e => setAllow(!allow)} value="allowExtraEmails" color="primary" />}
                label="Declaro que concordo com os termos de uso e padrões de nossa empresa."
              />
            </Grid>
          </Grid>
          <p>{erroCadastro}</p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => enviarForm(e)}
            disabled={!allow}
          >
            Registrar-se
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Já tem uma conta? Clique para logar-se!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
