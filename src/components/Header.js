import React, { useContext, useState, useEffect } from 'react'
import { ReactComponent as Logo } from '../assets/logo.svg';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import { useHistory } from "react-router-dom";
import ModalLogin from './modals/ModalLogin';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {

    const { data, login, userLogout, enderecos } = useContext(UserContext);
    const history = useHistory();
    const [openModal, setOpenModal] = useState(false);
    const [buttonLogin, setButtonLogin] = useState(true);
    const {cart} = useContext(CartContext);

    const endereco = JSON.parse(enderecos);

    const handleSearch = (event) => {
        event.preventDefault();
        console.log("Pesquisar")
    }

    const handleLogout = () => {
        userLogout();
        setOpenModal(false);
        setButtonLogin(true);
        history.push("/");
    }
    
    const handleOpenModal = () => {
        setOpenModal(true);
        setButtonLogin(false);        
    }

    const handleCart = () => {
        history.push("/carrinho");
    }

    return (
        <header className={styles.header}>
            <div className={styles.nav}>
                <Link to="/" aria-label="">
                    <Logo className={styles.logo} />
                </Link>
                <div className={styles.searchBar}>
                    <input type="text" id="search-bar" name="search-bar" placeholder="Pesquisar"></input>
                    <SearchIcon className={styles.searchIcon} onClick={handleSearch} />
                </div>
                <div className={styles.addressSection}>
                    <p>Entregar em:</p>
                    <p className={styles.addressFav}>{endereco[0].address}, {endereco[0].number}</p>
                </div>
                <div className={styles.loggedArea}>
                    {login && (
                        <div className={styles.carrinho}>
                            <ShoppingCartIcon className={styles.cart} onClick={handleCart}/>
                            <p className={styles.amount}>{cart.quantidade}</p>
                        </div>
                    )}
                    {login === false && <button onClick={handleOpenModal} className={styles.login}>Login</button>}
                    {login && <Link to='/minhaconta' className={styles.login}>{data.name}</Link>}
                    {login === false && openModal === true && <ModalLogin closeModal={() => setOpenModal(false)} />}
                    {login && <ExitToAppIcon className={styles.logout} onClick={handleLogout}/>}
                </div>
            </div>
        </header>
    )
}

export default Header
