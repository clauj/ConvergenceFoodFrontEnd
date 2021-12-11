import React, { useContext, useState, useEffect } from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { useHistory } from "react-router-dom";
import ModalLogin from "./modals/ModalLogin";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  const { data, login, userLogout, enderecos, assinatura, token } =
  useContext(UserContext);
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [buttonLogin, setButtonLogin] = useState(true);
  const { cart } = useContext(CartContext);
  

  useEffect(() => {
    console.log(data);
  },[data]);

  const handleSearch = (event) => {
    event.preventDefault();
 
  };

  const handleLogout = () => {
    userLogout();
    setOpenModal(false);
    setButtonLogin(true);
    history.push("/");
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setButtonLogin(false);
  };

  const handleCart = () => {
    history.push("/carrinho");
  };

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <Link to="/" aria-label="">
          <Logo className={styles.logo} />
        </Link>
        <div className={styles.searchBar}>
          <input
            type="text"
            id="search-bar"
            name="search-bar"
            placeholder="Pesquisar"
          ></input>
          <SearchIcon className={styles.searchIcon} onClick={handleSearch} />
        </div>
        {data.admin === 0 && (
          <div className={styles.addressSection}>
            <p>Entregar em:</p>
            <p className={styles.addressFav}>
            {enderecos?.[0]?.address}, {enderecos?.[0]?.number}
            </p>
          </div>
        )}
        <div className={styles.loggedArea}>
          {data?.admin === 1 && assinatura === null && (
            <button
              onClick={() => history.push("/assine")}
              className={styles.assinaturaPendente}
            >
              <p>Escolher assinatura</p>
            </button>
          )}
          {login && data?.admin === 0 && (
            <div className={styles.carrinho}>
              <ShoppingCartIcon className={styles.cart} onClick={handleCart} />
              <p className={styles.amount}>{cart.quantidade}</p>
            </div>
          )}
          {login === false && (
            <button onClick={handleOpenModal} className={styles.login}>
              Login
            </button>
          )}
          {login && (
            <Link to="/minhaconta" className={styles.login}>
              {data.name}
            </Link>
          )}
          {login === false && openModal === true && (
            <ModalLogin closeModal={() => setOpenModal(false)} />
          )}
          {login && (
            <ExitToAppIcon className={styles.logout} onClick={handleLogout} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
