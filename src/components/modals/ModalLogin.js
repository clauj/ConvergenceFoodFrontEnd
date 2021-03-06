import React, { useState, useContext } from "react";
import styles from "./ModalLogin.module.css";
import { UserContext } from "../../context/UserContext";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

const ModalLogin = ({ closeModal }) => {
  const { userLogin, error } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    userLogin(email, password);
  };

  return (
    <>
      <div className={styles.backdrop} onClick={() => closeModal()}></div>
        <div className={styles.modal}>
          <CloseIcon className={styles.close} onClick={() => closeModal()} />
          <form action="/action_page.php">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="fname"
              name="fname"
              onChange={({ target }) => setEmail(target.value)}
            />
            <label htmlFor="lname">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
            {error && <p>{error}</p>}
            <input
              type="submit"
              value="Logar-se"
              className={styles.botaoLogin}
              onClick={handleSubmit}
            />
          </form>
          <Link to="/registrar" className={styles.registre} onClick={() => closeModal()}>
            Não tem uma conta? Registre-se agora!
            </Link>
        </div>
    </>
  );
};

export default ModalLogin;
