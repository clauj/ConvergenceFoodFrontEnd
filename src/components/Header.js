import React, { useContext, useState } from 'react'
import { ReactComponent as Logo } from '../assets/logo.svg';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'
import { UserContext } from '../context/UserContext';
import { useHistory } from "react-router-dom";
import ModalLogin from './ModalLogin';

const Header = () => {

    const { data, login, userLogout } = useContext(UserContext);
    const history = useHistory();
    const [openModal, setOpenModal] = useState(false);
    const [buttonLogin, setButtonLogin] = useState(true);

    console.log(data);
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
            <nav className={styles.nav}>
                <Link to="/" aria-label="">
                    <Logo />
                </Link>
                <h1>ConvergenceFood</h1>
                <div className={styles.vertCenter}>
                    {login === false && <button onClick={handleOpenModal} className={styles.login}>Login</button>}
                    {login && <Link to='/minhaconta' className={styles.login}>{data.name}</Link>}
                    {/* <Link to={login ? '/minhaconta' : '/login'} className={styles.login}>{login ? data.name : 'Login'}</Link> */}
                    {login === false && openModal === true && <ModalLogin closeModal={() => setOpenModal(false)} />}
                    {login && <ExitToAppIcon onClick={handleLogout}/>}
                    {login && <ShoppingCartIcon onClick={handleCart}/>}
                </div>
            </nav>
        </header>
    )
}

export default Header
