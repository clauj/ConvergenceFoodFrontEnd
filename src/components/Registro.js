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

const enviarForm = (event) => {
  event.preventDefault();

  const myForm = document.getElementById("myForm");

  var configHeaders = new Headers();
  configHeaders.append("Accept", "application/json");

  var formdata = new FormData(myForm);

  var configFetch = {
    method: "POST",
    headers: configHeaders,
    body: formdata,
    redirect: "follow",
  };

  async function acessoFetch() {
    const response = await fetch(
      "http://localhost:8000/api/auth/register",
      configFetch
    );
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  }
  acessoFetch();
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Todos os direitos reservados © "}
      <Link color="inherit" href="">
        ConvergenceDev
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [selecionaEstado, setSelecionaEstado] = useState("");

  useEffect( () => {
    async function consultaEstados() {
      let response = await fetch("http://localhost:8000/api/cep/estados");
      let respostaJson = await response.json();
      respostaJson = await respostaJson.sort((a, b) => (a.name > b.name ? 1 : -1));
      setEstados(respostaJson);
  }
  consultaEstados();
  }, []);

  const onChangeState = (event) => {
    setSelecionaEstado(event.target.value)
  };

  useEffect( () => {
    async function consultaCidades() {
      let response = await fetch(`http://localhost:8000/api/cep/cidade/${selecionaEstado}`)
      let respostaJson = await response.json();
      respostaJson = await respostaJson.sort((a, b) => (a.name > b.name ? 1 : -1));
      setCidades(respostaJson);
    }
  consultaCidades();
  }, [selecionaEstado]);

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
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome completo"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="cpf"
                label="CPF"
                name="cpf"
                autoComplete="cpf"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel htmlFor="gender">Gênero</InputLabel>
                <Select
                  native
                  fullWidth
                  label="Gênero"
                  inputProps={{
                    name: "gender",
                    id: "gender",
                  }}
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
                label="Email"
                name="email"
                autoComplete="email"
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
                name="address"
                label="Logradouro"
                type="text"
                id="address"
                autoComplete="address"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="number"
                label="Numero"
                type="number"
                id="number"
                autoComplete="number"
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="district"
                label="Bairro"
                type="text"
                id="district"
                autoComplete="district"
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
                  onChange={ event => onChangeState(event)}
                >
                  <option aria-label="None" value="" />
                  { estados.map( (estado) => (
                     <option value={estado.id} key={estado.id}>{estado.name.toUpperCase()}</option>
                  ))};
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel htmlFor="cidade">Cidade</InputLabel>
                <Select
                  native
                  fullWidth
                  label="Cidade"
                  inputProps={{
                    name: "cidade",
                    id: "cidade",
                  }}
                >
                  <option aria-label="None" value=""/>
                  { cidades.map( (cidade) => (
                     <option value={cidade.id} key={cidade.id}>{cidade.name}</option>
                  ))};
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
              <Link href="#" variant="body2">
                Já tem uma conta? Clique para logar-se!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
