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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function consultaEstados() {
      let response = await fetch("http://localhost:8000/api/cep/estados");
      let respostaJson = await response.json();
      respostaJson = respostaJson.sort((a, b) => (a.name > b.name ? 1 : -1));
      setEstados(respostaJson);
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
      if (cep.length === 8) {
        const cepString = cep.toString();
        console.log(cepString);
        const {data: { viaCep }} = await api.get("cep", {
          cepString,
        });
        setLogradouro(viaCep.logradouro);
        setBairro(viaCep.bairro);
        setSelecionaEstado(viaCep.uf);
        setCidade(viaCep.localidade);

        const estadoid = estados.filter((item) => item.uf === viaCep.uf);
        setEstadoParaApiGuilherme(estadoid[0].id);
      }
    }
    getCep();
  }, [cep, estados]);

  useEffect(() => {
    async function getCityId () {
      const response = await api.get(`cep/cidade/${estadoParaApiGuilherme}`);
      const formatedCidade = cleanText(cidade);
      const cityId = response.data.filter(
        (city) => city.name.toLowerCase() === formatedCidade
      );
      setCidade_id(cityId[0]?.id || 0)
    }
    getCityId();
  },[cidade, estadoParaApiGuilherme]);


  const enviarForm = async (event) => {
    event.preventDefault();
    
    if(formPassword !== formPasswordConfirmation) return alert('Asasas');


    const user = {
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
      complement:formComplement,
      estado_id: estadoParaApiGuilherme,
      cidade_id,
    }

    if(!user.complement) delete user.complement;

      await api.post("auth/register", user).catch((error) => Object.entries(error.response.data.errors)
      .forEach((erro) => { setErroCadastro(erro[1]);  
      }));
      // history.push('/login');

  };

  return (
    <Container component="main" maxWidth="md">
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <form className={classes.form} id="myForm" noValidate>
          <Grid container spacing={2}>
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
              <TextField
                variant="outlined"
                required
                inputProps={{
                  maxLength: 11,
                }}
                fullWidth
                id="cpf"
                label="CPF"
                name="cpf"
                autoComplete="cpf"
                onChange={({ target }) => setFormCpf(target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel htmlFor="genero">Gênero</InputLabel>
                <Select
                  native
                  fullWidth
                  label="Gênero"
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
                required
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
                  <option aria-label="None" value="" />
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
                  <option aria-label="None" value="" />
                  {cidades.map((cidade) => (
                    <option value={cidade.name} key={cidade.id}>
                      {cidade.nome}
                    </option>
                  ))}
                  ;
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
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
            onClick={enviarForm}
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
