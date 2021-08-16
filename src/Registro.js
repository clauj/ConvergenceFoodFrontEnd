import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormControl, FormLabel, Radio, RadioGroup, InputLabel, Select } from "@material-ui/core";

const enviarForm = (event) => {
  event.preventDefault();

  var configHeaders = new Headers();
  configHeaders.append("Accept", "application/json");

  var formdata = new FormData();
  formdata.append("name", "Guilherme Pellegrini");
  formdata.append("email", "pellegrini458@gmail.com");
  formdata.append("password", "123456789");
  formdata.append("password_confirmation", "123456789");
  formdata.append("cep", "09425210");
  formdata.append("address_name", "Casa");
  formdata.append("address", "Rua Belo Horizonte");
  formdata.append("district", "Bocaina");
  formdata.append("number", "1614B");
  formdata.append("cidade_id", "1");
  formdata.append("estado_id", "1");
  formdata.append("cpf", "45042316892");

  var configFetch = {
    method: 'POST',
    headers: configHeaders,
    body: formdata,
    redirect: 'follow'
  };

  async function acessoFetch() {
      const response = await fetch("http://localhost:8000/api/auth/register", configFetch);
      const responseJson = await response.json();
      return responseJson;
  }
  acessoFetch()
  console.log("Enviado")
  };

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Todos direitos reservados © "}
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="nomeCompleto"
                variant="outlined"
                required
                fullWidth
                id="nomecompleto"
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
              <FormControl variant="outlined" className={classes.formControl} fullWidth>
                <InputLabel htmlFor="outlined-gender-native-simple">
                  Gênero
                </InputLabel>
                <Select
                  native
                  fullWidth
                  label="Gênero"
                  inputProps={{
                    name: "genero",
                    id: "outlined-gender-native-simple",
                  }}
                >
                  <option aria-label="Nenhum" value="" />
                  <option value={'feminino'}>Feminino</option>
                  <option value={'masculino'}>Masculino</option>
                  <option value={'outros'}>Outros</option>
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
                name="addressname"
                label="Nome do Endereço"
                type="text"
                id="addressname"
                autoComplete="addressname"
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
