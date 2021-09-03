import React, { useContext } from 'react'
import { ReactComponent as Logo } from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'
import { UserContext } from '../context/UserContext';

const Header = () => {

    const { data, login } = useContext(UserContext);
    console.log(data);
    
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link to="/" aria-label="">
                    <Logo />
                </Link>
                <Link to={login ? '/minhaconta' : '/login'} className={styles.login}>{login ? data.name : 'Login'}</Link>
            </nav>
        </header>
    )
}

export default Header
