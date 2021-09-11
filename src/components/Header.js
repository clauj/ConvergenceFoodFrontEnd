import React, { useContext } from 'react'
import { ReactComponent as Logo } from '../assets/logo.svg';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'
import { UserContext } from '../context/UserContext';
import { useHistory } from "react-router-dom";

const Header = () => {

    const { data, login, userLogout } = useContext(UserContext);
    const history = useHistory();
    console.log(data);
    const handleLogout = () => {
        userLogout();
        history.push("/login");
    }
    
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link to="/" aria-label="">
                    <Logo />
                </Link>
                <div className={styles.vertCenter}>
                    <Link to={login ? '/minhaconta' : '/login'} className={styles.login}>{login ? data.name : 'Login'}</Link>
                    {login && <ExitToAppIcon onClick={handleLogout}/>}
                </div>
            </nav>
        </header>
    )
}

export default Header
